import { Resvg } from "@resvg/resvg-js";
import { expect, test } from "bun:test";
import { line } from "d3";
import { graphlib, layout } from "dagre";

type Chart = {
  node?: string;
  edge?: [string, string];
  "[]"?: string;
  "-->"?: string;
};

// https://github.com/nitrictech/nitric/blob/v1.27.1/docs/docs/architecture/index.mdx
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

function textBbox(text: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg">
      <text>${text}</text>
    </svg>
  `;
  const resvg = new Resvg(svg, {
    font: {
      defaultFontFamily: "sans-serif",
      defaultFontSize: 12,
    },
  });
  return resvg.getBBox();
}

function render(g: graphlib.Graph) {
  const nodes = g.nodes().map((n) => {
    const node = g.node(n);
    return /* xml */ `
      <g>
        <rect
          x="${node.x}"
          y="${node.y}"
          width="${node.width}"
          height="${node.height}"
          fill="none"
          stroke="black"
        />
        <text x="${node.x}" y="${node.y}" fill="black">${node.label}</text>
      </g>
    `;
  });

  const edges = g.edges().map((e) => {
    const edge = g.edge(e);
    const path = line()(edge.points.map((p) => [p.x, p.y]));
    return /* xml */ `
      <path
        d="${path}"
        fill="none"
        stroke="black"
      />
    `;
  });

  const svg = /* xml */ `
    <svg xmlns="http://www.w3.org/2000/svg">
      <g style="text-anchor: start; dominant-baseline: hanging;">
        <rect width="100%" height="100%" fill="white" />
        ${nodes.join("")}
        ${edges.join("")}
      </g>
    </svg>
  `;
  const resvg = new Resvg(svg, {
    background: "white",
    font: {
      defaultFontFamily: "sans-serif",
      defaultFontSize: 12,
    },
  });
  const png = resvg.render();
  return png.asPng();
}

function populate(chart: Chart[]) {
  const g = new graphlib.Graph();
  g.setGraph({});
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

  const g = populate(chart);
  layout(g, {
    rankdir: "TD",
    ranker: "network-simplex",
    acyclicer: "greedy",
  });

  const png = render(g);
  Bun.write("dist/g.png", png);
});
