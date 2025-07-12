import { useEffect, useRef } from "react";
import { classNames } from "../helpers/clsx";
import { BaseGrid, type BaseGridProps } from "./base-grid";

export const JsonGrid = (props: BaseGridProps) => {
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
