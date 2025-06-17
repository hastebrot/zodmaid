import { test } from "bun:test";
import { resolve } from "node:path";
import { arrow, edge, id, node } from "../domains/diagramDomain";
import {
  layout,
  populate,
  render,
  type DaGraph,
  type DiagramOptions,
} from "../engines/dagreEngine";

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
