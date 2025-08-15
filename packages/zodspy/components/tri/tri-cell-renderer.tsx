import { throwError } from "../../helpers/error";
import { useTriCellContext } from "./tri-cell-context";

export const TriCellRenderer = (): React.ReactNode => {
  const context = useTriCellContext();
  const cellProps = context.cellProps;
  const cellRenderer =
    cellProps.data.column?.cellRenderer ?? throwError("TriCellRenderer: cellRenderer not defined");
  return cellRenderer(cellProps);
};
