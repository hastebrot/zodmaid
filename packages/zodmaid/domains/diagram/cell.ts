import { z } from "zod/v4";
import { AttrType } from "./attr";
import { EdgeType } from "./edge";
import { LabelString, LabelType } from "./label";
import { NodeType } from "./node";
import { fixObject } from "./utils";

export type CellType = z.infer<typeof CellType>;
export const CellType = z.strictObject({
  type: z.literal("cell"),
  index: z.number().optional(),
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

type CellInput = z.input<typeof CellInput>;
const CellInput = z.lazy(() =>
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

export const cell = (...inputs: CellInput[]) => {
  const cellInputs = CellInput.array().parse(inputs);
  return CellType.parse({
    type: "cell",
    ...fixObject({
      labels: cellInputs.filter((input) => input.type === "label"),
      attrs: cellInputs.filter((input) => input.type === "attr"),
      nodes: cellInputs.filter((input) => input.type === "node"),
      edges: cellInputs.filter((input) => input.type === "edge"),
      cells: cellInputs.filter((input) => input.type === "cell"),
    }),
  });
};
