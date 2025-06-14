import { z } from "zod/v4";

export const port = (port: Port) => Port.parse(port);

export type Port = z.infer<typeof Port>;

export const Port = z.strictObject({
  type: z.literal("port"),
});
