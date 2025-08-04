import { describe, expect, test } from "vitest";
import {
  mapJsonToGridRows,
  mapJsonToTableRows,
} from "../../components/tetra/tetra-json-data-mapper";
import { purchaseOrder } from "../../examples/purchase-order";
import { throwError } from "../../helpers/error";

describe("json grid view", () => {
  describe("map json grid rows", () => {
    test("purchaseOrder", () => {
      // given:
      const json = purchaseOrder;
      // when:
      const rows = mapJsonToGridRows(json);
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
      const rows = mapJsonToGridRows(json);
      // then:
      expect(rows.length).toBe(5);
      expect(rows[0]).toMatchObject({ key: "0", type: "object" });
      expect(rows[1]).toMatchObject({ key: "1", type: "object" });
      expect(rows[2]).toMatchObject({ key: "2", type: "object" });
    });

    test("purchaseOrder.items[0]", () => {
      // given:
      const json = purchaseOrder.items[0] ?? throwError("item not found");
      // when:
      const rows = mapJsonToGridRows(json);
      // then:
      expect(rows.length).toBe(3);
      expect(rows[0]).toMatchObject({ key: "productName", type: "string", value: "Diamond heart" });
      expect(rows[1]).toMatchObject({ key: "quantity", type: "number", value: 1 });
      expect(rows[2]).toMatchObject({ key: "unitPrice", type: "number", value: 10.95 });
    });

    test("purchaseOrder.shipTo", () => {
      // given:
      const json = purchaseOrder.shipTo;
      // when:
      const rows = mapJsonToGridRows(json);
      // then:
      expect(rows.length).toBe(4);
      expect(rows[0]).toMatchObject({ key: "name", type: "string", value: "Helen Zoe" });
      expect(rows[1]).toMatchObject({ key: "street", type: "string", value: "47 Eden Street" });
      expect(rows[2]).toMatchObject({ key: "city", type: "string", value: "Cambridge" });
      expect(rows[3]).toMatchObject({ key: "postcode", type: "string", value: "126" });
    });
  });

  describe("transform grid rows, tabular", () => {
    test("purchaseOrder.items", () => {
      // given:
      const json = purchaseOrder.items;
      // when:
      const rows = mapJsonToTableRows(json);
      const row = rows[0] ?? throwError("row not found");
      // then:
      expect(rows.length).toBe(5);
      expect(row.length).toBe(4);
      expect(row[0]).toMatchObject({ key: "", type: "string", value: "0" });
      expect(row[1]).toMatchObject({ key: "productName", type: "string", value: "Diamond heart" });
      expect(row[2]).toMatchObject({ key: "quantity", type: "number", value: 1 });
      expect(row[3]).toMatchObject({ key: "unitPrice", type: "number", value: 10.95 });
    });
  });
});
