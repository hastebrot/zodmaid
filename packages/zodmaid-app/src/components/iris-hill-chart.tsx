import * as d3 from "d3";
import { z } from "zod/v4";
import { throwError } from "../helpers/error";

type Item = z.infer<typeof Item>;
const Item = z.object({
  title: z.string(),
  color: z.string(),
  x: z.number(),
  dy: z.number().optional().default(0),
  r: z.number().optional().default(10),
  signX: z.number().optional().default(1),
});

const mapperX = (x: number) => 50 * Math.sin((Math.PI / 50) * x - (1 / 2) * Math.PI) + 50;

const clampToBounds = (value: number, minValue: number, maxValue: number) => {
  return Math.max(minValue, Math.min(maxValue, value));
};

const roundToNearestFactor = (value: number, factor: number) => {
  return Math.round(value / factor) * factor;
};

const createSvgElement = (width: number, height: number) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", [0, 0, width, height].join(","));
  svg.setAttribute("width", width.toString());
  svg.setAttribute("height", height.toString());
  return svg;
};

type SvgSelection<T> = d3.Selection<SVGSVGElement, T, null, undefined>;

export class HillChart {
  width: number = 0;
  height: number = 0;
  styles: { fontFamily: string; fontSize: number; lineHeight: number } = {
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
    fontSize: 14,
    lineHeight: 16,
  };
  paddingTop: number = 0;
  items: any;
  xScale: any;
  yScale: any;
  hillData: { x: number; y: number }[] = [];
  hillLine: any;

  render(
    data: { title: string; description: string; items: Item[] },
    width: number,
    height: number,
  ) {
    this.width = width;
    this.height = height;

    this.initItems(data.items);
    this.initScales();
    this.initHill();

    const svg = d3.select<SVGSVGElement, Item>(createSvgElement(width, height));
    this.renderTitle(svg, data.title, data.description);
    this.renderBase(svg);
    this.renderData(svg);
    svg.style("transform", "translateY(0px)");
    return svg.node();
  }

  initItems(items: Item[]) {
    const signumX = (d: Item) => {
      if (d.x >= 0 && d.x < 25) return 1;
      if (d.x >= 25 && d.x < 50) return 1;
      if (d.x >= 50 && d.x < 75) return 1;
      if (d.x >= 75 && d.x <= 100) return -1;
      throw new Error("d.x is out of bounds");
    };
    const toPastelColor = (colorStr: string) => {
      const color = d3.hsl(colorStr);
      color.s = 0.6; // Reduce saturation (0 = gray, 1 = full color).
      color.l = 0.6; // Increase lightness (0 = black, 1 = white).
      return color.toString();
    };
    items = Item.array().parse(items);
    items = items.map((it) => {
      it.x = clampToBounds(it.x, 0, 100);
      it.x = roundToNearestFactor(it.x, 5);
      return it;
    });
    items = items.sort((it: Item, itOther: Item) => it.x - itOther.x);
    const dyMap = new Map();
    items = items.map((it) => {
      const dy = dyMap.get(it.x);
      it.dy = dy !== undefined ? dy + 1 : 0;
      dyMap.set(it.x, it.dy);
      it.r = 10;
      it.signX = signumX(it);
      it.color = toPastelColor(it.color);
      return it;
    });
    const dy = dyMap.get(50);
    this.paddingTop = dy !== undefined ? dy * 20 : 0;
    this.items = items;
  }

  initScales() {
    const paddingX = 10;
    const paddingTop = 10 + this.paddingTop;
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
    this.hillData = d3.range(0, 100, 0.1).map((i) => ({
      x: i,
      y: mapperX(i),
    }));
    this.hillLine = d3
      .line<(typeof this.hillData)[0]>()
      .x((d) => this.xScale(d.x))
      .y((d) => this.yScale(d.y));
  }

