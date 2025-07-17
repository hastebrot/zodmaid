import { throwError } from "../../helpers/error";
import { useTanaCellContext } from "./tana-cell-context";

export const TanaCellRenderer = (): React.ReactNode => {
  const context = useTanaCellContext();
  const cellProps = context.cellProps;
  const cellRenderer =
    cellProps.data.column?.cellRenderer ?? throwError("TanaCellRenderer: cellRenderer not defined");
  return cellRenderer(cellProps);
};
