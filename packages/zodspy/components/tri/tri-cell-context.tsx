import { createContext, useContext } from "react";
import { throwError } from "../../helpers/error";
import { type BaseCellProps } from "../base-cell";

export type TriCellContextProps = {
  cellProps: BaseCellProps;
};

export const TriCellContext = createContext<TriCellContextProps | null>(null);

export const useTriCellContext = () => {
  const value = useContext(TriCellContext);
  return value ?? throwError("useTriCellContext: value is empty");
};
