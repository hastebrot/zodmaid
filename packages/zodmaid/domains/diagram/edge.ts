import { z } from "zod/v4";
import { AttrType } from "./attr";
import { LabelString, LabelType } from "./label";
import { NodeType } from "./node";

export type EdgeType = z.infer<typeof EdgeType>;
export const EdgeType = z.strictObject({
  type: z.literal("edge"),
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
  const _inputs = EdgeInput.array().parse(inputs);
  return EdgeType.parse({
    type: "edge",
    ...fixObject({
      attrs: _inputs.filter((input) => input.type === "attr"),
      labels: _inputs.filter((input) => input.type === "label"),
      nodes: _inputs.filter((input) => input.type === "node"),
    }),
  });
};

const fixObject = (value: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(value).filter(([_, value]) => {
      if (Array.isArray(value) && value.length === 0) {
        return false;
      }
      return true;
    })
  );
};
