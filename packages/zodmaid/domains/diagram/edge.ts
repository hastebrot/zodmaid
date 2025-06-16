import { z } from "zod/v4";
import { AttrType } from "./attr";
import { LabelString, LabelType } from "./label";
import { NodeType } from "./node";
import { fixObject } from "./utils";

export type EdgeType = z.infer<typeof EdgeType>;
export const EdgeType = z.strictObject({
  type: z.literal("edge"),
  sourceId: z.string().optional(),
  targetId: z.string().optional(),
  get attrs() {
    return AttrType.array().optional();
  },
  get labels() {
    return LabelType.array().optional();
  },
  get nodes() {
    return NodeType.array().optional();
  },
});

type EdgeInput = z.input<typeof EdgeInput>;
const EdgeInput = z.union([
  // wrap.
  LabelString,
  LabelType,
  AttrType,
  NodeType,
]);

export const edge = (...inputs: EdgeInput[]) => {
  const edgeInputs = EdgeInput.array().parse(inputs);
  return EdgeType.parse({
    type: "edge",
    ...fixObject({
      attrs: edgeInputs.filter((input) => input.type === "attr"),
      labels: edgeInputs.filter((input) => input.type === "label"),
      nodes: edgeInputs.filter((input) => input.type === "node"),
    }),
  });
};