  renderTitle(svg: SvgSelection<Item>, title: string, description: string) {
    svg
      .append("text")
      .text(title)
      .attr("y", this.styles.lineHeight * 0)
      .attr("dominant-baseline", "middle")
      .attr("dy", "0.5em")
      .attr(
        "style",
        `font-family: ${this.styles.fontFamily}; font-size: ${this.styles.fontSize}px; font-weight: 600;`,
      );
    svg
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

  renderBase(svg: SvgSelection<Item>) {
    svg
      .append("path")
      .attr("class", "hill-line")
      .datum(this.hillData)
      .attr("d", this.hillLine)
      .attr("fill", "none")
      .attr("stroke", "#cccccc")
      .attr("stroke-width", 2);
    svg
      .append("line")
      .attr("class", "hill-y")
      .attr("x1", this.xScale(50))
      .attr("y1", this.yScale(0))
      .attr("x2", this.xScale(50))
      .attr("y2", this.yScale(100))
      .attr("stroke", "#cccccc")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "2,3");
    svg
      .append("line")
      .attr("class", "hill-x")
      .attr("x1", this.xScale(0))
      .attr("y1", this.yScale(-5))
      .attr("x2", this.xScale(100))
      .attr("y2", this.yScale(-5))
      .attr("stroke", "#cccccc")
      .attr("stroke-width", 1.5);
    svg
      .append("text")
      .attr("class", "text")
      .attr(
        "style",
        `font-family: ${this.styles.fontFamily}; font-size: ${this.styles.fontSize}px; text-transform: uppercase; font-weight: 400;`,
      )
      .attr("x", this.xScale(15))
      .attr("y", this.height - 5)
      .attr("fill", "#999999")
      .text("Figure things out");
    svg
      .append("text")
      .attr("class", "text")
      .attr(
        "style",
        `font-family: ${this.styles.fontFamily}; font-size: ${this.styles.fontSize}px; text-transform: uppercase; font-weight: 400;`,
      )
      .attr("x", this.xScale(70))
      .attr("y", this.height - 5)
      .attr("fill", "#999999")
      .text("Make it happen");
  }

  renderData(svg: SvgSelection<Item>) {
    const handleDrag = (elem: Element, e: any) => {
      const x = e.subject.x + this.xScale.invert(this.xScale(0) + e.dx);
      e.subject.x = clampToBounds(x, 0, 100);
      d3.select(elem).attr(
        "transform",
        `translate(${this.xScale(e.subject.x)}, ${this.yScale(mapperX(e.subject.x))})`,
      );
    };
    const handleDragEnd = (_elem: Element, e: any) => {
      const x = e.subject.x + this.xScale.invert(this.xScale(0) + e.dx);
      e.subject.x = clampToBounds(x, 0, 100);
      e.subject.x = roundToNearestFactor(e.subject.x, 5);
      this.initItems(this.items);
      this.renderData(svg);
    };
    const dragHandler = d3.drag<Element, Item>();
    dragHandler.on("drag", function (e) {
      handleDrag(this, e);
    });
    dragHandler.on("end", function (e) {
      handleDragEnd(this, e);
    });

    svg.selectAll(".group").remove();
    const group = svg
      .selectAll(".group")
      .data<Item>(this.items)
      .enter()
      .append("g")
      .attr("class", "group")
      .attr("style", "cursor: pointer;")
      .attr("transform", (d) => {
        const x = this.xScale(d.x);
        const y = this.yScale(mapperX(d.x));
        const dy = d.dy ?? 0;
        return `translate(${x}, ${y - dy * this.styles.lineHeight})`;
      })
      .call(dragHandler as any);
    group
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", (d) => d.r)
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
      .attr("x1", (d) => 10 * d.signX)
      .attr("y1", (_d) => 0)
      .attr("x2", (d) => 20 * d.signX)
      .attr("y2", (_d) => 0)
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 1.5);
    group
      .append("text")
      .attr(
        "style",
        `font-family: ${this.styles.fontFamily}; font-size: ${this.styles.fontSize}px;`,
      )
      .attr("x", (d) => 22 * d.signX)
      .attr("y", (_d) => 5)
      .attr("text-anchor", (d) => (d.signX === 1 ? "start" : "end"))
      .attr("stroke", "white")
      .attr("stroke-width", 3)
      .text((d) => d.title);
    group
      .append("text")
      .attr(
        "style",
        `font-family: ${this.styles.fontFamily}; font-size: ${this.styles.fontSize}px;`,
      )
      .attr("x", (d) => 22 * d.signX)
      .attr("y", (_d) => 5)
      .attr("text-anchor", (d) => (d.signX === 1 ? "start" : "end"))
      .attr("fill", (d) => (d.x === 0 || d.x === 100 ? "#aaa" : "#000"))
      .text((d) => d.title);
  }
}
