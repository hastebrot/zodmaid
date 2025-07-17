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
  type GridColumn,
  type GridContextProps,
  type JsonArray,
  type JsonDataModel,
  type JsonObject,
} from "zodspy";
import { transformToTableRows } from "zodspy/components/json/json-grid-transformer";
import { musicLibrary } from "zodspy/examples/music-library";
import { purchaseOrder } from "zodspy/examples/purchase-order";
import { classNames } from "../../helpers/clsx";

export const GridViewDynamicPage = () => {
  const examples = {
    purchaseOrder,
    musicLibrary,
  };
  const [exampleName, setExampleName] = useState<keyof typeof examples>("musicLibrary");
  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");

  return (
    <div
      className={classNames(
        "h-dvh p-4 bg-(--bg-base) text-(--fg-base)",
        "[scrollbar-color:var(--border-base)_var(--bg-base)]",
        "overflow-auto overscroll-contain",
        colorMode === "light" && [
          "[--bg-base:var(--color-gray-100)]",
          "[--border-base:var(--color-gray-400)]",
          "[--fg-base:var(--color-gray-900)]",
          "[--fg-accent:var(--color-blue-800)]",
        ],
        colorMode === "dark" && [
          "[--bg-base:var(--color-zinc-900)]",
          "[--border-base:var(--color-zinc-700)]",
          "[--fg-base:var(--color-zinc-300)]",
          "[--fg-accent:var(--color-blue-500)]",
        ],
      )}
    >
      <div className="flex items-center gap-1.5 pb-3 text-(--fg-accent) underline text-sm">
        <button className="cursor-pointer" onClick={() => setColorMode("light")}>
          light
        </button>
        <button className="cursor-pointer" onClick={() => setColorMode("dark")}>
          dark
        </button>
        <button className="cursor-pointer" onClick={() => setExampleName("purchaseOrder")}>
          purchaseOrder
        </button>
        <button className="cursor-pointer" onClick={() => setExampleName("musicLibrary")}>
          musicLibrary
        </button>
      </div>
      <div className="w-fit h-fit">
        <GridViewForRoot key={exampleName} value={examples[exampleName]} theme={colorMode} />
      </div>
    </div>
  );
};

const GridViewForRoot = (gridProps: { value: JsonObject; theme?: "light" | "dark" }) => {
  type DataModel = JsonDataModel;
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
            return (
              <JsonGridCellLayout
                gridSlot={<GridViewForObject value={gridProps.value} theme={gridProps.theme} />}
              />
            );
          }
        },
      },
    ],
    elements: {
      Grid(props) {
        return <JsonGrid {...props} theme={gridProps.theme} />;
      },
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

const GridViewForObject = (gridProps: { value: JsonObject; theme?: "light" | "dark" }) => {
  type DataModel = JsonDataModel;
  const context = defineGridContext<DataModel>({
    label: "object",
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
          const value = props.data.row?.value;
          if (type === "object") {
            return (
              <JsonGridCellLayout
                gridSlot={<GridViewForObject value={value as JsonObject} theme={gridProps.theme} />}
              />
            );
          }
          if (type === "array") {
            const hasArrayObjects = (value as JsonArray).every(
              (it) => determineJsonType(it) === "object",
            );
            if (hasArrayObjects) {
              return (
                <JsonGridCellLayout
                  gridSlot={
                    <GridViewForArrayTable value={value as JsonArray} theme={gridProps.theme} />
                  }
                />
              );
            }
            return (
              <JsonGridCellLayout
                gridSlot={<GridViewForArray value={value as JsonArray} theme={gridProps.theme} />}
              />
            );
          }
          return renderCell(props.data.row, props.data.column?.label);
        },
      },
    ],
    elements: {
      Grid(props) {
        return <JsonGrid {...props} theme={gridProps.theme} />;
      },
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

const GridViewForArray = (gridProps: { value: JsonArray; theme?: "light" | "dark" }) => {
  type DataModel = JsonDataModel;
  const context = defineGridContext<DataModel>({
    label: "array",
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
                    <div className="pr-1.5 font-[700] text-(--cell-fg-muted)">{index}</div>
                  </div>
                }
              />
            );
          }
          return (
            <div className="flex items-center">
              <div className="px-1.5 font-[700] text-(--cell-fg-muted)">{index}</div>
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
                gridSlot={
                  <GridViewForObject
                    value={props.data.row?.value as JsonObject}
                    theme={gridProps.theme}
                  />
                }
              />
            );
          }
          if (type === "array") {
            return (
              <JsonGridCellLayout
                gridSlot={
                  <GridViewForArray
                    value={props.data.row?.value as JsonArray}
                    theme={gridProps.theme}
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
        return <JsonGrid {...props} theme={gridProps.theme} />;
      },
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

const GridViewForArrayTable = (gridProps: { value: JsonArray; theme?: "light" | "dark" }) => {
  type DataModel = JsonDataModel[];
  const rows = transformToTableRows(gridProps.value);
  const columns: GridColumn<DataModel>[] = rows[0].map((column, columnIndex) => {
    const lastColumnIndex = rows[0].length - 1;
    if (column.key === "") {
      return {
        label: column.key,
        width: "minmax(55px, max-content)",
        cellRenderer(props) {
          const row = props.data.row?.[columnIndex];
          const value = row?.value;
          const index = Number(value) + 1;
          const type = "object";
          if (props.data.type === "header-cell") {
            const label = <>&nbsp;</>;
            return <div className="bg-(--cell-bg-header) px-2 font-[700]">{label}</div>;
          }
          return (
            <div className={classNames("flex items-center px-1.5", type === "object" && "!pl-0")}>
              {type === "object" && <JsonCellTypeButton type={type} />}
              <div className="font-[700] text-(--cell-fg-muted)">{index}</div>
            </div>
          );
        },
      };
    }
    return {
      label: column.key,
      width: columnIndex < lastColumnIndex ? "max-content" : "1fr",
      cellRenderer(props) {
        const row = props.data.row?.[columnIndex];
        const type = row?.type;
        const value = row?.value;
        if (props.data.type === "header-cell") {
          const label = String(props.data.column?.label ?? "");
          const type = rows[0][columnIndex].type;
          return (
            <div
              className={classNames(
                "flex items-center px-1.5 bg-(--cell-bg-header)",
                type === "object" && "!pl-0",
                type === "array" && "!pl-0",
              )}
            >
              {type === "object" && <JsonCellTypeButton type={type} />}
              {type === "array" && <JsonCellTypeButton type={type} />}
              <div className="font-[700]">{label}</div>
            </div>
          );
        }
        if (type === "object") {
          return (
            <JsonGridCellLayout
              gridSlot={<GridViewForObject value={value as JsonObject} theme={gridProps.theme} />}
            />
          );
        }
        if (type === "array") {
          return (
            <JsonGridCellLayout
              gridSlot={<GridViewForArray value={value as JsonArray} theme={gridProps.theme} />}
            />
          );
        }
        return renderCell(row, "value");
      },
    };
  });
  const context = defineGridContext<DataModel>({
    label: "array-table",
    rows,
    columns,
    elements: {
      Grid(props) {
        return <JsonGrid {...props} theme={gridProps.theme} />;
      },
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
