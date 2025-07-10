import { createContext, useContext } from "react";
import { throwError } from "../helpers/error";
import { type GridColumn } from "./grid-column";
import { gridElements, type GridElements } from "./grid-elements";

export type GridContextProps<DataModel = unknown> = {
  label?: string;
  rows: DataModel[];
  columns: GridColumn<DataModel>[];
  elements: GridElements<DataModel>;
  toGridTemplateColumns?: (columns: GridColumn<DataModel>[]) => string;
};

export const GridContext = createContext<GridContextProps | null>(null);

export const defineGridContext = <DataModel,>(context: GridContextProps<DataModel>) => {
  return {
    ...context,
    elements: {
      ...gridElements,
      ...context.elements,
    },
  };
};

export const useGridContext = () => {
  const value = useContext(GridContext);
  return value ?? throwError("GridContext: value is empty");
};
