import { classNames } from "../../../src/helpers/clsx";
import { useGridContext } from "./use-grid-context";

export type BaseGridProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  data: {
    type: string;
    rowCount: number;
    columnCount: number;
  };
};

export const BaseGrid = (props: BaseGridProps) => {
  const contextProps = useGridContext();
  const gridTemplateColumns = contextProps.columns.map((column) => column.width).join(" ");

  return (
    <div
      className={classNames("grid", props.className)}
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
