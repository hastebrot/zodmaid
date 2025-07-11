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
  svg: {
    defaultFontFamily?: string;
    defaultFontSize?: number;
    measureText: (
      text: string[],
      fontWeight: "normal" | "bold",
      fontStyle: "normal" | "italic",
    ) => { width: number; height: number };
  };
  zodmaid: {
    fill: string;
    fillAlternate: string;
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
};

export function collect(diagram: DiagramType, options: DiagramOptions) {
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
      const bbox = options.svg.measureText(label.split("\n"), "bold", "normal");
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
      const bbox = options.svg.measureText(label.split("\n"), "normal", "italic");
      // console.log("edge", sourceId, targetId, label);
      g.setEdge(sourceId, targetId, {
        label,
        width: bbox.width + options.zodmaid.edgePadding * 2,
        height: bbox.height + options.zodmaid.edgePadding * 2,
      });
    }
  }

  return g as DaGraph;
}

export function layout(g: DaGraph) {
  return graphLayout(g);
}

export function render(g: DaGraph, options: DiagramOptions) {
  const nodes = g.nodes().map((n) => {
    const node = g.node(n) ?? throwError("no node");
    const x = node.x - node.width / 2;
    const y = node.y - node.height / 2;
    const dy = options.svg.defaultFontSize ?? 0;
    const labels = node.label?.split("\n") ?? [];
    return /* xml */ `
      <g data-node="${n}">
        <rect
          tabindex="0"
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
              style="pointer-events: none;"
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

  const edges = g.edges().map((e, index) => {
    const edge = g.edge(e) ?? throwError("no edge");
    const curve = line().curve(curveBasis);
    const path = curve(edge.points.map((p) => [p.x, p.y]));
    const label = edge.label;
    const point = edge.points[1] ?? throwError("no point");
    const x = point.x - edge.width / 2;
    const y = point.y - edge.height / 2;
    return /* xml */ `
      <g data-edge="${index}">
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
          fill="${options.zodmaid.fillAlternate}"
          stroke="none"
        />
        <text
          x="${x + options.zodmaid.edgePadding}"
          y="${y + options.zodmaid.edgePadding}"
          fill="${options.zodmaid.stroke}"
          font-style="italic"
          dominant-baseline="middle"
          dy="0.5em">
          ${label}
        </text>
      </g>
    `;
  });

  const svg = /* xml */ `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${g.graph().width}"
      height="${g.graph().height}"
      viewBox="0 0 ${g.graph().width} ${g.graph().height}"
    >
      <g
        transform="scale(1.0)"
        font-family="${options.svg.defaultFontFamily}"
        font-size="${options.svg.defaultFontSize}">
        <rect
          width="${g.graph().width}"
          height="${g.graph().height}"
          fill="${options.zodmaid.fillAlternate}"
        />
        ${edges.join("")}
        ${nodes.join("")}
      </g>
    </svg>
  `;
  return svg;
}
