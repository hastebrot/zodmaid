import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { action, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { createContext, useContext } from "react";
import { beforeAll, describe, expect, test } from "vitest";
import { MusicLibrary, musicLibraryData } from "../../src/schemas/musicLibrary";
import { registerGlobals } from "../register-globals";
import { registerMatchers } from "../register-matchers";

beforeAll(() => {
  registerGlobals();
  registerMatchers();
});

describe("grid view", () => {
  test("should grid", async () => {
    type ColumnSpec<DataModel> = {
      name: keyof DataModel;
      widthSpec: string;
    };
    type GridContextProps<DataModel = unknown> = {
      name?: string;
      rows: DataModel[];
      columns: ColumnSpec<DataModel>[];
    };
    const GridContext = createContext<GridContextProps | null>(null);
    const useGridContext = () => {
      const value = useContext(GridContext);
      if (value === null) {
        throw new Error("GridContext value is empty");
      }
      return value;
    };
    const GridView = <DataModel,>(props: {
      // wrap.
      children?: React.ReactNode;
      value: GridContextProps<DataModel>;
    }) => {
      return (
        <GridContext.Provider value={props.value as GridContextProps}>
          {props.children}
        </GridContext.Provider>
      );
    };
    const Grid = (props: { children?: React.ReactNode; type?: string }) => {
      const contextProps = useGridContext();
      const columnSpecs = contextProps.columns.map((it) => it.widthSpec).join(" ");
      return (
        <div
          className="grid"
          aria-label={contextProps.name}
          style={{ gridTemplateColumns: columnSpecs }}
        >
          {props.children}
        </div>
      );
    };
    const Row = (props: {
      children?: React.ReactNode;
      type?: string;
      data: {
        rowIndex: number;
      };
    }) => {
      return <div className="contents">{props.children}</div>;
    };
    const Cell = (props: {
      type?: string;
      data: {
        rowIndex: number;
        columnIndex: number;
        renderCell: () => React.ReactNode;
      };
    }) => {
      return <div style={{ gridColumn: props.data.columnIndex }}>{props.data.renderCell()}</div>;
    };
    const data = observable(MusicLibrary.parse(musicLibraryData));
    const TextFixture = observer(() => {
      const { value, onChange } = useInputValue(
        data,
        (data) => String(data.Title),
        (data, value) => (data.Title = String(value)),
      );
      const gridView: GridContextProps<(typeof data)["Artists"][0]["Albums"][0]> = {
        name: "grid",
        rows: data.Artists[0].Albums,
        columns: [
          { name: "Name", widthSpec: "max-content" },
          { name: "ReleaseDate", widthSpec: "max-content" },
        ],
      };
      return (
        <GridView value={gridView}>
          <input type="text" value={value} onChange={action(onChange)} />
          <Grid type="grid">
            {gridView.rows.map((row, rowIndex) => (
              <Row key={rowIndex} type="row" data={{ rowIndex }}>
                {gridView.columns.map((column, columnIndex) => (
                  <Cell
                    key={columnIndex}
                    type="cell"
                    data={{
                      rowIndex,
                      columnIndex,
                      renderCell: () => <>{row[column.name]}</>,
                    }}
                  />
                ))}
              </Row>
            ))}
          </Grid>
        </GridView>
      );
    });
    const screen = render(<TextFixture />, { baseElement: global.document.body });
    const user = userEvent.setup({ document: global.document });

    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.clear(input);
    await user.type(input, "test");
    expect(data.Title).toBe("test");

    screen.debug();
  });
});

const useInputValue = <T extends object>(
  data: T,
  readValue: (data: T) => string,
  writeValue: (data: T, value: string) => void,
) => {
  const value = readValue(data);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    writeValue(data, event.target.value);
  };
  return { value, onChange };
};
