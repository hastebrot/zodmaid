import { useFocus } from "@react-aria/interactions";
import { createContext, useContext, useState } from "react";
import { classNames } from "../../helpers/clsx";

export type GridViewProps<DataModel> = {
  readonly name?: string;
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
    name: props.name,
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
        name={props.value.name}
      >
        {props.value.showColumnLabels && (
          <GridRow key="labels" name="row[L]" rowIndex={0}>
            {props.value.showRowLabels && (
              <GridLabelCell key="label" name="cell[L][L]" columnIndex={1} />
            )}
            {props.value.columns.map((_column, columnIndex) => (
              <GridLabelCell
                key={columnIndex}
                name={`cell[L][${columnIndex}]`}
                columnIndex={columnIndex + 2}
                position="column"
              >
                {toColumnLabel(columnIndex + (props.value.columnOffset ?? 0))}
              </GridLabelCell>
            ))}
          </GridRow>
        )}
        <GridRow key="header" name="row[H]" rowIndex={1}>
          {props.value.showRowLabels && (
            <GridLabelCell key="label" name="cell[H][L]" columnIndex={1} position="row" />
          )}
          {props.value.columns.map((column, columnIndex) => (
            <GridHeaderCell
              key={columnIndex}
              name={`cell[H][${columnIndex}]`}
              columnIndex={columnIndex + 2}
              isSelectable
            >
              {column.headerCellRenderer ? (
                column.headerCellRenderer({
                  columnIndex,
                  label: column.label,
                })
              ) : (
                <div>{column.label}</div>
              )}
            </GridHeaderCell>
          ))}
        </GridRow>
        {data.rows.map((row, rowIndex) => {
          const isItemsRow = row.key && row.key === "_items";
          const isOtherItemsRow = row.key && row.key === "items";
          return (
            <GridRow key={rowIndex} name={`row[${rowIndex}]`} rowIndex={rowIndex + 2}>
              <div
                className="grid grid-cols-subgrid col-[1/5]"
                // style={{ gridTemplateColumns: props.value.columnsSpec }}
              >
                {props.value.showRowLabels && (
                  <GridLabelCell
                    key="label"
                    name={`cell[${rowIndex}][L]`}
                    columnIndex={1}
                    position="row"
                  >
                    {toRowLabel(rowIndex + (props.value.rowOffset ?? 0))}
                  </GridLabelCell>
                )}
                {isItemsRow && (
                  <GridCell key={0} columnIndex={2} columnEndIndex={4} isSelectable>
                    items items items items
                  </GridCell>
                )}
                {!isItemsRow &&
                  props.value.columns.map((column, columnIndex) => {
                    const value = (row as any)[column.key];
                    return (
                      <GridCell
                        key={columnIndex}
                        className={classNames(
                          isOtherItemsRow && columnIndex === 0 && "[&>div]:invisible border-t-0",
                        )}
                        style={
                          {
                            width: column.width,
                            minWidth: column.minWidth,
                            maxWidth: column.maxWidth,
                          } as React.CSSProperties
                        }
                        name={`cell[${rowIndex}][${columnIndex}]`}
                        columnIndex={columnIndex + 2}
                        isSelectable
                      >
                        {column.cellRenderer ? (
                          column.cellRenderer({ columnIndex, rowIndex, row: row })
                        ) : (
                          <CellContent value={value} />
                        )}
                      </GridCell>
                    );
                  })}
              </div>
            </GridRow>
          );
        })}
      </Grid>
    </GridViewContext>
  );
};

const CellContent = (props: { value: any }) => {
  return (
    <div>
      <div>{props.value}</div>
      {/* <input
        className="appearance-none focus:outline-2 outline-(--cell-outline-selected) w-full"
        type="text"
        defaultValue={props.value}
      /> */}
    </div>
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
  name?: string;
}) => {
  return (
    <div
      role="grid"
      className={classNames(
        props.className,
        "relative w-fit grid auto-cols-max grid-flow-col",
        "border-(--cell-border-base) border border-t-0",
      )}
      aria-label={props.name}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export type GridRowProps = {
  children?: React.ReactNode;
  name?: string;
  rowIndex?: number;
};

export const GridRow = (props: GridRowProps) => {
  return (
    <div
      role="row"
      className="contents"
      aria-label={props.name}
      aria-rowindex={props.rowIndex ? props.rowIndex + 1 : undefined}
    >
      {props.children}
    </div>
  );
};

const GridLabelCell = (props: {
  children?: React.ReactNode;
  name?: string;
  columnIndex?: number;
  columnEndIndex?: number;
  isSelectable?: boolean;
  position?: "column" | "row";
}) => {
  return (
    <GridCell
      className={classNames(
        "bg-(--cell-bg-label) text-(--cell-fg-label)",
        "text-[14px]/[28px] min-w-[28px]",
        "flex items-start justify-center",
        props.position === "column" && [
          "border-l-(--cell-border-label)",
          "border-b border-b-(--cell-border-base)",
        ],
        props.position === "row" && [
          "border-t-(--cell-border-label)",
          "border-r border-r-(--cell-border-base)",
        ],
      )}
      columnIndex={props.columnIndex}
      columnEndIndex={props.columnEndIndex}
      isSelectable={props.isSelectable}
    >
      {props.children}
    </GridCell>
  );
};

const GridHeaderCell = (props: {
  children?: React.ReactNode;
  name?: string;
  columnIndex?: number;
  columnEndIndex?: number;
  isSelectable?: boolean;
}) => {
  return (
    <GridCell
      className={classNames("bg-(--cell-bg-header)")}
      columnIndex={props.columnIndex}
      columnEndIndex={props.columnEndIndex}
      isSelectable={props.isSelectable}
    >
      {props.children}
    </GridCell>
  );
};

export const GridCell = (props: {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  columnIndex?: number;
  columnEndIndex?: number;
  isSelectable?: boolean;
}) => {
  const [isFocused, setFocused] = useState(false);
  const { focusProps } = useFocus({
    onFocus() {
      setFocused(true);
    },
    onBlur() {
      setFocused(false);
    },
  });
  const toGridColumn = (columnIndex?: number, columnEndIndex?: number): string | undefined => {
    if (columnIndex === undefined) {
      return undefined;
    }
    if (columnEndIndex === undefined) {
      return `${columnIndex}`;
    }
    return `${columnIndex} / ${columnEndIndex}`;
  };
  return (
    <div
      {...focusProps}
      role="cell"
      tabIndex={props.isSelectable ? -1 : undefined}
      className={classNames(
        props.className,
        "grid relative",
        props.isSelectable && ["cursor-auto select-none"],
        "border-(--cell-border-base) not-first:border-l border-t",
      )}
      style={
        {
          gridColumn: toGridColumn(props.columnIndex, props.columnEndIndex),
          ...props.style,
        } as React.CSSProperties
      }
      aria-label={props.name}
      aria-colindex={props.columnIndex}
    >
      {props.isSelectable && isFocused && (
        <div
          className={classNames(
            "absolute inset-[-1px] z-10 pointer-events-none",
            "border-2 border-(--cell-outline-selected)",
          )}
        ></div>
      )}
      <div
        className={classNames(
          // wrap.
          "grid p-2 py-0",
          "overflow-hidden",
        )}
      >
        {props.children}
      </div>
    </div>
  );
};
