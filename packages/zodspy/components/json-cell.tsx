import { classNames } from "../helpers/clsx";
import { BaseCell, type BaseCellProps } from "./base-cell";
import { JsonCellContext } from "./json/json-cell-context";
import { JsonCellGroup } from "./json/json-cell-group";

export const JsonCell = <DataModel,>(props: BaseCellProps<DataModel>) => {
  return (
    <JsonCellContext value={{ cellProps: props as BaseCellProps }}>
      <BaseCell {...props} className={classNames("relative grid cursor-auto select-none")}>
        <JsonCellGroup
          className={classNames(
            "text-[14px]/[28px] min-w-[28px] box-border",
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
