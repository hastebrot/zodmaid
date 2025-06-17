import { useEffect, useRef } from "react";
import {
  arrow,
  collect,
  edge,
  id,
  layout,
  node,
  render,
  type DiagramOptions,
  type DiagramType,
} from "zodmaid";

export const DiagramPage = () => {
  const diagram: DiagramType = [
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

  const fontFamily = "inter";
  const fontSize = 14;
  const nodePadding = 6;
  const edgePadding = 2;
  const nodeSpacing = 40;
  const edgeSpacing = 10;
  const options: DiagramOptions = {
    svg: {
      defaultFontFamily: fontFamily,
      defaultFontSize: fontSize,
      measureText: (text, fontWeight, fontStyle) => {
        return {
          width: Math.max(
            ...text.map((text) => {
              return measureText(text, fontFamily, fontSize, fontWeight, fontStyle);
            }),
          ),
          height: text.length * fontSize,
        };
      },
    },
    zodmaid: {
      fill: colors["--color-sandstone-300"],
      fillAlternate: colors["--color-sandstone-100"],
      stroke: colors["--color-sandstone-900"],
      nodePadding,
      edgePadding,
      nodeSpacing,
      edgeSpacing,
    },
    dagre: {
      acyclicer: "greedy",
      ranker: "network-simplex",
      rankdir: "TB",
      // align: "UL",
      ranksep: nodeSpacing,
      nodesep: nodeSpacing,
      edgesep: edgeSpacing,
      marginx: nodeSpacing,
      marginy: nodeSpacing,
    },
  };

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const graph = collect(diagram, options);
      layout(graph);
      const svg = render(graph, options);
      ref.current.innerHTML = svg;
    }
  }, [ref]);

  return (
    <div className="p-4">
      <div ref={ref}></div>
    </div>
  );
};

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
