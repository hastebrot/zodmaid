import { describe, expect, test } from "vitest";
import { transformToGridRows } from "../../components/json/json-grid-transformer";
import { purchaseOrder } from "../../examples/purchase-order";

describe("json grid view", () => {
  describe("transform grid rows", () => {
    test("purchaseOrder", () => {
      // given:
      const json = purchaseOrder;
      // when:
      const rows = transformToGridRows(json);
      // then:
      expect(rows.length).toBe(3);
      expect(rows[0]).toMatchObject({ key: "orderDate", type: "string", value: "2019-12-01" });
      expect(rows[1]).toMatchObject({ key: "items", type: "array" });
      expect(rows[2]).toMatchObject({ key: "shipTo", type: "object" });
    });

    test("purchaseOrder.items", () => {
      // given:
      const json = purchaseOrder.items;
      // when:
      const rows = transformToGridRows(json);
      // then:
      expect(rows.length).toBe(5);
      expect(rows[0]).toMatchObject({ key: "0", type: "object" });
      expect(rows[1]).toMatchObject({ key: "1", type: "object" });
      expect(rows[2]).toMatchObject({ key: "2", type: "object" });
    });

    test("purchaseOrder.shipTo", () => {
      // given:
      const json = purchaseOrder.shipTo;
      // when:
      const rows = transformToGridRows(json);
      // then:
      expect(rows.length).toBe(4);
      expect(rows[0]).toMatchObject({ key: "name", type: "string", value: "Helen Zoe" });
      expect(rows[1]).toMatchObject({ key: "street", type: "string", value: "47 Eden Street" });
      expect(rows[2]).toMatchObject({ key: "city", type: "string", value: "Cambridge" });
      expect(rows[3]).toMatchObject({ key: "postcode", type: "string", value: "126" });
    });
  });
});
