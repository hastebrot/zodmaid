import { type JSX } from "react";
import { BaseCell, type BaseCellProps } from "./base-cell";
import { BaseGrid, type BaseGridProps } from "./base-grid";
import { BaseRow, type BaseRowProps } from "./base-row";

export type GridElements<DataModel> = {
  Grid: (props: BaseGridProps) => JSX.Element;
  Row: (props: BaseRowProps<DataModel>) => JSX.Element;
  Cell: (props: BaseCellProps<DataModel>) => JSX.Element;
};

export const gridElements = {
  Grid: (props: BaseGridProps) => <BaseGrid {...props} />,
  Row: (props: BaseRowProps) => <BaseRow {...props} />,
  Cell: (props: BaseCellProps) => <BaseCell {...props} />,
};
