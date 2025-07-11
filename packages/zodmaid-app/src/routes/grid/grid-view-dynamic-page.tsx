import { Fragment } from "react";
import {
  defineGridContext,
  determineJsonType,
  JsonCell,
  JsonCellExpandButton,
  JsonCellLayout,
  JsonCellTypeButton,
  JsonGrid,
  JsonGridCellLayout,
  JsonGridView,
  JsonRow,
  transformToGridRows,
  type GridContextProps,
  type GridRow,
  type JsonArray,
  type JsonObject,
} from "zodspy";
import { purchaseOrder } from "zodspy/examples/purchase-order";

export const GridViewDynamicPage = () => {
  return (
    <div className="min-h-dvh bg-gray-100 text-gray-900 p-4">
      <GridViewForRoot value={purchaseOrder} />
    </div>
  );
};

const GridViewForRoot = (gridProps: { value: JsonObject }) => {
  type DataModel = GridRow;
  const context = defineGridContext<DataModel>({
    label: "root",
    rows: [
      // wrap.
      { type: "object", key: "", value: {} },
    ],
    columns: [
      {
        label: "key",
        width: "minmax(60px, max-content)",
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
          if (props.data.row?.key === "") {
            return <JsonGridCellLayout gridSlot={<GridViewForObject value={gridProps.value} />} />;
          }
        },
      },
    ],
    elements: {
      Grid: JsonGrid,
      Row: JsonRow,
      Cell(props) {
        if (props.data.column?.label === "key") {
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

const GridViewForObject = (gridProps: { value: JsonObject }) => {
  type DataModel = GridRow;
  const context = defineGridContext<DataModel>({
    label: "order",
    rows: transformToGridRows(gridProps.value),
    columns: [
      {
        label: "key",
        width: "minmax(60px, max-content)",
        cellRenderer(props) {
          const type = props.data.row?.type;
          const isObjectOrArray = type === "object" || type === "array";
          return (
            <Fragment>
              {isObjectOrArray && (
                <JsonCellLayout
                  prefixSlot={<JsonCellExpandButton isExpanded={props.data.rowIndex === 4} />}
                  primarySlot={
                    <div className="flex items-center">
                      <JsonCellTypeButton type={type} />
                      <div className="pr-1.5">{props.data.row?.key}</div>
                    </div>
                  }
                />
              )}
              {!isObjectOrArray && (
                <div className="flex items-center">
                  <div className="px-1.5">{props.data.row?.key}</div>
                </div>
              )}
            </Fragment>
          );
        },
      },
      {
        label: "value",
        width: "1fr",
        cellRenderer(props) {
          const type = props.data.row?.type;
          if (type === "object") {
            return (
              <JsonGridCellLayout
                gridSlot={<GridViewForObject value={props.data.row?.value as JsonObject} />}
              />
            );
          }
          if (type === "array") {
            return (
              <JsonGridCellLayout
                gridSlot={<GridViewForArray value={props.data.row?.value as JsonArray} />}
              />
            );
          }
          return renderCell(props.data.row, props.data.column?.label);
        },
      },
    ],
    elements: {
      Grid: JsonGrid,
      Row: JsonRow,
      Cell(props) {
        const type = props.data.row?.type;
        const isObjectOrArray = type === "object" || type === "array";
        if (isObjectOrArray) {
          if (props.data.column?.label === "key") {
            return <JsonCell {...props} gridRowOffset={0} gridColumnLimit={-1} />;
          }
          if (props.data.column?.label === "value") {
            return <JsonCell {...props} gridRowOffset={1} />;
          }
        }
        return <JsonCell {...props} />;
      },
    },
  });
  return <JsonGridView context={context as GridContextProps} />;
};

const GridViewForArray = (gridProps: { value: JsonArray }) => {
  type DataModel = GridRow;
  const context = defineGridContext<DataModel>({
    label: "order",
    rows: transformToGridRows(gridProps.value),
    columns: [
      {
        label: "key",
        width: "minmax(60px, max-content)",
        cellRenderer(props) {
          const type = props.data.row?.type;
          const isObjectOrArray = type === "object" || type === "array";
          return (
            <Fragment>
              {isObjectOrArray && (
                <JsonCellLayout
                  prefixSlot={<JsonCellExpandButton isExpanded={props.data.rowIndex === 4} />}
                  primarySlot={
                    <div className="flex items-center">
                      <JsonCellTypeButton type={type} />
                      <div className="pr-1.5">{props.data.row?.key}</div>
                    </div>
                  }
                />
              )}
              {!isObjectOrArray && (
                <div className="flex items-center">
                  <div className="px-1.5">{props.data.row?.key}</div>
                </div>
              )}
            </Fragment>
          );
        },
      },
      {
        label: "value",
        width: "1fr",
        cellRenderer(props) {
          const type = props.data.row?.type;
          if (type === "object") {
            return (
              <JsonGridCellLayout
                gridSlot={<GridViewForObject value={props.data.row?.value as JsonObject} />}
              />
            );
          }
          if (type === "array") {
            return (
              <JsonGridCellLayout
                gridSlot={<GridViewForArray value={props.data.row?.value as JsonArray} />}
              />
            );
          }
          return renderCell(props.data.row, props.data.column?.label);
        },
      },
    ],
    elements: {
      Grid: JsonGrid,
      Row: JsonRow,
      Cell(props) {
        const type = props.data.row?.type;
        const isObjectOrArray = type === "object" || type === "array";
        if (isObjectOrArray) {
          if (props.data.column?.label === "key") {
            return <JsonCell {...props} gridRowOffset={0} gridColumnLimit={-1} />;
          }
          if (props.data.column?.label === "value") {
            return <JsonCell {...props} gridRowOffset={1} />;
          }
        }
        return <JsonCell {...props} />;
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
