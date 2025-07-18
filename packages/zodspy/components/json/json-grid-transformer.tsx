import { determineJsonType } from "./json-cell-type-button";

export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];
export type JsonValue = JsonObject | JsonArray | string | number | boolean | null;

export type JsonDataModel = {
  key: string;
  type: string;
  value: JsonValue;
  isFolded?: boolean;
};

export function transformToGridRows(json: JsonObject | JsonArray): JsonDataModel[] {
  const rows: JsonDataModel[] = [];
  for (const [key, value] of Object.entries(json)) {
    const type = determineJsonType(value);
    rows.push({ key, type, value, isFolded: true });
  }
  return rows;
}

export function transformToTableRows(json: JsonArray): JsonDataModel[][] {
  const rowsOfRows: JsonDataModel[][] = [];
  for (const [index, item] of Object.entries(json)) {
    const rows = [
      { key: "", type: "string", value: index },
      ...transformToGridRows(item as JsonObject),
    ];
    rowsOfRows.push(rows);
  }

  return rowsOfRows;
}
