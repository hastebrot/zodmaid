import { z } from "zod/v4";
import { AttrType } from "./attr";
import { CellType } from "./cell";
import { EdgeType } from "./edge";
import { LabelString, LabelType } from "./label";

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
  const _inputs = NodeInput.array().parse(inputs);
  return NodeType.parse({
    type: "node",
    ...fixObject({
      labels: _inputs.filter((input) => input.type === "label"),
      attrs: _inputs.filter((input) => input.type === "attr"),
      nodes: _inputs.filter((input) => input.type === "node"),
      edges: _inputs.filter((input) => input.type === "edge"),
      cells: _inputs.filter((input) => input.type === "cell"),
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
