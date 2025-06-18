import { Graph as DagreGraph } from "@antv/graphlib";
import { AntVDagreLayout as DagreLayout, type EdgeData, type NodeData } from "@antv/layout";
import { Graph } from "@antv/x6";
import { useEffect, useRef } from "react";
import { type RouteObject } from "react-router";
import { DiagramPage } from "./diagramPage";

// dagre, https://github.com/antvis/layout/blob/v5/packages/layout/src/dagre.ts
// - uses @dagrejs/dagre, https://github.com/dagrejs/dagre
// - uses @dagrejs/graphlib, https://github.com/dagrejs/graphlib
// antv dagre, https://github.com/antvis/layout/blob/v5/packages/layout/src/antv-dagre.ts
// - uses @antv/graphlib, https://github.com/antvis/graphlib/tree/master/src
// rust dagre, https://github.com/antvis/layout/tree/v5/packages/layout-rust/src/dagre
// - uses @antv/layout-rust, https://github.com/antvis/layout/tree/v5/packages/layout-rust/src/dagre
// - uses graphlib_rust, https://crates.io/crates/graphlib_rust
// - uses dagre_rust, https://crates.io/crates/dagre_rust

export const routes: RouteObject[] = [
  // wrap.
  { path: "/", Component: () => <DiagramPage /> },
  { path: "/antv", Component: () => <Diagram /> },
];

const Diagram = () => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    async function process() {
      if (!container.current) return;
      const graph = new Graph({
        container: container.current,
        grid: true,
      });

      const dagre = new DagreLayout({
        begin: [0, 0],
        controlPoints: true,
      });

      const data = graphData();
      const g = new DagreGraph<NodeData, EdgeData>({
        nodes: data.nodes,
        edges: data.edges,
      });
      const model = await dagre.execute(g, {
        align: "UR",
        rankdir: "LR",
        ranksep: 40,
        nodesep: 40,
      });

      for (const node of model.nodes) {
        graph.addNode({
          id: node.id.toString(),
          x: node.data.x,
          y: node.data.y,
          width: 20 + measureText(node.id.toString(), "inter", 14, "normal", "normal"),
          height: 20 + 14,
          attrs: {
            rect: {
              stroke: "#aaa",
            },
            text: {
              text: node.id,
              fontSize: 14,
              fontFamily: "inter",
            },
          },
        });
      }
      for (const edge of model.edges) {
        const source = graph.getNodes().find((node) => node.id === edge.source.toString());
        const target = graph.getNodes().find((node) => node.id === edge.target.toString());
        graph.addEdge({
          source,
          target,
          attrs: {
            path: {
              stroke: "#aaa",
              strokeWidth: 2,
            },
          },
          connector: {
            // name: "normal",
            // name: "smooth",
            name: "rounded",
          },
          router: {
            // name: "orth",
            name: "manhattan",
            // name: "metro",
            // name: "none",
          },
        });
      }
      graph.zoomToFit({ padding: 10 });
    }
    process();
  }, [container]);

  return <div ref={container} style={{ width: "500px", height: "500px" }}></div>;
};

export function graphData() {
  const data = {
    nodes: [
      {
        id: "1",
        data: {
          name: "alps_file1",
        },
      },
      {
        id: "2",
        data: {
          name: "alps_file2",
        },
      },
      {
        id: "3",
        data: {
          name: "alps_file3",
        },
      },
      {
        id: "4",
        data: {
          name: "sql_file1",
        },
      },
      {
        id: "5",
        data: {
          name: "sql_file2",
        },
      },
      {
        id: "6",
        data: {
          name: "feature_etl_1",
        },
      },
      {
        id: "7",
        data: {
          name: "feature_etl_1",
        },
      },
      {
        id: "8",
        data: {
          name: "feature_extractor",
        },
      },
    ],
    edges: [
      {
        id: "e1",
        data: {},
        source: "1",
        target: "2",
      },
      {
        id: "e2",
        data: {},
        source: "1",
        target: "3",
      },
      {
        id: "e3",
        data: {},
        source: "2",
        target: "4",
      },
      {
        id: "e4",
        data: {},
        source: "3",
        target: "4",
      },
      {
        id: "e5",
        data: {},
        source: "4",
        target: "5",
      },
      {
        id: "e6",
        data: {},
        source: "5",
        target: "6",
      },
      {
        id: "7",
        data: {},
        source: "6",
        target: "7",
      },
      {
        id: "e8",
        data: {},
        source: "6",
        target: "8",
      },
    ],
  };
  return data;
}

const measureText = (
  text: string,
  fontFamily: string,
  fontSize: number,
  fontWeight: string,
  fontStyle: string,
): number => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx === null) return 0;

  ctx.font = `${fontStyle} ${fontWeight} ${fontSize}pt ${fontFamily}`;
  return ctx.measureText(text).width;
};
