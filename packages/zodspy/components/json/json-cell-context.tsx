import { createContext, useContext } from "react";
import { throwError } from "../../helpers/error";
import { type BaseCellProps } from "../base-cell";

export type JsonCellContextProps = {
  cellProps: BaseCellProps;
};

export const JsonCellContext = createContext<JsonCellContextProps | null>(null);

export const useJsonCellContext = () => {
  const value = useContext(JsonCellContext);
  return value ?? throwError("JsonCellContext: value is empty");
};
