import { Fragment } from "react";
import {
  defineGridContext,
  determineJsonType,
  JsonCell,
  JsonCellExpandButton,
  JsonCellLayout,
  JsonCellRenderer,
  JsonCellTableButton,
  JsonCellTypeButton,
  JsonGrid,
  JsonGridCellLayout,
  JsonGridView,
  JsonRow,
  type GridContextProps,
} from "zodspy";

export const GridViewStaticPage = () => {
  return (
    <div className="min-h-dvh bg-gray-100 text-gray-900 p-4">
      <GridViewForRoot />
    </div>
  );
};

const GridViewForRoot = () => {
  type DataModel = {
    type: string;
    label: string;
    value: unknown;
  };
  const context = defineGridContext<DataModel>({
    label: "order.root",
    rows: [
      // wrap.
      { type: "object", label: "", value: {} },
    ],
    columns: [
      {
        label: "label",
        width: "minmax(50px, max-content)",
        cellRenderer(props) {
          return (
            <JsonCellLayout
              prefixSlot={<JsonCellExpandButton isExpanded={props.data.rowIndex === 4} />}
              primarySlot={<JsonCellTypeButton type="object" />}
            />
          );
        },
      },
      {
        label: "value",
        width: "1fr",
        cellRenderer(props) {
          if (props.data.row?.label === "") {
            return <JsonGridCellLayout gridSlot={<GridViewForOrder />} />;
          }
        },
      },
    ],
    elements: {
      Grid: JsonGrid,
      Row: JsonRow,
      Cell(props) {
        if (props.data.column?.label === "label") {
          return <JsonCell {...props} gridRowOffset={0} gridColumnLimit={-1} />;
        }
        if (props.data.column?.label === "value") {
          return <JsonCell {...props} gridRowOffset={1} />;
        }
        return <JsonCell {...props} />;
      },
    },
  });
  return (
    <div className="w-fit">
      <JsonGridView context={context as GridContextProps} />
    </div>
  );
};

const GridViewForOrder = () => {
  type DataModel = {
    key: string;
    value: unknown;
  };
  const context = defineGridContext<DataModel>({
    label: "order",
    rows: [
      { key: "orderDate", value: "2019-12-01" },
      { key: "items", value: [] },
      { key: "shipTo", value: {} },
    ],
    columns: [
      {
        label: "key",
        width: "max-content",
        cellRenderer(props) {
          const type = determineJsonType(props.data.row?.value);
          return (
            <div className="flex items-center">
              <JsonCellTypeButton type={type} />
              <div className="pr-1">{props.data.row?.key}</div>
            </div>
          );
        },
      },
      {
        label: "value",
        width: "1fr",
        cellRenderer(props) {
          if (props.data.row?.key === "items") {
            return (
              <JsonGridCellLayout
                gridSlot={
                  <GridViewForItems
                    columnOffset={props.data.columnIndex}
                    rowOffset={props.data.rowIndex}
                  />
                }
              />
            );
          }
          if (props.data.row?.key === "shipTo") {
            return (
              <JsonGridCellLayout
                gridSlot={
                  <GridViewForShipTo
                    columnOffset={props.data.columnIndex}
                    rowOffset={props.data.rowIndex}
                  />
                }
              />
            );
          }
          return renderCell(props.data.row, props.data.column?.label);
        },
      },
    ],
    elements: {
      Grid(props) {
        return <JsonGrid {...props} />;
      },
      Row(props) {
        return <JsonRow {...props} />;
      },
      Cell(props) {
        return (
          <JsonCell {...props}>
            <JsonCellRenderer />
          </JsonCell>
        );
      },
    },
  });
  return <JsonGridView context={context as GridContextProps} />;
};

