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

describe("grid view", () => {
  test("should grid", async () => {
    type ColumnSpec<DataModel> = {
      name: keyof DataModel;
      widthSpec: string;
    };
    type GridContextProps<DataModel> = {
      columns: ColumnSpec<DataModel>[];
    };
    const GridContext = createContext<GridContextProps<unknown> | null>(null);
    const useGridContext = () => {
      const value = useContext(GridContext);
      if (value === null) {
        throw new Error("GridContext value is empty");
      }
      return value;
    };
    const Grid = (props: { children?: React.ReactNode }) => {
      const { columns } = useGridContext();
      const columnSpecs = columns.map((it) => it.widthSpec).join(" ");
      return (
        <div className="grid" style={{ gridTemplateColumns: columnSpecs }}>
          {props.children}
        </div>
      );
    };
    const Row = (props: {
      // wrap.
      children?: React.ReactNode;
      data: { rowIndex: number };
    }) => {
      return <div className="contents">{props.children}</div>;
    };
    const Cell = (props: {
      // wrap.
      children?: React.ReactNode;
      data: { rowIndex: number; columnIndex: number };
    }) => {
      return <div style={{ gridColumn: props.data.columnIndex }}>{props.children}</div>;
    };
    const data = observable(MusicLibrary.parse(musicLibraryData));
    const TextFixture = observer(() => {
      const rows = data.Artists[0].Albums;
      type ItemType = (typeof rows)[0];
      const { value, onChange } = useInputValue(
        data,
        (data) => data.Title,
        (data, value) => (data.Title = value),
      );
      const columns: ColumnSpec<ItemType>[] = [
        // wrap.
        { name: "Name", widthSpec: "max-content" },
        { name: "ReleaseDate", widthSpec: "max-content" },
      ];
      return (
        <GridContext value={{ columns } as GridContextProps<unknown>}>
          <input type="text" value={value} onChange={action(onChange)} />
          <Grid>
            {rows.map((row, rowIndex) => (
              <Row key={rowIndex} data={{ rowIndex }}>
                {columns.map((column, columnIndex) => (
                  <Cell key={columnIndex} data={{ rowIndex, columnIndex }} />
                ))}
              </Row>
            ))}
          </Grid>
        </GridContext>
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
