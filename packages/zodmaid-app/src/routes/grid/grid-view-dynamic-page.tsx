import { useState } from "react";
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
import { transformToTableRows } from "zodspy/components/json/json-grid-transformer";
import { musicLibrary } from "zodspy/examples/music-library";
import { purchaseOrder } from "zodspy/examples/purchase-order";

export const GridViewDynamicPage = () => {
  const examples = {
    purchaseOrder,
    musicLibrary,
  };
  const [exampleName, setExampleName] = useState<keyof typeof examples>("purchaseOrder");

  return (
    <div className="min-h-dvh bg-gray-100 text-gray-900 p-4">
      <div className="flex items-center gap-1.5 pb-1.5 text-blue-800 underline text-sm">
        <button className="cursor-pointer" onClick={() => setExampleName("purchaseOrder")}>
          purchaseOrder
        </button>
        <button className="cursor-pointer" onClick={() => setExampleName("musicLibrary")}>
          musicLibrary
        </button>
      </div>
      <div className="w-fit h-fit">
        <GridViewForRoot key={exampleName} value={examples[exampleName]} />
      </div>
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
        width: "minmax(55px, max-content)",
        cellRenderer() {
          return (
            <JsonCellLayout
              prefixSlot={<JsonCellExpandButton isExpanded />}
              primarySlot={<JsonCellTypeButton type="object" />}
            />
          );
        },
      },
      {
        label: "value",
        width: "max-content",
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
  return <JsonGridView context={context as GridContextProps} />;
};

const GridViewForObject = (gridProps: { value: JsonObject }) => {
  type DataModel = GridRow;
  const context = defineGridContext<DataModel>({
    label: "order",
    rows: transformToGridRows(gridProps.value),
    columns: [
      {
        label: "key",
        width: "minmax(55px, max-content)",
        cellRenderer(props) {
          const type = props.data.row?.type;
          const key = String(props.data.row?.key);
          if (type === "object" || type === "array") {
            return (
              <JsonCellLayout
                prefixSlot={<JsonCellExpandButton isExpanded />}
                primarySlot={
                  <div className="flex items-center">
                    <JsonCellTypeButton type={type} />
                    <div className="pr-1.5 font-[700]">{key}</div>
                  </div>
                }
              />
            );
          }
          return (
            <div className="flex items-center">
              <div className="px-1.5 font-[700]">{key}</div>
            </div>
          );
        },
      },
      {
        label: "value",
        width: "1fr",
        cellRenderer(props) {
          const type = props.data.row?.type;
          const key = String(props.data.row?.key);
          if (type === "object") {
            return (
              <JsonGridCellLayout
                gridSlot={<GridViewForObject value={props.data.row?.value as JsonObject} />}
              />
            );
          }
          if (type === "array" && (key === "Tracks" || key === "items")) {
            return (
              <JsonGridCellLayout
                gridSlot={<GridViewForArrayTable value={props.data.row?.value as JsonArray} />}
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
        if (type === "object" || type === "array") {
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
        width: "minmax(55px, max-content)",
        cellRenderer(props) {
          const type = props.data.row?.type;
          const index = Number(props.data.row?.key) + 1;
          if (type === "object" || type === "array") {
            return (
              <JsonCellLayout
                prefixSlot={<JsonCellExpandButton isExpanded />}
                primarySlot={
                  <div className="flex items-center">
                    <JsonCellTypeButton type={type} />
                    <div className="pr-1.5 font-[700] text-gray-500">{index}</div>
                  </div>
                }
              />
            );
          }
          return (
            <div className="flex items-center">
              <div className="px-1.5 font-[700] text-gray-500">{index}</div>
            </div>
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

const GridViewForArrayTable = (gridProps: { value: JsonArray }) => {
  const rows = transformToTableRows(gridProps.value);
  type DataModel = GridRow[];
  const context = defineGridContext<DataModel>({
    label: "order",
    rows,
    columns: [
      {
        label: rows[0]?.[0]?.key,
        width: "minmax(55px, max-content)",
        cellRenderer(props) {
          const row = props.data.row?.[0];
          const type = row?.type;
          const value = row?.value;
          const index = Number(value) + 1;
          const label = String(props.data.column?.label);
          if (props.data.type === "header-cell") {
            return (
              <div className="bg-(--cell-bg-header) px-2 font-[700]">
                {label}
                <>&nbsp;</>
              </div>
            );
          }
          if (type === "object" || type === "array") {
            return (
              <JsonCellLayout
                prefixSlot={<JsonCellExpandButton isExpanded />}
                primarySlot={
                  <div className="flex items-center">
                    <JsonCellTypeButton type={type} />
                    <div className="pr-1.5 font-[700] text-gray-500">{index}</div>
                  </div>
                }
              />
            );
          }
          return (
            <div className="flex items-center">
              <div className="px-1.5 font-[700] text-gray-500">{index}</div>
            </div>
          );
        },
      },
      {
        label: rows[0]?.[1]?.key,
        width: "max-content",
        cellRenderer(props) {
          const row = props.data.row?.[1];
          const type = row?.type;
          const value = row?.value;
          const label = String(props.data.column?.label);
          if (props.data.type === "header-cell") {
            return <div className="bg-(--cell-bg-header) px-2 font-[700]">{label}</div>;
          }
          if (type === "object") {
            return (
              <JsonGridCellLayout gridSlot={<GridViewForObject value={value as JsonObject} />} />
            );
          }
          if (type === "array") {
            return (
              <JsonGridCellLayout gridSlot={<GridViewForArray value={value as JsonArray} />} />
            );
          }
          return renderCell(row, "value");
        },
      },
      {
        label: rows[0]?.[2]?.key,
        width: "max-content",
        cellRenderer(props) {
          const row = props.data.row?.[2];
          const type = row?.type;
          const value = row?.value;
          const label = String(props.data.column?.label);
          if (props.data.type === "header-cell") {
            return <div className="bg-(--cell-bg-header) px-2 font-[700]">{label}</div>;
          }
          if (type === "object") {
            return (
              <JsonGridCellLayout gridSlot={<GridViewForObject value={value as JsonObject} />} />
            );
          }
          if (type === "array") {
            return (
              <JsonGridCellLayout gridSlot={<GridViewForArray value={value as JsonArray} />} />
            );
          }
          return renderCell(row, "value");
        },
      },
      {
        label: rows[0]?.[3]?.key,
        width: "1fr",
        cellRenderer(props) {
          const row = props.data.row?.[3];
          const type = row?.type;
          const value = row?.value;
          const label = String(props.data.column?.label);
          if (props.data.type === "header-cell") {
            return <div className="bg-(--cell-bg-header) px-2 font-[700]">{label}</div>;
          }
          if (type === "object") {
            return (
              <JsonGridCellLayout gridSlot={<GridViewForObject value={value as JsonObject} />} />
            );
          }
          if (type === "array") {
            return (
              <JsonGridCellLayout gridSlot={<GridViewForArray value={value as JsonArray} />} />
            );
          }
          return renderCell(row, "value");
        },
      },
    ],
    elements: {
      Grid: JsonGrid,
      Row: JsonRow,
      Cell(props) {
        return <JsonCell {...props} />;
      },
    },
  });
  return <JsonGridView context={context as GridContextProps} showHeader />;
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
