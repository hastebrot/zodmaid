import { z } from "zod/v4";

export type Node = z.infer<typeof Node>;

export const node = (node: Node) => Node.parse(node);

export const Node = z.object({
  id: z.string(),
  label: z.string(),
  shape: z.string().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  fill: z.string().optional(),
});
