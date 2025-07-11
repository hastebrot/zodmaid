import { classNames } from "../helpers/clsx";
import { BaseCell, type BaseCellProps } from "./base-cell";
import { JsonCellContext } from "./json/json-cell-context";
import { JsonCellGroup } from "./json/json-cell-group";
import { JsonCellRenderer } from "./json/json-cell-renderer";

export type JsonCellProps<DataModel> = BaseCellProps<DataModel> & {
  gridColumnLimit?: number;
  gridRowOffset?: number;
};

export const JsonCell = <DataModel,>({ ...props }: JsonCellProps<DataModel>) => {
  props.children = props.children ?? <JsonCellRenderer />;
  props.style = {
    ...props.style,
    // grid column limit:
    gridColumn: props.data.columnIndex + 1,
    gridColumnEnd: props.gridColumnLimit,
    // grid row offset:
    gridRow: 1,
    marginTop: props.gridRowOffset !== undefined ? `${props.gridRowOffset * 24}px` : undefined,
  };

  return (
    <JsonCellContext value={{ cellProps: props as BaseCellProps }}>
      <BaseCell
        {...props}
        className={classNames("relative grid cursor-auto select-none text-nowrap")}
        style={props.style}
      >
        <JsonCellGroup
          className={classNames(
            "text-[14px]/[24px] min-w-[24px] box-border",
            "border-(--cell-border-base) border-t",
            props.data.columnIndex !== 0 && "border-l",
          )}
          handlers={{
            onFocus(event) {
              event.stopPropagation();
            },
            onBlur(event) {
              event.stopPropagation();
            },
            onClick(event) {
              event.stopPropagation();
            },
            onDoubleClick(event) {
              event.stopPropagation();
            },
          }}
        >
          {props.children}
        </JsonCellGroup>
      </BaseCell>
    </JsonCellContext>
  );
};
