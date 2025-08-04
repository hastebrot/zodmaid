import { Graph as DagreGraph } from "@antv/graphlib";
import { AntVDagreLayout as DagreLayout, type EdgeData, type NodeData } from "@antv/layout";
import { Graph } from "@antv/x6";
import { useEffect, useRef } from "react";
import { useDocumentTitle } from "../../helpers/react";

export const OctoDiagramAntvPage = () => {
  useDocumentTitle("octo: diagram antv");
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    async function process() {
      if (!container.current) return;
      const graph = new Graph({
        container: container.current,
        grid: true,
      });
      const data = graphData();
      const dagreGraph = new DagreGraph<NodeData, EdgeData>({
        nodes: data.nodes.map((node) => {
          let label = node.id.toString();
          // label = node.data.name ?? label;
          return {
            ...node,
            data: {
              ...node.data,
              label: label,
              width: Math.max(20 + 14, 10 + measureText(label, "inter", 14, "normal", "normal")),
              height: 20 + 14,
            },
          };
        }),
        edges: data.edges,
      });

      const dagreLayout = new DagreLayout({
        begin: [0, 0],
        controlPoints: true,
      });
      await dagreLayout.assign(dagreGraph, {
        align: "UR",
        rankdir: "LR",
        ranksep: 30,
        nodesep: 20,
        nodeSize(node) {
          return [node.data.width, node.data.height];
        },
      });

      for (const node of dagreGraph.getAllNodes()) {
        graph.addNode({
          id: node.id.toString(),
          x: node.data.x,
          y: node.data.y,
          width: node.data.width,
          height: node.data.height,
          attrs: {
            rect: {
              stroke: "#aaa",
            },
            text: {
              text: node.data.label,
              fontSize: 14,
              fontFamily: "inter",
            },
          },
        });
      }
      for (const edge of dagreGraph.getAllEdges()) {
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
          // https://x6.antv.antgroup.com/api/registry/connector
          connector: {
            // name: "normal",
            // name: "smooth",
            name: "rounded",
            args: {
              radius: 15,
            },
          },
          // https://x6.antv.antgroup.com/api/registry/router
          router: {
            // name: "orth",
            name: "manhattan",
            // name: "metro",
            // name: "none",
            args: {
              padding: 20,
              startDirections: ["left", "right"],
              endDirections: ["left", "right"],
            },
          },
        });
      }
      graph.zoomToFit({ padding: 10 });
    }
    process();
  }, [container]);

  return <div ref={container} style={{ width: "800px", height: "500px" }}></div>;
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
