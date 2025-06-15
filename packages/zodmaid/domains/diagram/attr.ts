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

type KeyVal = [string, string];
type KeyVals =
  | [...KeyVal]
  | [...KeyVal, ...KeyVal]
  | [...KeyVal, ...KeyVal, ...KeyVal]
  | [...KeyVal, ...KeyVal, ...KeyVal, ...KeyVal]
  | [...KeyVal, ...KeyVal, ...KeyVal, ...KeyVal, ...KeyVal]
  | [...KeyVal, ...KeyVal, ...KeyVal, ...KeyVal, ...KeyVal, ...KeyVal]
  | [...KeyVal, ...KeyVal, ...KeyVal, ...KeyVal, ...KeyVal, ...KeyVal, ...KeyVal]
  | [...KeyVal, ...KeyVal, ...KeyVal, ...KeyVal, ...KeyVal, ...KeyVal, ...KeyVal, ...KeyVal];
type Attrs = { [key: string]: string };

export const attrs = (...text: KeyVals) => {};
attrs("k", "v");
attrs("k", "v", "k", "v");
