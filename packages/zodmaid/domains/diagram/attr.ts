import { z } from "zod/v4";

export type AttrType = z.infer<typeof AttrType>;
export const AttrType = z.strictObject({
  type: z.literal("attr"),
  key: z.string(),
  value: z.string(),
});

export const attr = (key: string, value: string) => {
  return AttrType.parse({ type: "attr", key, value });
};
