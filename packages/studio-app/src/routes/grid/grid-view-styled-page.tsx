import { useFocus } from "@react-aria/interactions";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import { Children, useState } from "react";
import {
  BaseCell,
  BaseGrid,
  BaseGridView,
  BaseRow,
  type BaseCellProps,
  type BaseGridProps,
  type BaseRowProps,
  type GridContextProps,
} from "zodspy";
import { musicLibrary } from "zodspy/examples/music-library";
import { MusicLibrarySchema } from "zodspy/examples/music-library-schema";
import { classNames } from "../../helpers/clsx";

export const GridViewStyledPage = () => {
  const gridStyles = {
    "--cell-fg-base": "var(--color-zinc-900)",
    "--cell-fg-label": "var(--color-indigo-800)",
    "--cell-bg-base": "var(--color-zinc-100)",
    "--cell-bg-header": "var(--color-zinc-300)",
    "--cell-bg-label": "var(--color-indigo-100)",
    "--cell-border-base": "var(--color-zinc-400)",
    "--cell-border-label": "var(--color-indigo-300)",
    "--cell-outline-selected": "var(--color-indigo-500)",
  } as React.CSSProperties;
  const Grid = observer((props: BaseGridProps) => {
    return (
      <BaseGrid
        {...props}
        className={classNames(
          // wrap.
          "w-fit font-sans",
          "grid grid-flow-col auto-cols-max",
          "border-(--cell-border-base) border-l border-r border-b",
        )}
        style={{ ...gridStyles }}
      />
    );
  });
  const Row = observer((props: BaseRowProps) => {
    const children = Children.toArray(props.children);
    // if (props.data.rowIndex >= 2) {
    //   return (
    //     <BaseRow {...props} className="grid grid-cols-subgrid col-span-full grid-rows-2">
    //       {children}
    //     </BaseRow>
    //   );
    // }
    return (
      <BaseRow {...props} className="contents">
        {children}
      </BaseRow>
    );
  });
  const Cell = observer((props: BaseCellProps) => {
    function toColumnLabel(index: number) {
      return index < 0 ? "" : String.fromCharCode("A".charCodeAt(0) + index);
    }
    function toRowLabel(index: number) {
      return index < 0 ? "" : String(index + 1);
    }
    const renderCell = () => {
      if (props.data.type === "header-cell") {
        return props.data.column?.label;
      }
      if (props.data.type === "label-cell") {
        if (props.data.column !== null) {
          return toColumnLabel(props.data.columnIndex - 1);
        }
        return toRowLabel(props.data.rowIndex - 1);
      }
      const item = props.data.row as DataModel;
      const key = props.data.column?.label as keyof DataModel;
      const value = item[key];
      const isJsonArray = Array.isArray(value);
      const isJsonObject = typeof value === "object";
      return isJsonArray || isJsonObject ? JSON.stringify(value) : value;
    };
    const [isSelected, setSelected] = useState(false);
    const { focusProps } = useFocus({
      onFocus() {
        setSelected(true);
      },
      onBlur() {
        setSelected(false);
      },
    });
    const cellStyles = {
      // gridColumn: props.data.columnIndex === 0 ? "1 / -1" : props.data.columnIndex + 1,
      // gridRow: props.data.columnIndex === 0 ? "1 / -1" : 2,
    };
    return (
      <BaseCell
        {...props}
        style={props.data.rowIndex >= 2 ? cellStyles : {}}
        className={classNames(
          "relative grid cursor-pointer select-none",
          "border-(--cell-border-base) border-t not-first:border-l",
          props.data.type === "label-cell" && [
            props.data.column !== null && [
              "border-l-(--cell-border-label)",
              "border-b border-b-(--cell-border-base)",
            ],
            props.data.column === null &&
              props.data.rowIndex > 0 && [
                "border-t-(--cell-border-label)",
                "border-r border-r-(--cell-border-base)",
              ],
          ],
        )}
      >
        {isSelected && (
          <div
            className={classNames(
              "absolute inset-0 z-10 pointer-events-none",
              "outline-2 outline-offset-[-1px] outline-(--cell-outline-selected)",
            )}
          ></div>
        )}
        <div
          {...focusProps}
          tabIndex={-1}
          className={classNames(
            "px-2 text-[14px]/[28px] min-w-[28px]",
            props.data.type === "cell" && [
              "flex items-start justify-start",
              "font-[400] text-(--cell-fg-base) bg-(--cell-bg-base)",
            ],
            props.data.type === "header-cell" && [
              "flex items-start justify-start",
              "font-[700] text-(--cell-fg-base) bg-(--cell-bg-header)",
            ],
            props.data.type === "label-cell" && [
              "flex items-start justify-center",
              "font-[400] text-(--cell-fg-label) bg-(--cell-bg-label)",
            ],
          )}
        >
          {/* <div className="w-[20px] h-full bg-[magenta]"></div> */}
          <span className="truncate max-w-[300px]">{renderCell()}</span>
        </div>
      </BaseCell>
    );
  });

  const data = observable(MusicLibrarySchema.parse(musicLibrary));
  type DataModel = (typeof data)["Artists"][0]["Albums"][0];
  const TextFixture = observer(() => {
    const context: GridContextProps = {
      label: "grid",
      rows: data.Artists[0].Albums,
      columns: [
        { label: "Name", width: "max-content" },
        { label: "ReleaseDate", width: "max-content" },
        { label: "Label", width: "max-content" },
        { label: "Genre", width: "max-content" },
        { label: "Tracks", width: "1fr" },
      ],
      elements: { Grid, Row, Cell },
    };
    return <BaseGridView.WithHeaderAndLabels context={context} />;
  });

  return (
    <div className="min-h-dvh bg-gray-100 text-gray-900 p-4">
      <TextFixture />
    </div>
  );
};
