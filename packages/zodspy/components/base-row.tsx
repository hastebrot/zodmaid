import { classNames } from "../helpers/clsx";

export type BaseRowProps<DataModel = unknown> = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  data: {
    type: string;
    rowIndex: number;
    row: DataModel;
  };
};

export const BaseRow = (props: BaseRowProps) => {
  return (
    <div
      className={classNames("contents", props.className)}
      style={props.style}
      role="row"
      aria-label={props.label}
      aria-rowindex={props.data.rowIndex + 1}
    >
      {props.children}
    </div>
  );
};
