import { classNames } from "../helpers/clsx";
import type { GridColumn } from "./grid-column";
import { useGridContext } from "./grid-context";

export type BaseGridProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.RefObject<HTMLDivElement | null>;
  label?: string;
  readonly data: {
    type: string;
    rowCount: number;
    columnCount: number;
  };
};

export const BaseGrid = (props: BaseGridProps) => {
  const contextProps = useGridContext();
  const gridTemplateColumns = contextProps.toGridTemplateColumns
    ? contextProps.toGridTemplateColumns(contextProps.columns)
    : toGridTemplateColumns(contextProps.columns);

  return (
    <div
      ref={props.ref}
      className={classNames("grid grid-flow-col auto-cols-max", props.className)}
      style={{ gridTemplateColumns, ...props.style }}
      role="grid"
      aria-label={props.label ?? contextProps.label}
      aria-rowcount={props.data.rowCount}
      aria-colcount={props.data.columnCount}
    >
      {props.children}
    </div>
  );
};

export function toGridTemplateColumns(columns: GridColumn[]): string {
  return columns.map((column) => column.width).join(" ");
}
