import { z } from "zod/v4";

export const label = (...text: string[]) => {
  return Label.parse({
    type: "label",
    text,
  });
};

export type Label = z.infer<typeof Label>;

export const Label = z.strictObject({
  type: z.literal("label"),
  text: z.string().array(),
});
