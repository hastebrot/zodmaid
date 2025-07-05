import { type GridContextProps } from "./grid-context";
import { GridView } from "./grid-view";

const Default = (props: UnstyledGridViewProps) => {
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
        {/* body. */}
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

const WithHeader = (props: UnstyledGridViewProps) => {
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
          data={{ type: "row", rowIndex: 0, row: null }}
        >
          {context.columns.map((column, columnIndex) => (
            <context.components.Cell
              // props.
              key={columnIndex}
              label={`cell[${0}][${columnIndex}]`}
              data={{ type: "header-cell", rowIndex: 0, columnIndex, row: null, column }}
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

const WithHeaderAndLabels = (props: UnstyledGridViewProps) => {
  const context = props.context;
  const rowCount = context.rows.length + 2;
  const columnCount = context.columns.length + 1;

  return (
    <GridView
      context={{
        ...context,
        toGridTemplateColumns(columns) {
          return ["auto", ...columns.map((column) => column.width)].join(" ");
        },
      }}
    >
      <context.components.Grid
        // props.
        label="grid"
        data={{ type: "grid", rowCount, columnCount }}
      >
        {/* labels. */}
        <context.components.Row
          // props.
          label={`row[${0}]`}
          data={{ type: "row", rowIndex: 0, row: null }}
        >
          <context.components.Cell
            // props.
            key={0}
            label={`cell[${0}][${0}]`}
            data={{
              type: "label-cell",
              rowIndex: 0,
              columnIndex: 0,
              row: null,
              column: null,
            }}
          />
          {context.columns.map((column, columnIndex) => (
            <context.components.Cell
              // props.
              key={columnIndex + 1}
              label={`cell[${0}][${columnIndex + 1}]`}
              data={{
                type: "label-cell",
                rowIndex: 0,
                columnIndex: columnIndex + 1,
                row: null,
                column,
              }}
            />
          ))}
        </context.components.Row>
        {/* header. */}
        <context.components.Row
          // props.
          label={`row[${1}]`}
          data={{ type: "row", rowIndex: 1, row: null }}
        >
          <context.components.Cell
            // props.
            key={0}
            label={`cell[${1}][${0}]`}
            data={{
              type: "label-cell",
              rowIndex: 1,
              columnIndex: 0,
              row: null,
              column: null,
            }}
          />
          {context.columns.map((column, columnIndex) => (
            <context.components.Cell
              // props.
              key={columnIndex + 1}
              label={`cell[${1}][${columnIndex + 1}]`}
              data={{
                type: "header-cell",
                rowIndex: 1,
                columnIndex: columnIndex + 1,
                row: null,
                column,
              }}
            />
          ))}
        </context.components.Row>
        {/* body. */}
        {context.rows.map((row, rowIndex) => (
          <context.components.Row
            // props.
            key={rowIndex + 1}
            label={`row[${rowIndex + 2}]`}
            data={{ type: "row", rowIndex: rowIndex + 2, row }}
          >
            <context.components.Cell
              // props.
              key={0}
              label={`cell[${rowIndex + 2}][${0}]`}
              data={{
                type: "label-cell",
                rowIndex: rowIndex + 2,
                columnIndex: 0,
                row,
                column: null,
              }}
            />
            {context.columns.map((column, columnIndex) => (
              <context.components.Cell
                // props.
                key={columnIndex + 1}
                label={`cell[${rowIndex + 2}][${columnIndex + 1}]`}
                data={{
                  type: "cell",
                  rowIndex: rowIndex + 2,
                  columnIndex: columnIndex + 1,
                  row,
                  column,
                }}
              />
            ))}
          </context.components.Row>
        ))}
      </context.components.Grid>
    </GridView>
  );
};

export type UnstyledGridViewProps = {
  context: GridContextProps;
};

export const UnstyledGridView = Object.assign(Default, {
  WithHeader,
  WithHeaderAndLabels,
});
