import { action, observable } from "mobx";
import { Observer, observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import {
  defineGridContext,
  determineJsonType,
  JsonCellExpandButton,
  JsonCellLayout,
  JsonGridCellLayout,
  mapJsonToGridRows,
  mapJsonToTableRows,
  TetraCell,
  TetraGrid,
  TetraGridView,
  TetraJsonTypeButton,
  TetraRow,
  type GridColumn,
  type GridContextProps,
  type JsonArray,
  type JsonDataModel,
  type JsonObject,
} from "zodspy";
import { IrisInput } from "zodspy/components/iris-input";
import { musicLibrary } from "zodspy/examples/music-library";
import { purchaseOrder } from "zodspy/examples/purchase-order";
import { classNames } from "../../helpers/clsx";
import { throwError } from "../../helpers/error";
import { useDocumentTitle } from "../../helpers/react";

export const GridViewDynamicPage = () => {
  useDocumentTitle("tetra: grid view dynamic");
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
        // "[font-size-adjust:ex-height_0.5]",
        colorMode === "light" && [
          "[--bg-base:var(--color-gray-100)]",
          "[--border-base:var(--color-gray-400)]",
          "[--fg-base:var(--color-gray-900)]",
          "[--fg-accent:var(--color-blue-700)]",
        ],
        colorMode === "dark" && [
          "[--bg-base:var(--color-zinc-900)]",
          "[--border-base:var(--color-zinc-700)]",
          "[--fg-base:var(--color-zinc-300)]",
          "[--fg-accent:var(--color-sky-500)]",
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

const GridViewForRoot = observer((gridProps: { value: JsonObject; theme?: "light" | "dark" }) => {
  type DataModel = JsonDataModel;
  const [rows] = useState(() =>
    observable([{ type: "object", key: "", value: gridProps.value, isFolded: false }]),
  );
  const context = defineGridContext<DataModel>({
    label: "root",
    rows,
    columns: [
      {
        label: "key",
        width: "minmax(55px, max-content)",
        cellRenderer(props) {
          const row = props.data.row ?? throwError("row is undefined");
          return (
            <Observer>
              {() => (
                <JsonCellLayout
                  prefixSlot={
                    <JsonCellExpandButton
                      isExpanded={!row.isFolded}
                      setExpanded={action((isExpanded) => {
                        row.isFolded = !isExpanded;
                      })}
                    />
                  }
                  primarySlot={<TetraJsonTypeButton type="object" />}
                />
              )}
            </Observer>
          );
        },
      },
      {
        label: "value",
        width: "max-content",
        cellRenderer(props) {
          const row = props.data.row ?? throwError("row is undefined");
          const value = row.value;
          return (
            <Observer>
              {() => {
                if (row.isFolded) {
                  return <FoldedValue value={value} />;
                }
                if (props.data.row?.key === "") {
                  return (
                    <JsonGridCellLayout
                      gridSlot={
                        <GridViewForObject value={gridProps.value} theme={gridProps.theme} />
                      }
                    />
                  );
                }
                return null;
              }}
            </Observer>
          );
        },
      },
    ],
    elements: {
      Grid(props) {
        return <TetraGrid {...props} theme={gridProps.theme} />;
      },
      Row: TetraRow,
      Cell(props) {
        if (props.data.column?.label === "key") {
          return <TetraCell {...props} gridRowOffset={0} gridColumnLimit={-1} />;
        }
        if (props.data.column?.label === "value") {
          return <TetraCell {...props} gridRowOffset={1} />;
        }
        return <TetraCell {...props} />;
      },
    },
  });
  return <TetraGridView context={context as GridContextProps} />;
});

const GridViewForObject = observer((gridProps: { value: JsonObject; theme?: "light" | "dark" }) => {
  type DataModel = JsonDataModel;
  const [rows] = useState(() => observable(mapJsonToGridRows(gridProps.value)));
  const context = defineGridContext<DataModel>({
    label: "object",
    rows,
    columns: [
      {
        label: "key",
        width: "minmax(55px, max-content)",
        cellRenderer(props) {
          const row = props.data.row ?? throwError("row is undefined");
          return (
            <Observer>
              {() => {
                const type = row.type;
                const key = String(row.key);
                if (type === "object" || type === "array") {
                  return (
                    <JsonCellLayout
                      prefixSlot={
                        <JsonCellExpandButton
                          isExpanded={!row.isFolded}
                          setExpanded={action((isExpanded) => {
                            row.isFolded = !isExpanded;
                          })}
                        />
                      }
                      primarySlot={
                        <div className="flex items-center">
                          <TetraJsonTypeButton type={type} />
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
              }}
            </Observer>
          );
        },
      },
      {
        label: "value",
        width: "1fr",
        cellRenderer(props) {
          const row = props.data.row ?? throwError("row is undefined");
          return (
            <Observer>
              {() => {
                const type = row.type;
                const value = row.value;
                if (type === "object") {
                  if (row.isFolded) {
                    return <FoldedValue value={value} />;
                  }
                  return (
                    <JsonGridCellLayout
                      gridSlot={
                        <GridViewForObject value={value as JsonObject} theme={gridProps.theme} />
                      }
                    />
                  );
                }
                if (type === "array") {
                  if (row.isFolded) {
                    return <FoldedValue value={value} />;
                  }
                  const hasArrayObjects = (value as JsonArray).every(
                    (it) => determineJsonType(it) === "object",
                  );
                  if (hasArrayObjects) {
                    return (
                      <JsonGridCellLayout
                        gridSlot={
                          <GridViewForArrayTable
                            value={value as JsonArray}
                            theme={gridProps.theme}
                          />
                        }
                      />
                    );
                  }
                  return (
                    <JsonGridCellLayout
                      gridSlot={
                        <GridViewForArray value={value as JsonArray} theme={gridProps.theme} />
                      }
                    />
                  );
                }
                return renderCell(props.data.row, props.data.column?.label);
              }}
            </Observer>
          );
        },
      },
    ],
    elements: {
      Grid(props) {
        return <TetraGrid {...props} theme={gridProps.theme} />;
      },
      Row: TetraRow,
      Cell(props) {
        const type = props.data.row?.type;
        if (type === "object" || type === "array") {
          if (props.data.column?.label === "key") {
            return <TetraCell {...props} gridRowOffset={0} gridColumnLimit={-1} />;
          }
          if (props.data.column?.label === "value") {
            return <TetraCell {...props} gridRowOffset={1} />;
          }
        }
        return <TetraCell {...props} />;
      },
    },
  });
  return <TetraGridView context={context as GridContextProps} />;
});

const GridViewForArray = observer((gridProps: { value: JsonArray; theme?: "light" | "dark" }) => {
  type DataModel = JsonDataModel;
  const [rows] = useState(() => observable(mapJsonToGridRows(gridProps.value)));
  const context = defineGridContext<DataModel>({
    label: "array",
    rows,
    columns: [
      {
        label: "key",
        width: "minmax(55px, max-content)",
        cellRenderer(props) {
          const row = props.data.row ?? throwError("row is undefined");
          return (
            <Observer>
              {() => {
                const type = row.type;
                const index = Number(row.key) + 1;
                if (type === "object" || type === "array") {
                  return (
                    <JsonCellLayout
                      prefixSlot={
                        <JsonCellExpandButton
                          isExpanded={!row.isFolded}
                          setExpanded={action((isExpanded) => {
                            row.isFolded = !isExpanded;
                          })}
                        />
                      }
                      primarySlot={
                        <div className="flex items-center">
                          <TetraJsonTypeButton type={type} />
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
              }}
            </Observer>
          );
        },
      },
      {
        label: "value",
        width: "1fr",
        cellRenderer(props) {
          const row = props.data.row ?? throwError("row is undefined");
          return (
            <Observer>
              {() => {
                const type = row.type;
                const value = row.value;
                if (type === "object") {
                  if (row.isFolded) {
                    return <FoldedValue value={value} />;
                  }
                  return (
                    <JsonGridCellLayout
                      gridSlot={
                        <GridViewForObject
                          value={row.value as JsonObject}
                          theme={gridProps.theme}
                        />
                      }
                    />
                  );
                }
                if (type === "array") {
                  if (row.isFolded) {
                    return <FoldedValue value={value} />;
                  }
                  return (
                    <JsonGridCellLayout
                      gridSlot={
                        <GridViewForArray value={row.value as JsonArray} theme={gridProps.theme} />
                      }
                    />
                  );
                }
                return renderCell(props.data.row, props.data.column?.label);
              }}
            </Observer>
          );
        },
      },
    ],
    elements: {
      Grid(props) {
        return <TetraGrid {...props} theme={gridProps.theme} />;
      },
      Row: TetraRow,
      Cell(props) {
        const type = props.data.row?.type;
        const isObjectOrArray = type === "object" || type === "array";
        if (isObjectOrArray) {
          if (props.data.column?.label === "key") {
            return <TetraCell {...props} gridRowOffset={0} gridColumnLimit={-1} />;
          }
          if (props.data.column?.label === "value") {
            return <TetraCell {...props} gridRowOffset={1} />;
          }
        }
        return <TetraCell {...props} />;
      },
    },
  });
  return <TetraGridView context={context as GridContextProps} />;
});

const GridViewForArrayTable = (gridProps: { value: JsonArray; theme?: "light" | "dark" }) => {
  type DataModel = JsonDataModel[];
  const [rows] = useState(() => observable(mapJsonToTableRows(gridProps.value)));
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
              {type === "object" && <TetraJsonTypeButton type={type} />}
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
              {type === "object" && <TetraJsonTypeButton type={type} />}
              {type === "array" && <TetraJsonTypeButton type={type} />}
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
        return <TetraGrid {...props} theme={gridProps.theme} />;
      },
      Row: TetraRow,
      Cell(props) {
        return <TetraCell {...props} />;
      },
    },
  });
  return <TetraGridView context={context as GridContextProps} showHeader />;
};

function renderCell<DataModel>(item?: DataModel, key?: string) {
  if (item == null || key == null) return null;
  const value = item[key as keyof DataModel];
  const type = determineJsonType(value);
  const text = type === "array" || type === "object" ? JSON.stringify(value) : String(value);
  const [textValue, setTextValue] = useState(text);
  useEffect(() => {
    console.log("text value:", textValue);
  }, [textValue]);
  const onKeyCommand = (event: React.KeyboardEvent<HTMLElement>) => {
    console.log("key command:", event.key, event);
  };
  return (
    <div className="flex items-center">
      <TetraJsonTypeButton type={type} />
      <div className="pr-1 w-full">
        {/* {textValue} */}
        <IrisInput
          className={classNames(
            "outline-2 -outline-offset-1 outline-zinc-500 focus:outline-(--cell-outline-selected)",
            "box-content min-w-full min-h-lh",
          )}
          placeholder="Empty"
          value={textValue}
          onValueChange={setTextValue}
          onKeyCommand={onKeyCommand}
        />
        {/* <IrisTextarea
          className={classNames(
            "outline-2 -outline-offset-1 outline-zinc-500 focus:outline-(--cell-outline-selected)",
            "box-content min-w-full min-h-lh",
            "resize-none whitespace-pre overflow-hidden",
          )}
          placeholder="Empty"
          value={textValue}
          onValueChange={setTextValue}
          onKeyCommand={onKeyCommand}
        /> */}
      </div>
    </div>
  );
}

const FoldedValue = (props: { value: any }) => {
  return (
    <div className="relative w-full h-[24px] min-w-[300px] overflow-hidden">
      <div className="absolute inset-0 px-1 w-full truncate text-(--cell-fg-muted)">
        {JSON.stringify(props.value, null, 1).slice(0, 1000)}
      </div>
    </div>
  );
};
