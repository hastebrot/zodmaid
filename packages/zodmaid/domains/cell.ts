import { z } from "zod/v4";
import { Attr } from "./attr";
import { Edge } from "./edge";
import { Label } from "./label";
import { Node } from "./node";
import { Port } from "./port";

type Arg = Attr | Node | Edge | Cell | Port | Label;

export const cell = (...args: Arg[]) => {
  return Cell.parse({
    type: "cell",
    attrs: args.filter((a) => a.type === "attr"),
    elems: args.filter((a) => a.type !== "attr"),
  });
};

export type Cell = z.infer<typeof Cell>;

export const Cell = z.strictObject({
  type: z.literal("cell"),
  index: z.number().optional(),
  get attrs() {
    return z.union([Attr]).array();
  },
  get elems() {
    return z.union([Node, Edge, Cell, Port, Label]).array();
  },
});
