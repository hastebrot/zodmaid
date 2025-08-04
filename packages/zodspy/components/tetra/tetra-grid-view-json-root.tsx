import { action, observable } from "mobx";
import { Observer, observer } from "mobx-react-lite";
import { useState } from "react";
import {
  defineGridContext,
  JsonCellLayout,
  JsonGridCellLayout,
  TetraCell,
  TetraExpandButton,
  TetraGrid,
  TetraGridView,
  TetraJsonTypeButton,
  TetraRow,
  type GridContextProps,
  type JsonDataModel,
  type JsonObject,
} from "zodspy";
import { throwError } from "../../helpers/error";
import { FoldedValue } from "./tetra-grid-cell-json";
import { TetraGridViewJsonObject } from "./tetra-grid-view-json-object";

export const TetraGridViewJsonRoot = observer(
  (gridProps: { value: JsonObject; theme?: "light" | "dark" }) => {
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
                      <TetraExpandButton
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
                          <TetraGridViewJsonObject
                            value={gridProps.value}
                            theme={gridProps.theme}
                          />
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
  },
);
