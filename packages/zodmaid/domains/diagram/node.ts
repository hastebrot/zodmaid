import { z } from "zod/v4";
import { AttrType } from "./attr";
import { CellType } from "./cell";
import { EdgeType } from "./edge";
import { LabelString, LabelType } from "./label";
import { fixObject } from "./utils";

export type NodeType = z.infer<typeof NodeType>;
export const NodeType = z.strictObject({
  type: z.literal("node"),
  id: z.string().optional(),
  get labels() {
    return LabelType.array().optional();
  },
  get attrs() {
    return AttrType.array().optional();
  },
  get nodes() {
    return NodeType.array().optional();
  },
  get edges() {
    return EdgeType.array().optional();
  },
  get cells() {
    return CellType.array().optional();
  },
});

type NodeInput = z.input<typeof NodeInput>;
const NodeInput = z.lazy(() =>
  z.union([
    // wrap.
    LabelString,
    LabelType,
    AttrType,
    NodeType,
    EdgeType,
    CellType,
  ])
);

export const node = (...inputs: NodeInput[]) => {
  const nodeInputs = NodeInput.array().parse(inputs);
  return NodeType.parse({
    type: "node",
    ...fixObject({
      labels: nodeInputs.filter((input) => input.type === "label"),
      attrs: nodeInputs.filter((input) => input.type === "attr"),
      nodes: nodeInputs.filter((input) => input.type === "node"),
      edges: nodeInputs.filter((input) => input.type === "edge"),
      cells: nodeInputs.filter((input) => input.type === "cell"),
    }),
  });
};
