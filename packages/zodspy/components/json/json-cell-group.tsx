import { useState } from "react";
import { classNames } from "../../helpers/clsx";

export type JsonCellGroupProps = {
  children?: React.ReactNode;
  className?: string;
  isReadonly?: boolean;
  isDisabled?: boolean;
  handlers?: {
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
    onDoubleClick?: (event: React.MouseEvent) => void;
  };
};

export const JsonCellGroup = (props: JsonCellGroupProps) => {
  const [isSelected, setSelected] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const handleFocus = (event: React.FocusEvent) => {
    props.handlers?.onFocus?.(event);
    setSelected(true);
  };
  const handleBlur = (event: React.FocusEvent) => {
    props.handlers?.onBlur?.(event);
    setSelected(false);
    setEditable(false);
  };
  const handleClick = (event: React.MouseEvent) => {
    props.handlers?.onClick?.(event);
    setSelected(true);
  };
  const handleDoubleClick = (event: React.MouseEvent) => {
    props.handlers?.onDoubleClick?.(event);
    setSelected(true);
    setEditable(true);
  };
  return (
    <div
      role="group"
      tabIndex={0}
      className={props.className}
      data-selected={isSelected}
      data-editable={isEditable}
      aria-selected={isSelected ? "true" : undefined}
      aria-readonly={props.isReadonly ? "true" : undefined}
      aria-disabled={props.isDisabled ? "true" : undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {isSelected && (
        <div
          className={classNames(
            "absolute inset-0 z-10 pointer-events-none",
            "outline-2 outline-offset-[-1px] outline-(--cell-outline-selected)",
          )}
        ></div>
      )}
      {props.children}
    </div>
  );
};
