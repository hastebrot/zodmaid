import { useEffect, useRef } from "react";
import { classNames } from "../helpers/clsx";
import { throwError } from "../helpers/error";
import { BaseGrid, type BaseGridProps } from "./base-grid";

export type JsonGridProps = BaseGridProps & {
  theme?: "light" | "dark";
};

export const JsonGrid = (props: JsonGridProps) => {
  const gridStyles = toGridStyles(props.theme ?? "light");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      event.stopPropagation();
      if (event.key === "ArrowUp") {
        console.log("keyup", event);
      }
    }
    if (ref.current) {
      ref.current.addEventListener("keyup", handleKeyDown);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("keyup", handleKeyDown);
      }
    };
  }, [ref.current]);
  return (
    <BaseGrid
      ref={ref}
      {...props}
      className={classNames(
        "grid grid-flow-col auto-cols-max",
        "border-(--cell-border-base) border-l border-r border-b",
      )}
      style={gridStyles}
    />
  );
};

const toGridStyles = (theme: "light" | "dark") => {
  if (theme === "light") {
    const gridStyles = {
      "--cell-fg-base": "var(--color-gray-900)",
      "--cell-fg-label": "var(--color-indigo-800)",
      "--cell-bg-base": "var(--color-gray-100)",
      "--cell-bg-header": "var(--color-gray-300)",
      "--cell-bg-label": "var(--color-indigo-100)",
      "--cell-border-base": "var(--color-gray-400)",
      "--cell-border-label": "var(--color-blue-300)",
      "--cell-outline-selected": "var(--color-blue-700)",
    } as React.CSSProperties;
    return gridStyles;
  }
  if (theme === "dark") {
    const gridStyles = {} as React.CSSProperties;
    return gridStyles;
  }
  throwError("toGridStyles: theme not defined");
};
