import { useContext } from "react";
import { GridContext } from "./grid-context";

export const useGridContext = () => {
  const value = useContext(GridContext);
  if (value === null) {
    throw new Error("GridContext value is empty");
  }
  return value;
};
