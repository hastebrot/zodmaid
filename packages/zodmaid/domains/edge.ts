import { z } from "zod/v4";
import { Attr } from "./attr";
import { label, Label } from "./label";

type Arg = Label | Attr;

export const edge = (...args: (string | Arg)[]) => {
  const _args = args.map((a): Arg => (typeof a === "string" ? label(a) : a));
  return Edge.parse({
    type: "edge",
    attrs: _args.filter((a) => a.type === "attr"),
    elems: _args.filter((a) => a.type !== "attr"),
  });
};

export type Edge = z.infer<typeof Edge>;

export const Edge = z.strictObject({
  type: z.literal("edge"),
  attrs: z.union([Attr]).array(),
  elems: z.union([Label]).array(),
});
