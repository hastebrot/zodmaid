import { test } from "bun:test";
import { attr } from "./attr";
import { edge } from "./edge";
import { label } from "./label";
import { node } from "./node";

test("domain", () => {
  {
    const d = node(attr("node.type", "class"), label("Pirate"));
    console.log(d);
  }
  {
    const d = node(
      node(label("Pirate")),
      node(label("Swashbuckler")),
      edge(label("Pirate"), label("Swashbuckler"), attr("edge.arrow", "->"), label("fights"))
    );
    console.log(d);
  }
});
