import { z } from "zod/v4";

export type LabelType = z.infer<typeof LabelType>;
export const LabelType = z.strictObject({
  type: z.literal("label"),
  text: z.string().array(),
});

export type LabelString = z.infer<typeof LabelString>;
export const LabelString = z
  .string()
  .or(z.string().array())
  .transform((input) => {
    if (typeof input === "string") {
      return label(input);
    }
    return label(...input);
  });

export const label = (...text: string[]) => {
  return LabelType.parse({
    type: "label",
    text,
  });
};
