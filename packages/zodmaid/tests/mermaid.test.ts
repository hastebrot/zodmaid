import { Resvg } from "@resvg/resvg-js";
import { test } from "bun:test";
import { curveBasis, line } from "d3-shape";
import { graphlib, layout, type GraphLabel } from "dagre";
import {
  arrow,
  edge,
  id,
  node,
  type DiagramType,
  type EdgeType,
  type NodeType,
} from "../domains/diagramDomain";

const diagram = [
  node(id("browser"), "Client Browser"),
  node(id("api"), "HTTP API - API Gateway"),
  node(id("service"), "GET Route"),
  node(id("service2"), "POST Route"),
  node(id("service3"), "Other Services/APIs"),
  node(id("bucket"), "Storage Bucket"),
  node(id("secrets"), "Secrets Manager"),
  node(id("kvstore"), "Key/Value Store"),
  node(id("rds"), "Relational Database Service"),

  edge(node("browser"), arrow("->"), node("api"), "Sends HTTP Request"),
  edge(node("api"), arrow("->"), node("service"), "Triggers Service"),
  edge(node("api"), arrow("->"), node("service2"), "Triggers Service"),
  edge(node("api"), arrow("->"), node("service3")),
  edge(node("service"), arrow("->"), node("bucket"), "Read/Write"),
  edge(node("service"), arrow("->"), node("secrets"), "Access"),
  edge(node("service"), arrow("->"), node("kvstore"), "Read/Write"),
  edge(node("service"), arrow("->"), node("rds"), "Execute Queries"),
];

// https://www.tints.dev/sandstone/EEE8D5 (300 locked, 10 saturation, perceived)
const colors = {
  "--color-sandstone-50": "#fefcf6",
  "--color-sandstone-100": "#fcf6e6",
  "--color-sandstone-200": "#f7f1db",
  "--color-sandstone-300": "#eee8d5",
  "--color-sandstone-400": "#d1c490",
  "--color-sandstone-500": "#afa066",
  "--color-sandstone-600": "#8d7f3d",
  "--color-sandstone-700": "#695c13",
  "--color-sandstone-800": "#473e00",
  "--color-sandstone-900": "#282200",
  "--color-sandstone-950": "#1a1500",
};

const svgOptions = {
  fontFamily: "Inter",
  fontSize: 14,
  fontFiles: [
    import.meta.resolve("../assets/font-inter/Inter-Regular.ttf").slice("file://".length),
    import.meta.resolve("../assets/font-inter/Inter-Bold.ttf").slice("file://".length),
  ],
  fill: colors["--color-sandstone-300"],
  fillSecondary: colors["--color-sandstone-100"],
  stroke: colors["--color-sandstone-900"],
};

const layoutOptions = {
  padding: 8,
  spacing: 40,
};

