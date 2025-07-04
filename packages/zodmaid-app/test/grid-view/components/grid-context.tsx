import { createContext } from "react";
import { type GridColumn } from "./grid-column";
import { type GridComponents } from "./grid-components";

export type GridContextProps<DataModel = unknown> = {
  label?: string;
  rows: DataModel[];
  columns: GridColumn<DataModel>[];
  components: GridComponents<DataModel>;
  toGridTemplateColumns?: (columns: GridColumn<DataModel>[]) => string;
};

export const GridContext = createContext<GridContextProps | null>(null);
