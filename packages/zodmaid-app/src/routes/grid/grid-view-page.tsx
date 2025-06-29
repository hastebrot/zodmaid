import { GridView, useGridView, type DataProps } from "../../components/grid-view/grid-view";
import { classNames } from "../../helpers/clsx";

export const GridViewPage = () => {
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
  const data: DataProps<DataModel> = {
    rows: [
      { key: "orderDate", value: "2019-12-01" },
      { key: "items", value: [] },
      { key: "shipTo", value: {} },
    ],
  };
  const gridView = useGridView({
    name: "order",
    data,
    columns: [
      {
        key: "key",
        label: "Key",
        // width: "140px",
      },
      {
        key: "value",
        label: "Value",
        cellRenderer(props) {
          if (props.row.key === "items") {
            return (
              <div className="grid -mx-2">
                <div
                  className={classNames(
                    // wrap.
                    "grid -m-px",
                    "overflow-hidden",
                  )}
                >
                  <GridViewForItems columnOffset={props.columnIndex} rowOffset={props.rowIndex} />
                </div>
              </div>
            );
          }
          if (props.row.key === "shipTo") {
            return (
              <div className="grid -mx-2">
                <div
                  className={classNames(
                    // wrap.
                    "grid -m-px",
                    "overflow-hidden",
                  )}
                >
                  <GridViewForShipTo columnOffset={props.columnIndex} rowOffset={props.rowIndex} />
                </div>
              </div>
            );
          }
          return <div>{String(props.row.value) ?? "<empty>"}</div>;
        },
      },
    ],
    showRowLabels: true,
    showColumnLabels: true,
  });
  return <GridView value={gridView} />;
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