function textBbox(text: string, fontWeight: "normal" | "bold" = "normal") {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg">
      <text font-weight="${fontWeight}">${text}</text>
    </svg>
  `;
  const resvg = new Resvg(svg, {
    font: {
      loadSystemFonts: svgOptions.fontFiles === undefined ? true : false,
      fontFiles: svgOptions.fontFiles,
      defaultFontFamily: svgOptions.fontFamily,
      defaultFontSize: svgOptions.fontSize,
    },
  });
  const bbox = resvg.getBBox();
  return {
    width: bbox?.width ?? 0,
    height: Math.max(bbox?.height ?? 0, svgOptions.fontSize),
  };
}

function render(g: graphlib.Graph) {
  const nodes = g.nodes().map((n) => {
    const node = g.node(n);
    const x = node.x - node.width / 2;
    const y = node.y - node.height / 2;
    return /* xml */ `
      <g>
        <rect
          x="${x}"
          y="${y}"
          width="${node.width}"
          height="${node.height}"
          fill="${svgOptions.fill}"
          stroke="${svgOptions.stroke}"
          stroke-width="2"
        />
        <text
          x="${x + layoutOptions.padding}"
          y="${y + layoutOptions.padding}"
          fill="${svgOptions.stroke}"
          font-weight="bold"
          dominant-baseline="middle"
          dy="0.5em">${node.label}</text>

      </g>
    `;
  });

  const edges = g.edges().map((e) => {
    const edge = g.edge(e);
    const curve = line().curve(curveBasis);
    const path = curve(edge.points.map((p) => [p.x, p.y]));
    const label = edge.label;
    const point = edge.points[1];
    const x = point!.x - edge.width / 2;
    const y = point!.y - edge.height / 2;
    return /* xml */ `
      <path
        d="${path}"
        fill="none"
        stroke="${svgOptions.stroke}"
        stroke-width="2"
      />
      <rect
        x="${x}"
        y="${y}"
        width="${edge.width}"
        height="${edge.height}"
        fill="${svgOptions.fillSecondary}"
        stroke="none"
      />
      <text
        x="${x}"
        y="${y}"
        fill="${svgOptions.stroke}"
        dominant-baseline="middle"
        dy="0.5em">${label}</text>
    `;
  });

  const svg = /* xml */ `
    <svg xmlns="http://www.w3.org/2000/svg">
      <g>
        ${edges.join("")}
        ${nodes.join("")}
      </g>
    </svg>
  `;
  const resvg = new Resvg(svg, {
    background: svgOptions.fillSecondary,
    font: {
      loadSystemFonts: svgOptions.fontFiles === undefined ? true : false,
      fontFiles: svgOptions.fontFiles,
      defaultFontFamily: svgOptions.fontFamily,
      defaultFontSize: svgOptions.fontSize,
    },
    shapeRendering: 2,
    textRendering: 2,
    imageRendering: 0,
  });
  return {
    svg: resvg.toString(),
    png: resvg.render().asPng(),
  };
}

// https://github.com/dagrejs/dagre/wiki#configuring-the-layout
type PopulateOptions = {
  graph: GraphLabel & {
    rankdir?: "TB" | "BT" | "LR" | "RL";
    align?: "UL" | "UR" | "DL" | "DR";
    acyclicer?: "greedy";
    ranker?: "network-simplex" | "tight-tree" | "longest-path";
  };
};

function populate(diagram: DiagramType, options: PopulateOptions) {
  const throwError = (message: string): never => {
    throw new Error(message);
  };
  const nodeId = (node: NodeType): string | null => {
    const attrId = node.attrs?.find((it) => it.key === "id")?.value;
    const labelId = node.labels && node.labels[0] && node.labels[0].text[0];
    return attrId ?? labelId ?? null;
  };
  const nodeLabel = (node: NodeType): string | null => {
    const labelText = node.labels && node.labels[0] && node.labels[0].text[0];
    return labelText ?? null;
  };
  const edgeSourceId = (edge: EdgeType): string | null => {
    const sourceId = edge.nodes && edge.nodes[0] && nodeId(edge.nodes[0]);
    return sourceId ?? null;
  };
  const edgeTargetId = (edge: EdgeType): string | null => {
    const targetId = edge.nodes && edge.nodes[1] && nodeId(edge.nodes[1]);
    return targetId ?? null;
  };
  const edgeLabel = (edge: EdgeType): string | null => {
    const label = edge.labels && edge.labels[0] && edge.labels[0].text[0];
    return label ?? null;
  };

  const g = new graphlib.Graph();
  g.setGraph({ ...options.graph });
  g.setDefaultEdgeLabel(() => ({}));

  for (const item of diagram) {
    if (item.type === "node") {
      const id = nodeId(item) ?? throwError("node id missing");
      const label = nodeLabel(item) ?? "";
      const bbox = textBbox(label, "bold");
      // console.log("node", id, label);
      g.setNode(id, {
        label,
        width: bbox.width + layoutOptions.padding * 2,
        height: bbox.height + layoutOptions.padding * 2,
      });
    }
  }
  for (const item of diagram) {
    if (item.type === "edge") {
      const sourceId = edgeSourceId(item) ?? throwError("edge source id missing");
      const targetId = edgeTargetId(item) ?? throwError("edge target id missing");
      const label = edgeLabel(item) ?? "";
      const bbox = textBbox(label!);
      // console.log("edge", sourceId, targetId, label);
      g.setEdge(sourceId, targetId, { label, width: bbox.width, height: bbox.height });
    }
  }

  return g;
}

test("mermaid", () => {
  console.log("populate");
  const g = populate(diagram, {
    graph: {
      acyclicer: "greedy",
      ranker: "network-simplex",
      rankdir: "TB",
      // align: "UL",
      // nodesep: 0,
      // edgesep: 0,
      // ranksep: 0,
    },
  });

  console.log("layout");
  layout(g);

  console.log("render");
  const image = render(g);
  Bun.write("dist/mermaid.png", image.png);
});
