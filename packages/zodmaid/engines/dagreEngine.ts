import { Resvg, type ResvgRenderOptions } from "@resvg/resvg-js";
import { curveBasis, line } from "d3-shape";
import { Graph, layout as graphLayout, graphlib } from "graphre";
import { type EdgeLabel, type GraphLabel, type GraphNode } from "graphre/types";
import {
  type AttrType,
  type DiagramType,
  type EdgeType,
  type LabelType,
  type NodeType,
} from "../domains/diagramDomain";

export const throwError = (message: string): never => {
  throw new Error(message);
};

export type DaGraph = Graph<
  GraphLabel & {
    width: number;
    height: number;
  },
  GraphNode & {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
  },
  EdgeLabel & {
    points: { x: number; y: number }[];
    width: number;
    height: number;
    label: string;
  }
>;

export type DiagramOptions = {
  zodmaid: {
    fill: string;
    fillSecondary: string;
    stroke: string;
    nodePadding: number;
    edgePadding: number;
    nodeSpacing: number;
    edgeSpacing: number;
  };
  // https://github.com/dagrejs/dagre/wiki#configuring-the-layout
  dagre: GraphLabel & {
    rankdir?: "TB" | "BT" | "LR" | "RL";
    align?: "UL" | "UR" | "DL" | "DR";
    acyclicer?: "greedy";
    ranker?: "network-simplex" | "tight-tree" | "longest-path";
  };
  resvg: ResvgRenderOptions;
};

