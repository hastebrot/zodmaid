import { useEffect, useRef } from "react";
import { classNames } from "../helpers/clsx";
import { throwError } from "../helpers/error";
import { BaseGrid, type BaseGridProps } from "./base-grid";

export type TetraGridProps = BaseGridProps & {
  theme?: "light" | "dark";
};

export const TetraGrid = (props: TetraGridProps) => {
  const gridStyles = toGridStyles(props.theme ?? "dark");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // event.stopPropagation();
      // if (event.key === "ArrowUp") {
      //   console.log("keyup", event);
      // }
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
      "--cell-fg-accent": "var(--color-blue-700)",
      "--cell-fg-muted": "var(--color-gray-500)",
      "--cell-bg-base": "var(--color-gray-100)",
      "--cell-bg-header": "var(--color-gray-300)",
      "--cell-bg-label": "var(--color-indigo-100)",
      "--cell-border-base": "var(--color-gray-400)",
      "--cell-border-label": "var(--color-blue-300)",
      "--cell-outline-selected": "var(--color-blue-700)",
      "--button-bg-base": "var(--color-gray-300)",
      "--button-border-base": "var(--color-gray-500)",
      "--button-border-contrast": "var(--color-white)",
      "--button-outline-base": "var(--color-gray-300)",
      "--button-outline-hover": "var(--color-gray-700)",
    } as React.CSSProperties;
    return gridStyles;
  }
  if (theme === "dark") {
    const gridStyles = {
      "--cell-fg-base": "var(--color-zinc-300)",
      "--cell-fg-label": "var(--color-blue-500)",
      "--cell-fg-accent": "var(--color-sky-500)",
      "--cell-fg-muted": "var(--color-zinc-500)",
      "--cell-bg-base": "var(--color-zinc-900)",
      "--cell-bg-header": "var(--color-zinc-800)",
      "--cell-bg-label": "var(--color-indigo-100)",
      "--cell-border-base": "var(--color-zinc-700)",
      "--cell-border-label": "var(--color-blue-300)",
      "--cell-outline-selected": "var(--color-sky-500)",
      "--button-bg-base": "var(--color-zinc-800)",
      "--button-border-base": "var(--color-zinc-900)",
      "--button-border-contrast": "var(--color-zinc-700)",
      "--button-outline-base": "var(--color-zinc-800)",
      "--button-outline-hover": "var(--color-zinc-600)",
    } as React.CSSProperties;
    return gridStyles;
  }
  throwError("toGridStyles: theme not defined");
};
