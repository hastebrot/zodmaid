import { observable } from "mobx";
import { useState } from "react";
import {
  defineGridContext,
  JsonGridCellLayout,
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
import { classNames } from "../../helpers/clsx";
import { renderCell } from "./tetra-grid-cell-json";
import { TetraGridViewJsonArray } from "./tetra-grid-view-json-array";
import { TetraGridViewJsonObject } from "./tetra-grid-view-json-object";

export const TetraGridViewJsonArrayTable = (gridProps: {
  value: JsonArray;
  theme?: "light" | "dark";
}) => {
  type DataModel = JsonDataModel[];
  const [rows] = useState(() => observable(mapJsonToTableRows(gridProps.value)));
  const columns: GridColumn<DataModel>[] = rows[0]!.map((column, columnIndex) => {
    const lastColumnIndex = rows[0]!.length - 1;
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
          const type = rows[0]![columnIndex]!.type;
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
              gridSlot={
                <TetraGridViewJsonObject value={value as JsonObject} theme={gridProps.theme} />
              }
            />
          );
        }
        if (type === "array") {
          return (
            <JsonGridCellLayout
              gridSlot={
                <TetraGridViewJsonArray value={value as JsonArray} theme={gridProps.theme} />
              }
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