export function textBbox(
  text: string[],
  options: ResvgRenderOptions,
  fontWeight: "normal" | "bold" = "normal",
  fontStyle: "normal" | "italic" = "normal"
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg">
      ${text
        .map((it) => {
          return `<text font-weight="${fontWeight}" font-style="${fontStyle}">${it}</text>`;
        })
        .join("")}
    </svg>
  `;
  const resvg = new Resvg(svg, {
    font: {
      loadSystemFonts: options.font?.fontFiles === undefined ? true : false,
      fontFiles: options.font?.fontFiles,
      defaultFontFamily: options.font?.defaultFontFamily,
      defaultFontSize: options.font?.defaultFontSize,
    },
  });
  const bbox = resvg.getBBox();
  return {
    width: bbox?.width ?? 0,
    height: Math.max(text.length * (options.font?.defaultFontSize ?? 0)),
  };
}

export function populate(diagram: DiagramType, options: DiagramOptions) {
  const labelOrNull = (labels: LabelType[] | undefined, index: number): string | null => {
    const label = labels && labels[index];
    return label?.text.join("\n") ?? null;
  };
  const valueOrNull = (attrs: AttrType[] | undefined, key: string): string | null => {
    const attr = attrs && attrs.find((it) => it.key === key);
    return attr?.value ?? null;
  };
  const nodeId = (node: NodeType): string | null => {
    return valueOrNull(node.attrs, "id") ?? labelOrNull(node.labels, 0);
  };
  const nodeLabel = (node: NodeType): string | null => {
    return labelOrNull(node.labels, 0);
  };
  const edgeSourceId = (edge: EdgeType): string | null => {
    const node = edge.nodes && edge.nodes[0];
    return node ? nodeId(node) : null;
  };
  const edgeTargetId = (edge: EdgeType): string | null => {
    const node = edge.nodes && edge.nodes[1];
    return node ? nodeId(node) : null;
  };
  const edgeLabel = (edge: EdgeType): string | null => {
    return labelOrNull(edge.labels, 0);
  };

  const g = new graphlib.Graph();
  g.setGraph({ ...options.dagre });
  g.setDefaultEdgeLabel(() => ({}));

  for (const item of diagram) {
    if (item.type === "node") {
      const id = nodeId(item) ?? throwError("no node id");
      const label = nodeLabel(item) ?? "";
      const bbox = textBbox(label.split("\n"), options.resvg, "bold");
      // console.log("node", id, label);
      g.setNode(id, {
        label,
        width: bbox.width + options.zodmaid.nodePadding * 2,
        height: bbox.height + options.zodmaid.nodePadding * 2,
      });
    }
  }
  for (const item of diagram) {
    if (item.type === "edge") {
      const sourceId = edgeSourceId(item) ?? throwError("no edge source id");
      const targetId = edgeTargetId(item) ?? throwError("no edge target id");
      const label = edgeLabel(item) ?? "";
      const bbox = textBbox(label.split("\n"), options.resvg);
      // console.log("edge", sourceId, targetId, label);
      g.setEdge(sourceId, targetId, {
        label,
        width: bbox.width + options.zodmaid.edgePadding * 2,
        height: bbox.height + options.zodmaid.edgePadding * 2,
      });
    }
  }

  return g;
}

export function layout(g: DaGraph) {
  return graphLayout(g);
}

export function render(g: DaGraph, options: DiagramOptions) {
  const nodes = g.nodes().map((n) => {
    const node = g.node(n) ?? throwError("no node");
    const x = node.x - node.width / 2;
    const y = node.y - node.height / 2;
    const dy = options.resvg.font?.defaultFontSize ?? 0;
    const labels = node.label?.split("\n") ?? [];
    return /* xml */ `
      <g>
        <rect
          x="${x}"
          y="${y}"
          rx="2"
          ry="2"
          width="${node.width}"
          height="${node.height}"
          fill="${options.zodmaid.fill}"
          stroke="${options.zodmaid.stroke}"
          stroke-width="2"
        />
        ${labels.map((label, index) => {
          return /* xml */ `
            <text
              x="${node.x}"
              y="${y + options.zodmaid.nodePadding + dy * index}"
              fill="${options.zodmaid.stroke}"
              font-weight="${index === 0 ? "bold" : "normal"}"
              text-anchor="middle"
              dominant-baseline="middle"
              dy="0.5em">${label}</text>
          `;
        })}
      </g>
    `;
  });

  const edges = g.edges().map((e) => {
    const edge = g.edge(e) ?? throwError("no edge");
    const curve = line().curve(curveBasis);
    const path = curve(edge.points.map((p) => [p.x, p.y]));
    const label = edge.label;
    const point = edge.points[1] ?? throwError("no point");
    const x = point.x - edge.width / 2;
    const y = point.y - edge.height / 2;
    return /* xml */ `
      <path
        d="${path}"
        fill="none"
        stroke="${options.zodmaid.stroke}"
        stroke-width="2"
      />
      <rect
        x="${x}"
        y="${y}"
        width="${edge.width}"
        height="${edge.height}"
        fill="${options.zodmaid.fillSecondary}"
        stroke="none"
      />
      <text
        x="${x + options.zodmaid.edgePadding}"
        y="${y + options.zodmaid.edgePadding}"
        fill="${options.zodmaid.stroke}"
        font-style="italic"
        dominant-baseline="middle"
        dy="0.5em">${label}</text>
    `;
  });

  const svg = /* xml */ `
    <svg xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.0)">
        <rect
          width="${g.graph().width}"
          height="${g.graph().height}"
          fill="${options.zodmaid.fillSecondary}"
        />
        ${edges.join("")}
        ${nodes.join("")}
      </g>
    </svg>
  `;
  const resvg = new Resvg(svg, {
    fitTo: { mode: "zoom", value: 1 },
    background: options.zodmaid.fillSecondary,
    font: {
      loadSystemFonts: options.resvg.font?.fontFiles === undefined ? true : false,
      fontFiles: options.resvg.font?.fontFiles,
      defaultFontFamily: options.resvg.font?.defaultFontFamily,
      defaultFontSize: options.resvg.font?.defaultFontSize,
    },
    shapeRendering: 2, // geometricPrecision
    textRendering: 2, // geometricPrecision
    imageRendering: 0, // optimizeQuality
  });
  return {
    svg: resvg.toString(),
    png: resvg.render().asPng(),
  };
}
