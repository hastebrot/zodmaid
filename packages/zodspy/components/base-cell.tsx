import { classNames } from "../helpers/clsx";
import { type GridColumn } from "./grid-column";

export type BaseCellProps<DataModel = unknown> = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  readonly data: {
    type: string;
    rowIndex: number;
    columnIndex: number;
    row: DataModel | null;
    column: GridColumn<DataModel> | null;
  };
};

export const BaseCell = <DataModel,>(props: BaseCellProps<DataModel>) => {
  return (
    <div
      className={classNames(props.className)}
      style={{ gridColumn: props.data.columnIndex + 1, ...props.style }}
      role="gridcell"
      aria-label={props.label}
      aria-rowindex={props.data.rowIndex + 1}
      aria-colindex={props.data.columnIndex + 1}
    >
      {props.children}
    </div>
  );
};
