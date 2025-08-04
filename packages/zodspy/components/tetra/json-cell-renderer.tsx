import { throwError } from "../../helpers/error";
import { useJsonCellContext } from "./json-cell-context";

export const JsonCellRenderer = (): React.ReactNode => {
  const context = useJsonCellContext();
  const cellProps = context.cellProps;
  const cellRenderer =
    cellProps.data.column?.cellRenderer ?? throwError("JsonCellRenderer: cellRenderer not defined");
  return cellRenderer(cellProps);
};
