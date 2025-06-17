import { arrow, edge, id, node, type DiagramType } from "zodmaid";

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

  return <div className="p-4">{JSON.stringify(diagram)}</div>;
};
