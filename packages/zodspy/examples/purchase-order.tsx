import { PurchaseOrderSchema } from "./purchase-order-schema";

export const purchaseOrder = PurchaseOrderSchema.parse({
  orderDate: "2019-12-01",
  items: [
    {
      productName: "Diamond heart",
      quantity: 1,
      unitPrice: 10.95,
    },
    {
      productName: "Amber ring",
      quantity: 2,
      unitPrice: 20.95,
    },
    {
      productName: "Pearl necklace",
      quantity: 3,
      unitPrice: 30.95,
    },
    {
      productName: "Jade earring",
      quantity: 4,
      unitPrice: 40.95,
    },
    {
      productName: "Ruby bracelet",
      quantity: 5,
      unitPrice: 50.95,
    },
  ],
  shipTo: {
    name: "Helen Zoe",
    street: "47 Eden Street",
    city: "Cambridge",
    postcode: "126",
  },
});
