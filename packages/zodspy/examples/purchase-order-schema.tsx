import { z } from "zod/v4";

export type PurchaseOrderAddressSchema = z.infer<typeof PurchaseOrderAddressSchema>;
export const PurchaseOrderAddressSchema = z.strictObject({
  name: z.string(),
  street: z.string(),
  city: z.string(),
  postcode: z.string(),
});

export type PurchaseOrderSchema = z.infer<typeof PurchaseOrderSchema>;
export const PurchaseOrderSchema = z.strictObject({
  orderDate: z.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
  items: z.array(
    z.strictObject({
      productName: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
      shipDate: z
        .string()
        .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
        .optional(),
    }),
  ),
  shipTo: PurchaseOrderAddressSchema,
  billTo: PurchaseOrderAddressSchema.optional(),
});
