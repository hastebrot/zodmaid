import React, { createContext, useContext, useState } from "react";
import { classNames } from "../../helpers/clsx";

export type GridViewProps<DataModel> = {
  readonly data: DataProps<DataModel>;
  readonly columns: ColumnProps<DataModel>[];
  readonly columnsSpec?: string;
  readonly showColumnLabels?: boolean;
  readonly showRowLabels?: boolean;
  readonly rowCount?: number;
  readonly columnCount?: number;
  readonly rowOffset?: number;
  readonly columnOffset?: number;
  readonly fullWidth?: boolean;
};

export type DataProps<DataModel> = {
  readonly rows: DataModel[];
};

export type ColumnProps<DataModel> = {
  readonly key: string;
  readonly label: string;

  readonly width?: number | string;
  readonly minWidth?: number | string;
  readonly maxWidth?: number | string;

  readonly cellRenderer?: (props: CellRendererProps<DataModel>) => React.ReactNode;
  readonly headerCellRenderer?: (props: HeaderCellRendererProps) => React.ReactNode;
};

type CellRendererProps<DataModel> = {
  columnIndex: number;
  rowIndex: number;
  row: DataModel;
};

type HeaderCellRendererProps = {
  columnIndex: number;
  label: string;
};

export const useGridView = <DataModel,>(
  props: GridViewProps<DataModel>,
): GridViewProps<DataModel> => {
  return {
    data: props.data,
    columns: props.columns,
    columnsSpec: props.columnsSpec,
    showColumnLabels: props.showColumnLabels || false,
    showRowLabels: props.showRowLabels || false,
    rowCount: props.rowCount || props.data.rows.length,
    columnCount: props.columnCount || props.columns.length,
    rowOffset: props.rowOffset || 0,
    columnOffset: props.columnOffset || 0,
    fullWidth: props.fullWidth || false,
  };
};

export const GridView = <DataModel,>(props: { value: GridViewProps<DataModel> }) => {
  const [data, _setData] = useState<DataProps<DataModel>>(props.value.data);
  function toColumnLabel(index: number) {
    return String.fromCharCode("A".charCodeAt(0) + index);
  }
  function toRowLabel(index: number) {
    return String(index + 1);
  }
  const gridStyle = {
    "--cell-fg-base": "var(--color-zinc-900)",
    "--cell-fg-label": "var(--color-indigo-800)",
    "--cell-bg-base": "var(--color-zinc-100)",
    "--cell-bg-header": "var(--color-zinc-300)",
    "--cell-bg-label": "var(--color-indigo-100)",
    "--cell-border-base": "var(--color-zinc-400)",
    "--cell-border-label": "var(--color-indigo-300)",
    "--cell-outline-selected": "var(--color-indigo-500)",
  } as React.CSSProperties;
  return (
    <GridViewContext value={props.value}>
      <Grid
        className={classNames(
          "text-[14px]/[28px] text-(--cell-fg-base) bg-(--cell-bg-base)",
          props.value.fullWidth && "!w-full",
        )}
        style={{ ...gridStyle, gridTemplateColumns: props.value.columnsSpec }}
      >
        {props.value.showColumnLabels && (
          <div key="row-1" role="row" className="contents" data-row-index={-1}>
            {props.value.showRowLabels && (
              <GridCell key={-1} column={1} className="bg-(--cell-bg-label)" />
            )}
            {props.value.columns.map((_column, columnIndex) => (
              <GridCell
                key={columnIndex}
                column={columnIndex + 2}
                className="bg-(--cell-bg-label) text-(--cell-fg-label) border-l-(--cell-border-label) border-b border-b-(--cell-border-base) flex items-start justify-center"
              >
                {toColumnLabel(columnIndex + (props.value.columnOffset ?? 0))}
              </GridCell>
            ))}
          </div>
        )}
        <div key="row-2" role="row" className="contents" data-row-index={-1}>
          {props.value.showRowLabels && (
            <GridCell
              key={-1}
              column={1}
              className="bg-(--cell-bg-label) text-(--cell-fg-label) border-t-(--cell-border-label) border-r border-r-(--cell-border-base)"
            />
          )}
          {props.value.columns.map((column, columnIndex) => (
            <GridCell
              key={columnIndex}
              column={columnIndex + 2}
              isSelectable
              className="bg-(--cell-bg-header)"
            >
              {column.headerCellRenderer ? (
                column.headerCellRenderer({
                  columnIndex,
                  label: column.label,
                })
              ) : (
                <div>{column.label}</div>
              )}
            </GridCell>
          ))}
        </div>
        {data.rows.map((row, rowIndex) => (
          <div key={rowIndex} role="row" className="contents" data-row-index={rowIndex}>
            {props.value.showRowLabels && (
              <GridCell
                key={-1}
                column={1}
                className={classNames(
                  "bg-(--cell-bg-label) text-(--cell-fg-label) min-w-[28px]",
                  "border-t-(--cell-border-label) border-r border-r-(--cell-border-base)",
                  "flex items-start justify-center",
                )}
              >
                {toRowLabel(rowIndex + (props.value.rowOffset ?? 0))}
              </GridCell>
            )}
            {props.value.columns.map((column, columnIndex) => (
              <GridCell
                key={columnIndex}
                column={columnIndex + 2}
                isSelectable
                className={classNames(
                  column.width && "w-(--width)",
                  column.minWidth && "min-w-(--min-width)",
                  column.maxWidth && "max-w-(--max-width)",
                )}
                style={
                  {
                    "--width": column.width,
                    "--min-width": column.minWidth,
                    "--max-width": column.maxWidth,
                  } as React.CSSProperties
                }
              >
                {column.cellRenderer ? (
                  column.cellRenderer({ columnIndex, rowIndex, row: row })
                ) : (
                  <div>{(row as any)[column.key]}</div>
                )}
              </GridCell>
            ))}
          </div>
        ))}
      </Grid>
    </GridViewContext>
  );
};

export const GridViewContext = createContext<GridViewProps<any> | null>(null);

export const useGridViewContext = () => {
  return useContext(GridViewContext);
};

export const Grid = (props: {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      role="grid"
      className={classNames(
        props.className,
        "w-fit grid auto-cols-max grid-flow-col border-(--cell-border-base) border border-t-0",
      )}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export const GridCell = (props: {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  column: number | [number, number];
  isSelectable?: boolean;
}) => {
  return (
    <div
      role="cell"
      tabIndex={props.isSelectable ? -1 : undefined}
      className={classNames(
        props.className,
        "grid relative focus:[&>div[aria-hidden]]:block overflow-hidden",
        "col-(--column) border-(--cell-border-base) not-first:border-l border-t p-2 py-0",
        props.isSelectable && ["cursor-auto select-none"],
      )}
      style={
        {
          "--column": props.column.toString().split(",").join("/"),
          ...props.style,
        } as React.CSSProperties
      }
    >
      {props.isSelectable && (
        <div
          aria-hidden
          className={classNames(
            "absolute hidden inset-0 z-10 pointer-events-none",
            "outline-2 -outline-offset-1 outline-(--cell-outline-selected)",
          )}
        ></div>
      )}
      {props.children}
    </div>
  );
};
