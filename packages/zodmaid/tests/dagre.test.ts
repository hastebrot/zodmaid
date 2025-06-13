import { expect, test } from "bun:test";
import { graphlib, layout } from "dagre";

test("dagre", () => {
  // given:
  const g = new graphlib.Graph();
  g.setGraph({});
  g.setDefaultEdgeLabel(() => ({}));
  g.setNode("kspacey", { label: "Kevin Spacey", width: 144, height: 100 });
  g.setNode("swilliams", { label: "Saul Williams", width: 160, height: 100 });
  g.setNode("bpitt", { label: "Brad Pitt", width: 108, height: 100 });
  g.setNode("hford", { label: "Harrison Ford", width: 168, height: 100 });
  g.setNode("lwilson", { label: "Luke Wilson", width: 144, height: 100 });
  g.setNode("kbacon", { label: "Kevin Bacon", width: 121, height: 100 });
  g.setEdge("kspacey", "swilliams");
  g.setEdge("swilliams", "kbacon");
  g.setEdge("bpitt", "kbacon");
  g.setEdge("hford", "lwilson");
  g.setEdge("lwilson", "kbacon");

  // when:
  layout(g, {
    rankdir: "LR",
    ranker: "network-simplex",
    acyclicer: "greedy",
  });

  // then:
  expect(g.nodes().map((n) => g.node(n))[0]).toMatchObject({
    height: 100,
    label: "Kevin Spacey",
    width: 144,
    x: 80,
    y: 50,
  });
  expect(g.edges().map((e) => g.edge(e))[0]).toMatchObject({
    points: [
      { x: 80, y: 100 },
      { x: 80, y: 125 },
      { x: 80, y: 150 },
    ],
  });
});
