import { z } from "zod/v4";

export const attr = (key: string, value: string) => {
  return Attr.parse({ type: "attr", key, value });
};

export type Attr = z.infer<typeof Attr>;

export const Attr = z.strictObject({
  type: z.literal("attr"),
  key: z.string(),
  value: z.string().optional(),
});
