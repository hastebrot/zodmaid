import { classNames } from "../../helpers/clsx";
import { throwError } from "../../helpers/error";

export type TetraJsonTypeButtonProps = {
  type: JsonCellType | JsonExtCellType;
  symbol?: string;
};

export const TetraJsonTypeButton = (props: TetraJsonTypeButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(
        "m-[2px] w-fit h-fit",
        "outline-(--cell-border-base) outline-offset-0",
        "hover:bg-(--button-bg-base) hover:outline",
        "cursor-pointer",
      )}
      onClick={(event) => {
        event.stopPropagation();
      }}
      onDoubleClick={(event) => {
        event.stopPropagation();
      }}
      onFocus={(event) => {
        event.stopPropagation();
      }}
    >
      <div
        className={classNames(
          "m-[-2px] flex items-center justify-center",
          "text-[14px]/[24px] min-w-[24px]",
          "font-[700] font-mono-condensed tracking-[-0.025em]",
          "text-(--cell-fg-accent)",
          props.type === "comment" && "!text-(--color-green-700)",
        )}
      >
        {props.symbol ?? renderJsonType(props.type)}
      </div>
    </button>
  );
};

type JsonCellType = "array" | "object" | "string" | "number" | "boolean" | "null";
type JsonExtCellType = "comment" | "datetime" | "money" | "alias" | "formula";

export function renderJsonType(type: JsonCellType | JsonExtCellType) {
  const typeMap: Record<JsonCellType, string> = {
    array: "[]",
    object: "{}",
    string: "St",
    number: "Nu",
    boolean: "Bo",
    null: "Nil",
  };
  const typeSymbol =
    typeMap[type as JsonCellType] ??
    throwError(`renderJsonType: symbol for type not defined, '${type}'`);
  return typeSymbol;
}

export function determineJsonType(value: unknown): JsonCellType {
  if (Array.isArray(value)) return "array";
  if (typeof value === "object") return "object";
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";
  if (value === null) return "null";
  return "string";
}
