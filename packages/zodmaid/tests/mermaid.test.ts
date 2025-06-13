import { Resvg } from "@resvg/resvg-js";
import { expect, test } from "bun:test";
import { curveBasis, line } from "d3";
import { graphlib, layout, type GraphLabel } from "dagre";

type Chart = {
  node?: string;
  edge?: [string, string];
  "[]"?: string;
  "-->"?: string;
};

// https://github.com/nitrictech/nitric/blob/v1.27.1/docs/docs/architecture/index.mdx
// https://nitric.io/docs/architecture#example-handling-http-requests
const chart: Chart[] = [
  { node: "Browser", "[]": "Client Browser" },
  { node: "API", "[]": "HTTP API - API Gateway" },
  { node: "Service", "[]": "GET Route" },
  { node: "Service2", "[]": "POST Route" },
  { node: "Service3", "[]": "Other Services/APIs" },
  { node: "Bucket", "[]": "Storage Bucket" },
  { node: "Secrets", "[]": "Secrets Manager" },
  { node: "KVStore", "[]": "Key/Value Store" },
  { node: "RDS", "[]": "Relational Database Service" },
  { edge: ["Browser", "API"], "-->": "Sends HTTP Request" },
  { edge: ["API", "Service"], "-->": "Triggers Service" },
  { edge: ["API", "Service2"], "-->": "Triggers Service" },
  { edge: ["API", "Service3"], "-->": "" },
  { edge: ["Service", "Bucket"], "-->": "Read/Write" },
  { edge: ["Service", "Secrets"], "-->": "Access" },
  { edge: ["Service", "KVStore"], "-->": "Read/Write" },
  { edge: ["Service", "RDS"], "-->": "Execute Queries" },
];

const svgOptions = {
  fontFamily: "sans-serif",
  fontSize: 14,
};

function textBbox(text: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg">
      <text>${text}</text>
    </svg>
  `;
  const resvg = new Resvg(svg, {
    font: {
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
    return /* xml */ `
      <g style="text-anchor: start; dominant-baseline: hanging;">
        <rect
          x="${node.x - node.width / 2}"
          y="${node.y - node.height / 2}"
          width="${node.width}"
          height="${node.height}"
          fill="white"
          stroke="black"
        />
        <text
          x="${node.x - node.width / 2}"
          y="${node.y - node.height / 2}"
          fill="black">${node.label}</text>
      </g>
    `;
  });

  const edges = g.edges().map((e) => {
    const edge = g.edge(e);
    const curve = line().curve(curveBasis);
    const path = curve(edge.points.map((p) => [p.x, p.y]));
    const label = edge.label;
    const bbox = textBbox(label);
    const point = edge.points[1];
    return /* xml */ `
      <path
        d="${path}"
        fill="none"
        stroke="black"
      />
      <rect
          x="${point!.x - bbox.width / 2}"
          y="${point!.y - bbox.height / 2}"
          width="${bbox.width}"
          height="${bbox.height}"
          fill="white"
          stroke="none"
        />
      <text
        x="${point!.x - bbox.width / 2}"
        y="${point!.y - bbox.height / 2}"
        fill="black">${label}</text>
    `;
  });

  const svg = /* xml */ `
    <svg xmlns="http://www.w3.org/2000/svg">
      <g style="text-anchor: start; dominant-baseline: hanging;">
        <rect width="100%" height="100%" fill="white" />
        ${edges.join("")}
        ${nodes.join("")}
      </g>
    </svg>
  `;
  const resvg = new Resvg(svg, {
    background: "white",
    font: {
      defaultFontFamily: svgOptions.fontFamily,
      defaultFontSize: svgOptions.fontSize,
    },
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
  };
};

function populate(chart: Chart[], options: PopulateOptions) {
  const g = new graphlib.Graph();
  g.setGraph({ ...options.graph });
  g.setDefaultEdgeLabel(() => ({}));

  for (const item of chart) {
    if (item.node) {
      const node = item.node;
      const label = item["[]"];
      const bbox = textBbox(label!);
      g.setNode(node, { label, width: bbox?.width, height: bbox?.height });
    }
  }
  for (const item of chart) {
    if (item.edge) {
      const [source, target] = item.edge;
      const label = item["-->"];
      g.setEdge(source!, target!, { label });
    }
  }

  return g;
}

test("mermaid", () => {
  expect(chart).toBeArray();

  const g = populate(chart, {
    graph: {
      ranker: "network-simplex",
      acyclicer: "greedy",
      rankdir: "TB",
      // align: "UL",
      // nodesep: 0,
      // edgesep: 0,
      // ranksep: 0,
    },
  });
  layout(g);

  const image = render(g);
  Bun.write("dist/mermaid.png", image.png);
});
