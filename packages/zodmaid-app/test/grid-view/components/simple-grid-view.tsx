import type { GridContextProps } from "./grid-context";
import { GridView } from "./grid-view";

export type SimpleGridViewProps = {
  context: GridContextProps;
};

export const SimpleGridView = (props: SimpleGridViewProps) => {
  const context = props.context;
  const rowCount = context.rows.length;
  const columnCount = context.columns.length;

  return (
    <GridView context={context}>
      <context.components.Grid
        // props.
        label="grid"
        data={{ type: "grid", rowCount, columnCount }}
      >
        {context.rows.map((row, rowIndex) => (
          <context.components.Row
            // props.
            key={rowIndex}
            label={`row[${rowIndex}]`}
            data={{ type: "row", rowIndex, row }}
          >
            {context.columns.map((column, columnIndex) => (
              <context.components.Cell
                // props.
                key={columnIndex}
                label={`cell[${rowIndex}][${columnIndex}]`}
                data={{ type: "cell", rowIndex, columnIndex, row, column }}
              />
            ))}
          </context.components.Row>
        ))}
      </context.components.Grid>
    </GridView>
  );
};
