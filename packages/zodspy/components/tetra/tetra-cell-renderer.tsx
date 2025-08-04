import { throwError } from "../../helpers/error";
import { useTetraCellContext } from "./tetra-cell-context";

export const TetraCellRenderer = (): React.ReactNode => {
  const context = useTetraCellContext();
  const cellProps = context.cellProps;
  const cellRenderer =
    cellProps.data.column?.cellRenderer ??
    throwError("TetraCellRenderer: cellRenderer not defined");
  return cellRenderer(cellProps);
};
