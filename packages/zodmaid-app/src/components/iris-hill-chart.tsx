import * as d3 from "d3";
import { z } from "zod/v4";
import { throwError } from "../helpers/error";

export type HillChartItem = z.infer<typeof HillChartItem>;
export const HillChartItem = z.object({
  title: z.string(),
  color: z.string().optional().default("gray"),
  sizeXY: z.number().optional().default(10),
  progressX: z.number().optional().default(0),
  stackY: z.number().optional().default(0),
  alignX: z.number().optional().default(1),
});

export type HillChartData = {
  title: string;
  description: string;
  items: z.input<typeof HillChartItem>[];
};

type SvgSelection<Datum = undefined> = d3.Selection<SVGSVGElement, Datum, null, undefined>;
type HillCoordinate = { x: number; y: number };

export class HillChart {
  width: number = 0;
  height: number = 0;
  styles = {
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
    fontSize: 14,
    lineHeight: 16,
  };

  items: HillChartItem[] = [];
  itemOffsetTop: number = 0;

  xScale: d3.ScaleLinear<number, number> = d3.scaleLinear();
  yScale: d3.ScaleLinear<number, number> = d3.scaleLinear();
  hillMapToY: (x: number) => number = () => 0;
  hillData: HillCoordinate[] = [];
  hillLine: d3.Line<HillCoordinate> = d3.line();

  render(data: HillChartData, width: number, height: number) {
    this.width = width;
    this.height = height;

    this.initItems(data.items as HillChartItem[]);
    this.initScales();
    this.initHill();

    const svg = d3
      .create("svg")
      .attr("viewBox", [0, 0, width, height].join(" "))
      .attr("width", width)
      .attr("height", height);
    this.renderMeta(svg, data.title, data.description);
    this.renderBase(svg);
    this.renderData(svg);
    svg.style("transform", "translateY(0px)");
    return svg.node() ?? throwError("svg selection is empty");
  }

  initItems(items: HillChartItem[]) {
    const signumX = (d: HillChartItem) => {
      if (d.progressX >= 0 && d.progressX < 25) return 1;
      if (d.progressX >= 25 && d.progressX < 50) return 1;
      if (d.progressX >= 50 && d.progressX < 75) return 1;
      if (d.progressX >= 75 && d.progressX <= 100) return -1;
      throw new Error("d.progressX is out of bounds");
    };
    const toPastelColor = (colorStr: string) => {
      const color = d3.hsl(colorStr);
      color.s = 0.6; // Reduce saturation (0 = gray, 1 = full color).
      color.l = 0.6; // Increase lightness (0 = black, 1 = white).
      return color.toString();
    };
    items = HillChartItem.array().parse(items);
    items = items.map((it) => {
      it.progressX = clampToBounds(it.progressX, 0, 100);
      it.progressX = roundToNearestFactor(it.progressX, 5);
      return it;
    });
    items = items.sort(
      (it: HillChartItem, itOther: HillChartItem) => it.progressX - itOther.progressX,
    );
    const dyMap = new Map();
    items = items.map((it) => {
      const dy = dyMap.get(it.progressX);
      it.stackY = dy !== undefined ? dy + 1 : 0;
      dyMap.set(it.progressX, it.stackY);
      it.sizeXY = 10;
      it.alignX = signumX(it);
      it.color = toPastelColor(it.color);
      return it;
    });
    const dy = dyMap.get(50);
    this.itemOffsetTop = dy !== undefined ? dy * 20 : 0;
    this.items = items;
  }

  initScales() {
    const paddingX = 10;
    const paddingTop = 10 + this.itemOffsetTop;
    const paddingBottom = 40;
    this.xScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([paddingX, this.width - paddingX]);
    this.yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([this.height - paddingBottom, paddingTop]);
  }

  initHill() {
    // const easeLinearInOut = (x: number) => 1 - 2 * Math.abs(x - 0.5);
    // this.hillMapToY = (x: number) => easeLinearInOut(x / 100) * 100;
    this.hillMapToY = (x: number) => d3.easeSinInOut((x * 2) / 100) * 100;
    this.hillData = d3
      .range(0, 100, 0.1)
      .map<HillCoordinate>((x) => ({ x, y: this.hillMapToY(x) }));
    this.hillLine = d3
      .line<HillCoordinate>()
      .x((d) => this.xScale(d.x))
      .y((d) => this.yScale(d.y));
  }

  renderMeta(svg: SvgSelection, title: string, description: string) {
    const group = svg.append("g").attr("class", "meta");
    group
      .append("text")
      .text(title)
      .attr("y", this.styles.lineHeight * 0)
      .attr("dominant-baseline", "middle")
      .attr("dy", "0.5em")
      .attr(
        "style",
        `font-family: ${this.styles.fontFamily}; font-size: ${this.styles.fontSize}px; font-weight: 600;`,
      );
    group
      .append("text")
      .text(description)
      .attr("y", this.styles.lineHeight * 1)
      .attr("dominant-baseline", "middle")
      .attr("dy", "0.5em")
      .attr(
        "style",
        `font-family: ${this.styles.fontFamily}; font-size: ${this.styles.fontSize}px;`,
      );
  }

