import { determineJsonType } from "./json-cell-type-button";

export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];
export type JsonValue = JsonObject | JsonArray | string | number | boolean | null;

export type GridRow = { key: string; type: string; value: JsonValue };

export function transformToGridRows(json: JsonObject | JsonArray): GridRow[] {
  const rows: GridRow[] = [];
  for (const [key, value] of Object.entries(json)) {
    const type = determineJsonType(value);
    rows.push({ key, type, value });
  }
  return rows;
}
