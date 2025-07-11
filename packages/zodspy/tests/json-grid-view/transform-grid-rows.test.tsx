import { describe, expect, test } from "vitest";
import { transformToGridRows } from "../../components/json/json-grid-transformer";
import { purchaseOrder } from "../../examples/purchase-order";
import { PurchaseOrderSchema } from "../../examples/purchase-order-schema";

describe("json grid view", () => {
  describe("transform grid rows", () => {
    test("purchaseOrder", () => {
      // given:
      const json = PurchaseOrderSchema.parse(purchaseOrder);
      // when:
      const rows = transformToGridRows(json);
      // then:
      expect(rows.length).toBe(3);
      expect(rows[0]).toMatchObject({ key: "orderDate", type: "string", value: "2019-12-01" });
      expect(rows[1]).toMatchObject({ key: "items", type: "array" });
      expect(rows[2]).toMatchObject({ key: "shipTo", type: "object" });
    });
  });
});
