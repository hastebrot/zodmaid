import type { GridContextProps } from "./grid-context";
import { GridView } from "./grid-view";

export type UnstyledGridViewWithHeadersProps = {
  context: GridContextProps;
};

export const UnstyledGridViewWithHeaders = (props: UnstyledGridViewWithHeadersProps) => {
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
        {/* header. */}
        <context.components.Row
          // props.
          label={`row[${0}]`}
          data={{ type: "row", rowIndex: 0, row: {} }}
        >
          {context.columns.map((column, columnIndex) => (
            <context.components.Cell
              // props.
              key={columnIndex}
              label={`cell[${0}][${columnIndex}]`}
              data={{ type: "header-cell", rowIndex: 0, columnIndex, row: {}, column }}
            />
          ))}
        </context.components.Row>
        {/* body. */}
        {context.rows.map((row, rowIndex) => (
          <context.components.Row
            // props.
            key={rowIndex + 1}
            label={`row[${rowIndex + 1}]`}
            data={{ type: "row", rowIndex: rowIndex + 1, row }}
          >
            {context.columns.map((column, columnIndex) => (
              <context.components.Cell
                // props.
                key={columnIndex}
                label={`cell[${rowIndex + 1}][${columnIndex}]`}
                data={{ type: "cell", rowIndex: rowIndex + 1, columnIndex, row, column }}
              />
            ))}
          </context.components.Row>
        ))}
      </context.components.Grid>
    </GridView>
  );
};
