import { action, observable } from "mobx";
import { Observer, observer } from "mobx-react-lite";
import { useState } from "react";
import {
  defineGridContext,
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
import { TetraGridViewJsonObject } from "./tetra-grid-view-json-object";

export const TetraGridViewJsonArray = observer(
  (gridProps: { value: JsonArray; theme?: "light" | "dark" }) => {
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
                          <TetraGridViewJsonObject
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
                          <TetraGridViewJsonArray
                            value={row.value as JsonArray}
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
  },
);
