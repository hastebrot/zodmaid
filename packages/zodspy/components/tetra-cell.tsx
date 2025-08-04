import { classNames } from "../helpers/clsx";
import { BaseCell, type BaseCellProps } from "./base-cell";
import { JsonCellContext } from "./tetra/json-cell-context";
import { JsonCellRenderer } from "./tetra/json-cell-renderer";
import { TetraFocusGroup } from "./tetra/tetra-focus-group";

export type TetraCellProps<DataModel> = BaseCellProps<DataModel> & {
  gridColumnLimit?: number;
  gridRowOffset?: number;
};

export const TetraCell = <DataModel,>({ ...props }: TetraCellProps<DataModel>) => {
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
        <TetraFocusGroup
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
        </TetraFocusGroup>
      </BaseCell>
    </JsonCellContext>
  );
};
