import { action, observable } from "mobx";
import { Observer, observer } from "mobx-react-lite";
import { useState } from "react";
import {
  defineGridContext,
  determineJsonType,
  JsonCellLayout,
  JsonGridCellLayout,
  mapJsonToGridRows,
  TetraCell,
  TetraExpandButton,
  TetraGrid,
  TetraGridView,
  TetraJsonTypeButton,
  TetraRow,
  type GridContextProps,
  type JsonArray,
  type JsonDataModel,
  type JsonObject,
} from "zodspy";
import { throwError } from "../../helpers/error";
import { FoldedValue, renderCell } from "./tetra-grid-cell-json";
import { TetraGridViewJsonArray } from "./tetra-grid-view-json-array";
import { TetraGridViewJsonArrayTable } from "./tetra-grid-view-json-array-table";

export const TetraGridViewJsonObject = observer(
  (gridProps: { value: JsonObject; theme?: "light" | "dark" }) => {
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
                          <TetraExpandButton
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
                          <TetraGridViewJsonObject
                            value={value as JsonObject}
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
                    const hasArrayObjects = (value as JsonArray).every(
                      (it) => determineJsonType(it) === "object",
                    );
                    if (hasArrayObjects) {
                      return (
                        <JsonGridCellLayout
                          gridSlot={
                            <TetraGridViewJsonArrayTable
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
                          <TetraGridViewJsonArray
                            value={value as JsonArray}
                            theme={gridProps.theme}
                          />
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
  },
);
