import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import { type BaseCellProps, BaseCell } from "../../../test/grid-view/components/base-cell";
import { type BaseGridProps, BaseGrid } from "../../../test/grid-view/components/base-grid";
import { type BaseRowProps, BaseRow } from "../../../test/grid-view/components/base-row";
import { type GridContextProps } from "../../../test/grid-view/components/grid-context";
import { UnstyledGridView } from "../../../test/grid-view/components/unstyled-grid-view";
import { classNames } from "../../helpers/clsx";
import { MusicLibrary, musicLibraryData } from "../../schemas/musicLibrary";

export const StyledGridViewPage = () => {
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
          "border-(--cell-border-base) border-l border-r border-b",
        )}
        style={{ ...gridStyles }}
      />
    );
  });
  const Row = observer((props: BaseRowProps) => {
    return (
      <BaseRow {...props} className="grid grid-cols-subgrid col-span-full">
        {props.children}
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
    return (
      <BaseCell
        {...props}
        className={classNames(
          "px-2 text-[14px]/[28px] min-w-[28px]",
          "border-(--cell-border-base) border-t not-first:border-l",
          "cursor-default",
          props.data.type === "cell" && [
            // wrap.
            "flex items-start justify-start",
            "text-(--cell-fg-base) bg-(--cell-bg-base)",
          ],
          props.data.type === "header-cell" && [
            // wrap.
            "flex items-start justify-start",
            "text-(--cell-fg-base) bg-(--cell-bg-header) font-[700]",
          ],
          props.data.type === "label-cell" && [
            // wrap.
            "flex items-start justify-center",
            "text-(--cell-fg-label) bg-(--cell-bg-label)",
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
        <span className="truncate max-w-[300px]">{renderCell()}</span>
      </BaseCell>
    );
  });

  const data = observable(MusicLibrary.parse(musicLibraryData));
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
      components: { Grid, Row, Cell },
    };
    return <UnstyledGridView.WithHeaderAndLabels context={context} />;
  });

  return (
    <div className="min-h-dvh bg-gray-100 text-gray-900 p-4">
      <TextFixture />
    </div>
  );
};
