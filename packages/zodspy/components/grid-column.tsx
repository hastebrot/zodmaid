import type { BaseCellProps } from "./base-cell";

export type GridColumn<DataModel = unknown> = {
  label: string | keyof DataModel;
  width: string | "min-content" | "max-content" | "auto";
  cellRenderer?: (props: BaseCellProps<DataModel>) => React.ReactNode;
};
