import { throwError } from "../../helpers/error";
import { determineJsonType } from "./json-cell-type-button";

type JsonObject = { [key: string]: Json };
type JsonArray = Json[];
type Json = JsonObject | JsonArray | string | number | boolean | null;

export type GridRow = { key: string; type: string; value: Json };

export function transformToGridRows(json: JsonObject): GridRow[] {
  const keys = Object.keys(json);
  const rows: GridRow[] = [];
  for (const key of keys) {
    const value = json[key] ?? throwError("key not found");
    const type = determineJsonType(value);
    rows.push({ key, type, value });
  }
  return rows;
}
