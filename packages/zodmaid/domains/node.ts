import { z } from "zod/v4";
import { Attr } from "./attr";
import { Cell } from "./cell";
import { Edge } from "./edge";
import { label, Label } from "./label";
import { Port } from "./port";

type Arg = Attr | Node | Edge | Cell | Port | Label;

export const node = (...args: (string | Arg)[]) => {
  const _args = args.map((a): Arg => (typeof a === "string" ? label(a) : a));
  return Node.parse({
    type: "node",
    id: _args
      .map((a) => {
        if (a.type === "label" && a.text.length > 0) {
          return a.text[0];
        }
        if (a.type === "attr" && a.key === "id") {
          return a.value;
        }
      })
      .find(Boolean),
    attrs: _args.filter((a) => a.type === "attr"),
    elems: _args.filter((a) => a.type !== "attr"),
  });
};

export type Node = z.infer<typeof Node>;

export const Node = z.strictObject({
  type: z.literal("node"),
  id: z.string().optional(),
  get attrs() {
    return z.union([Attr]).array();
  },
  get elems() {
    return z.union([Node, Edge, Cell, Port, Label]).array();
  },
});
