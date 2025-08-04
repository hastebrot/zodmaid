import { createContext, useContext } from "react";
import { throwError } from "../../helpers/error";
import { type BaseCellProps } from "../base-cell";

export type TetraCellContextProps = {
  cellProps: BaseCellProps;
};

export const TetraCellContext = createContext<TetraCellContextProps | null>(null);

export const useTetraCellContext = () => {
  const value = useContext(TetraCellContext);
  return value ?? throwError("useTetraCellContext: value is empty");
};