  renderBase(svg: SvgSelection) {
    const group = svg.append("g").attr("class", "base");
    group
      .append("path")
      .attr("class", "hill-line")
      .datum(this.hillData)
      .attr("d", this.hillLine)
      .attr("fill", "none")
      .attr("stroke", "#cccccc")
      .attr("stroke-width", 2);
    group
      .append("line")
      .attr("class", "hill-y")
      .attr("x1", this.xScale(50))
      .attr("y1", this.yScale(0))
      .attr("x2", this.xScale(50))
      .attr("y2", this.yScale(100))
      .attr("stroke", "#cccccc")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "2,3");
    group
      .append("line")
      .attr("class", "hill-x")
      .attr("x1", this.xScale(0))
      .attr("y1", this.yScale(-5))
      .attr("x2", this.xScale(100))
      .attr("y2", this.yScale(-5))
      .attr("stroke", "#cccccc")
      .attr("stroke-width", 1.5);
    group
      .append("text")
      .attr("class", "hill-text")
      .attr(
        "style",
        `font-family: ${this.styles.fontFamily}; font-size: ${this.styles.fontSize}px; text-transform: uppercase; font-weight: 400;`,
      )
      .attr("x", this.xScale(15))
      .attr("y", this.height - 5)
      .attr("fill", "#999999")
      .text("Figure things out");
    group
      .append("text")
      .attr("class", "hill-text")
      .attr(
        "style",
        `font-family: ${this.styles.fontFamily}; font-size: ${this.styles.fontSize}px; text-transform: uppercase; font-weight: 400;`,
      )
      .attr("x", this.xScale(70))
      .attr("y", this.height - 5)
      .attr("fill", "#999999")
      .text("Make it happen");
  }

  renderData(svg: SvgSelection) {
    svg.selectAll(".data").remove();
    const group = svg.selectAll(".data").data(this.items).enter().append("g");
    const dragHandler = this.createDragHandler(svg);
    group
      .attr("class", "data")
      .attr("style", "cursor: pointer;")
      .attr("transform", (d) => {
        const x = this.xScale(d.progressX);
        const y = this.yScale(this.hillMapToY(d.progressX));
        const dy = d.stackY ?? 0;
        return `translate(${x}, ${y - dy * this.styles.lineHeight})`;
      })
      .call(dragHandler as any);
    group
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", (d) => d.sizeXY)
      .attr("fill", (d) => d.color)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .on("mouseover", function (_e, d) {
        const color = d3.color(d.color)?.darker(1) ?? throwError("no color");
        d3.select(this).attr("fill", color.toString());
      })
      .on("mouseout", function (_e, d) {
        const color = d3.color(d.color) ?? throwError("no color");
        d3.select(this).attr("fill", color.toString());
      });
    group
      .append("line")
      .attr("x1", (d) => 10 * d.alignX)
      .attr("y1", (_d) => 0)
      .attr("x2", (d) => 20 * d.alignX)
      .attr("y2", (_d) => 0)
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 1.5);
    group
      .append("text")
      .attr(
        "style",
        `font-family: ${this.styles.fontFamily}; font-size: ${this.styles.fontSize}px;`,
      )
      .attr("x", (d) => 22 * d.alignX)
      .attr("y", (_d) => 5)
      .attr("text-anchor", (d) => (d.alignX === 1 ? "start" : "end"))
      .attr("stroke", "white")
      .attr("stroke-width", 3)
      .text((d) => d.title);
    group
      .append("text")
      .attr(
        "style",
        `font-family: ${this.styles.fontFamily}; font-size: ${this.styles.fontSize}px;`,
      )
      .attr("x", (d) => 22 * d.alignX)
      .attr("y", (_d) => 5)
      .attr("text-anchor", (d) => (d.alignX === 1 ? "start" : "end"))
      .attr("fill", (d) => (d.progressX === 0 || d.progressX === 100 ? "#aaa" : "#000"))
      .text((d) => d.title);
  }

  createDragHandler(svg: SvgSelection) {
    const handleDrag = (
      elem: Element,
      e: d3.D3DragEvent<Element, HillChartItem, HillChartItem>,
    ) => {
      const x = e.subject.progressX + this.xScale.invert(this.xScale(0) + e.dx);
      e.subject.progressX = clampToBounds(x, 0, 100);
      d3.select(elem).attr(
        "transform",
        `translate(${this.xScale(e.subject.progressX)}, ${this.yScale(this.hillMapToY(e.subject.progressX))})`,
      );
    };
    const handleDragEnd = (
      _elem: Element,
      e: d3.D3DragEvent<Element, HillChartItem, HillChartItem>,
    ) => {
      const x = e.subject.progressX + this.xScale.invert(this.xScale(0) + e.dx);
      e.subject.progressX = clampToBounds(x, 0, 100);
      e.subject.progressX = roundToNearestFactor(e.subject.progressX, 5);
      this.initItems(this.items);
      this.renderData(svg);
    };
    const dragHandler = d3.drag<Element, HillChartItem>();
    dragHandler.on("drag", function (e) {
      handleDrag(this, e);
    });
    dragHandler.on("end", function (e) {
      handleDragEnd(this, e);
    });
    return dragHandler;
  }
}

export const clampToBounds = (value: number, minValue: number, maxValue: number) => {
  return Math.max(minValue, Math.min(maxValue, value));
};

export const roundToNearestFactor = (value: number, factor: number) => {
  return Math.round(value / factor) * factor;
};

export const createSvgElement = (width: number, height: number) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", [0, 0, width, height].join(" "));
  svg.setAttribute("width", width.toString());
  svg.setAttribute("height", height.toString());
  return svg;
};