const GridViewForItems = (_props: { columnOffset?: number; rowOffset?: number }) => {
  type DataModel = {
    id: number;
    productName: string;
    quantity: number;
    price: number;
  };
  const context = defineGridContext<DataModel>({
    label: "order.items",
    rows: [
      { id: 1, productName: "Diamond heart", quantity: 123_456, price: 10.95 },
      { id: 2, productName: "Amber ring", quantity: 2, price: 20.95 },
      { id: 3, productName: "Pearl necklace", quantity: 3, price: 30.95 },
      { id: 4, productName: "Jade earring", quantity: 4, price: 40.95 },
      { id: 5, productName: "Ruby bracelet", quantity: 5, price: 50.95 },
    ],
    columns: [
      {
        label: "productName",
        width: "max-content",
        cellRenderer(props) {
          if (props.data.type === "header-cell") {
            return (
              <div className="bg-(--cell-bg-header) px-2 font-[700]">
                {props.data.column?.label}
              </div>
            );
          }
          return renderCell(props.data.row, props.data.column?.label);
        },
      },
      {
        label: "quantity",
        width: "max-content",
        cellRenderer(props) {
          if (props.data.type === "header-cell") {
            return (
              <div className="bg-(--cell-bg-header) px-2 font-[700]">
                {props.data.column?.label}
              </div>
            );
          }
          return renderCell(props.data.row, props.data.column?.label);
        },
      },
      {
        label: "price",
        width: "1fr",
        cellRenderer(props) {
          if (props.data.type === "header-cell") {
            return (
              <div className="bg-(--cell-bg-header) px-2 font-[700]">
                {props.data.column?.label}
              </div>
            );
          }
          return renderCell(props.data.row, props.data.column?.label);
        },
      },
    ],
    elements: {
      Grid(props) {
        return <JsonGrid {...props} />;
      },
      Row(props) {
        return <JsonRow {...props} />;
      },
      Cell(props) {
        return (
          <JsonCell {...props}>
            <JsonCellRenderer />
          </JsonCell>
        );
      },
    },
  });
  return <JsonGridView context={context as GridContextProps} showHeader />;
};

const GridViewForShipTo = (_props: { columnOffset?: number; rowOffset?: number }) => {
  type DataModel =
    | {
        key: string;
        value: unknown;
      }
    | {
        type: "comment";
        value: string;
      };
  const context = defineGridContext<DataModel>({
    label: "order.shipTo",
    rows: [
      { type: "comment", value: "Shipping address for the order." },
      { key: "name", value: "Helen Zoe" },
      { key: "street", value: "47 Eden Street" },
      { key: "city", value: "Cambridge" },
      { key: "postcode", value: "126" },
    ],
    columns: [
      {
        label: "key",
        width: "minmax(50px, max-content)",
        cellRenderer(props) {
          return (
            <JsonCellLayout
              prefixSlot={<JsonCellExpandButton isExpanded={props.data.rowIndex === 4} />}
              primarySlot={renderCell(props.data.row, props.data.column?.label)}
              secondarySlot={props.data.rowIndex === 4 && <JsonCellTableButton />}
            />
          );
        },
      },
      {
        label: "value",
        width: "1fr",
        cellRenderer(props) {
          return (
            <JsonCellLayout primarySlot={renderCell(props.data.row, props.data.column?.label)} />
          );
        },
      },
      {
        label: "value",
        width: "1fr",
        cellRenderer(props) {
          return (
            <JsonCellLayout primarySlot={renderCell(props.data.row, props.data.column?.label)} />
          );
        },
      },
    ],
    elements: {
      Grid(props) {
        return <JsonGrid {...props} />;
      },
      Row(props) {
        return <JsonRow {...props} />;
      },
      Cell(props) {
        const row = { type: null, ...props.data.row };
        const column = { type: null, ...props.data.column };
        if (row.type === "comment") {
          if (props.data.columnIndex === 0) {
            return (
              <JsonCell {...props} gridColumnLimit={-1}>
                <JsonCellLayout primarySlot={renderCommentCell(row, "value")} />
              </JsonCell>
            );
          }
          return <Fragment />;
        }
        if (column.label === "key" && props.data.rowIndex === 4) {
          return (
            <JsonCell {...props} gridRowOffset={0} gridColumnLimit={-1}>
              <JsonCellRenderer />
            </JsonCell>
          );
        }
        if (column.label === "value" && props.data.rowIndex === 4) {
          return (
            <JsonCell {...props} gridRowOffset={1}>
              <div className="flex flex-col">
                <JsonCellRenderer />
                <JsonCellRenderer />
                <JsonCellRenderer />
              </div>
            </JsonCell>
          );
        }
        return (
          <JsonCell {...props}>
            <JsonCellRenderer />
          </JsonCell>
        );
      },
    },
  });
  return <JsonGridView context={context as GridContextProps} />;
};

function renderCell<DataModel>(item?: DataModel, key?: string) {
  if (item == undefined || key == undefined) return null;
  const value = item[key as keyof DataModel];
  const type = determineJsonType(value);
  const text = type === "array" || type === "object" ? JSON.stringify(value) : String(value);
  return (
    <div className="flex items-center">
      <JsonCellTypeButton type={type} />
      <div className="pr-1">{text}</div>
    </div>
  );
}

function renderCommentCell<DataModel>(item?: DataModel, key?: string) {
  if (item == undefined || key == undefined) return null;
  const value = item[key as keyof DataModel];
  const text = String(value);
  return (
    <div className="flex items-center">
      <JsonCellTypeButton type="comment" symbol="//" />
      <div className="pr-1 text-(--color-green-700)">{text}</div>
    </div>
  );
}
