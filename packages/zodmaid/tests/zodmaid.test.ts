import { Resvg, type ResvgRenderOptions } from "@resvg/resvg-js";
import { test } from "bun:test";
import { curveBasis, line } from "d3-shape";
import { Graph, graphlib, layout } from "graphre";
import { type EdgeLabel, type GraphLabel, type GraphNode } from "graphre/types";
import { resolve } from "node:path";
import {
  arrow,
  edge,
  id,
  node,
  type AttrType,
  type DiagramType,
  type EdgeType,
  type LabelType,
  type NodeType,
} from "../domains/diagramDomain";

type DaGraph = Graph<
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

const throwError = (message: string): never => {
  throw new Error(message);
};

type DiagramOptions = {
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

function textBbox(
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

function populate(diagram: DiagramType, options: DiagramOptions) {
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

function render(g: DaGraph, options: DiagramOptions) {
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

const fontFile = (path: string) => {
  return resolve(import.meta.dir, path);
};

// const fontBuffers = await Promise.all(
//   options.resvg.font.fontFiles.map(async (fontFile) => {
//     return new Uint8Array(await Bun.file(fontFile).arrayBuffer());
//   })
// );

test("zodmaid", () => {
  const diagram = [
    node(id("main"), ["«api»", "main"]),
    node(id("events"), ["«topic»", "events"]),
    node(id("services/reader.ts"), ["«service»", "services/reader.ts"]),
    node(id("services/generator.ts"), ["«service»", "services/generator.ts"]),
    node(id("generated-images"), ["«bucket»", "generated-images"]),
    node(id("generate-image"), ["«job»", "generate-image"]),
    node(id("generate-story"), ["«job»", "generate-story"]),
    node(id("jobs/generate-image.ts"), ["«job»", "jobs/generate-image.ts"]),
    node(id("jobs/generate-story.ts"), ["«job»", "jobs/generate-story.ts"]),
    node(id("model_key"), ["«secret»", "model_key"]),

    edge(node("main"), arrow("->"), node("services/reader.ts"), "routes"),
    edge(node("main"), arrow("->"), node("services/generator.ts"), "routes"),
    edge(node("events"), arrow("->"), node("services/generator.ts"), "triggers"),

    edge(node("services/reader.ts"), arrow("->"), node("generated-images"), "get, list"),
    edge(node("services/reader.ts"), arrow("->"), node("generate-image"), "submit"),
    edge(node("services/generator.ts"), arrow("->"), node("generate-story"), "submit"),

    edge(node("generated-images"), arrow("->"), node("jobs/generate-image.ts"), "put"),
    edge(node("generate-image"), arrow("->"), node("jobs/generate-image.ts"), "runs on"),
    edge(node("generate-image"), arrow("->"), node("jobs/generate-story.ts"), "submit"),
    edge(node("generate-story"), arrow("->"), node("jobs/generate-story.ts"), "runs on"),

    edge(node("jobs/generate-story.ts"), arrow("->"), node("model_key"), "access"),
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

  const options: DiagramOptions = {
    zodmaid: {
      fill: colors["--color-sandstone-300"],
      fillSecondary: colors["--color-sandstone-100"],
      stroke: colors["--color-sandstone-900"],
      nodePadding: 8,
      edgePadding: 2,
      nodeSpacing: 40,
      edgeSpacing: 10,
    },
    dagre: {
      acyclicer: "greedy",
      ranker: "network-simplex",
      rankdir: "TB",
      // align: "UL",
      ranksep: 40, // zodmaid.nodeSpacing
      nodesep: 40, // zodmaid.nodeSpacing
      edgesep: 10, // zodmaid.edgeSpacing
      marginx: 40,
      marginy: 40,
    },
    resvg: {
      font: {
        defaultFontFamily: "inter",
        defaultFontSize: 14,
        fontFiles: [
          fontFile("../assets/font-inter/inter-latin-400-normal.ttf"),
          fontFile("../assets/font-inter/inter-latin-400-italic.ttf"),
          fontFile("../assets/font-inter/inter-latin-700-normal.ttf"),
          fontFile("../assets/font-inter/inter-latin-700-italic.ttf"),
          // fontFile("../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2"),
          // fontFile("../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2"),
        ],
      },
    },
  };

  console.log("populate");
  const g = populate(diagram, options) as DaGraph;

  console.log("layout");
  layout(g);

  console.log("render");
  const image = render(g, options);
  Bun.write("dist/zodmaid.png", image.png);
});
