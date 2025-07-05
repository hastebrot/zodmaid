import { BaseCell, BaseGrid, BaseRow, UnstyledGridView, type GridContextProps } from "zodspy";
import { classNames } from "zodspy/helpers/clsx";
import { GridView, useGridView, type DataProps } from "../../components/grid-view/grid-view";

export const StaticGridViewPage = () => {
  return (
    <div className="min-h-dvh bg-gray-100 text-gray-900 p-4">
      <GridViewForOrder />
    </div>
  );
};

const GridViewForOrder = () => {
  type DataModel = {
    key: string;
    value: unknown;
  };
  const context: GridContextProps<DataModel> = {
    rows: [
      { key: "orderDate", value: "2019-12-01" },
      { key: "items", value: [] },
      { key: "shipTo", value: {} },
    ],
    columns: [
      {
        label: "key",
        width: "max-content",
        renderCell(props) {
          return <div>{props.data.row?.key}</div>;
        },
      },
      {
        label: "value",
        width: "max-content",
        renderCell(props) {
          if (props.data.row?.key === "items") {
            return (
              <div className="grid -m-px -mx-[calc(8px+1px)]">
                <GridViewForItems
                  columnOffset={props.data.columnIndex}
                  rowOffset={props.data.rowIndex}
                />
              </div>
            );
          }
          if (props.data.row?.key === "shipTo") {
            return (
              <div className="grid -m-px -mx-[calc(8px+1px)]">
                <GridViewForShipTo
                  columnOffset={props.data.columnIndex}
                  rowOffset={props.data.rowIndex}
                />
              </div>
            );
          }
          const item = props.data.row as DataModel;
          const key = props.data.column?.label as keyof DataModel;
          const value = item[key];
          const isJsonArray = Array.isArray(value);
          const isJsonObject = typeof value === "object";
          const cell = isJsonArray || isJsonObject ? JSON.stringify(value) : value;
          return <div>{String(cell)}</div>;
        },
      },
    ],
    components: {
      Grid(props) {
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
        return (
          <BaseGrid
            {...props}
            className={classNames(
              "w-fit font-sans",
              "grid grid-flow-col auto-cols-max",
              "border-(--cell-border-base) border-l border-r border-b",
            )}
            style={gridStyles}
          />
        );
      },
      Row(props) {
        return <BaseRow {...props} className="grid grid-cols-subgrid col-span-full" />;
      },
      Cell(props) {
        const cell = props.data.column?.renderCell?.(props);
        return (
          <BaseCell
            {...props}
            className={classNames(
              "relative grid cursor-pointer select-none",
              "border-(--cell-border-base) border-t not-first:border-l",
              "px-2 text-[14px]/[28px] min-w-[28px]",
            )}
          >
            {cell}
          </BaseCell>
        );
      },
    },
  };
  return <UnstyledGridView context={context as GridContextProps} />;
};

const GridViewForItems = (props: { columnOffset?: number; rowOffset?: number }) => {
  type DataModel = {
    id: number;
    productName: string;
    quantity: number;
    price: number;
  };
  const data: DataProps<DataModel> = {
    rows: [
      { id: 1, productName: "Diamond heart", quantity: 1, price: 10.95 },
      { id: 2, productName: "Amber ring", quantity: 2, price: 20.95 },
      { id: 3, productName: "Pearl necklace", quantity: 3, price: 30.95 },
      { id: 4, productName: "Jade earring", quantity: 4, price: 40.95 },
      { id: 5, productName: "Ruby bracelet", quantity: 5, price: 50.95 },
    ],
  };
  const gridView = useGridView({
    name: "order.items",
    data,
    columnsSpec: "auto max-content max-content 1fr",
    columns: [
      // { key: "id", label: "Id" },
      {
        key: "productName",
        label: "Product Name",
        // width: "140px",
        // width: "max-content",
        cellRenderer(props) {
          return <div>{props.row.productName}</div>;
        },
        headerCellRenderer(props) {
          return <div className="font-[700]">{props.label}</div>;
        },
      },
      {
        key: "quantity",
        label: "Quantity",
        // width: "max-content",
        headerCellRenderer(props) {
          return <div className="font-[700]">{props.label}</div>;
        },
      },
      {
        key: "price",
        label: "Price",
        // width: "100%",
        headerCellRenderer(props) {
          return <div className="font-[700]">{props.label}</div>;
        },
      },
    ],
    showRowLabels: false,
    showColumnLabels: true,
    columnOffset: props.columnOffset,
    rowOffset: props.rowOffset,
    fullWidth: true,
  });
  return <GridView value={gridView} />;
};

const GridViewForShipTo = (props: { columnOffset?: number; rowOffset?: number }) => {
  type DataModel = {
    key: string;
    value: unknown;
  };
  const data: DataProps<DataModel> = {
    rows: [
      { key: "name", value: "Helen Zoe" },
      { key: "street", value: "47 Eden Street" },
      { key: "city", value: "Cambridge" },
      { key: "postcode", value: "126" },
    ],
  };
  const gridView = useGridView({
    name: "order.shipTo",
    data,
    columnsSpec: "auto max-content 1fr",
    columns: [
      {
        key: "key",
        label: "Key",
        cellRenderer(props) {
          return <div>{props.row.key}</div>;
        },
        headerCellRenderer(props) {
          return <div className="font-[700]">{props.label}</div>;
        },
      },
      {
        key: "value",
        label: "Value",
        cellRenderer(props) {
          return <div>{String(props.row.value)}</div>;
        },
        headerCellRenderer(props) {
          return <div className="font-[700]">{props.label}</div>;
        },
      },
    ],
    showRowLabels: false,
    showColumnLabels: true,
    columnOffset: props.columnOffset,
    rowOffset: props.rowOffset,
    fullWidth: true,
  });
  return <GridView value={gridView} />;
};
