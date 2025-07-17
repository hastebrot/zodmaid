import { createContext, useContext } from "react";
import { throwError } from "../../helpers/error";
import { type BaseCellProps } from "../base-cell";

export type TanaCellContextProps = {
  cellProps: BaseCellProps;
};

export const TanaCellContext = createContext<TanaCellContextProps | null>(null);

export const useTanaCellContext = () => {
  const value = useContext(TanaCellContext);
  return value ?? throwError("useTanaCellContext: value is empty");
};
