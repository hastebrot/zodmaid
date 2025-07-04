import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { action, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { beforeAll, describe, expect, test } from "vitest";
import { MusicLibrary, musicLibraryData } from "../../src/schemas/musicLibrary";
import { registerGlobals } from "../register-globals";
import { registerMatchers } from "../register-matchers";
import { BaseCell, type BaseCellProps } from "./components/base-cell";
import { BaseGrid, type BaseGridProps } from "./components/base-grid";
import { BaseRow, type BaseRowProps } from "./components/base-row";
import type { GridContextProps } from "./components/grid-context";
import { UnstyledGridView } from "./components/unstyled-grid-view";

beforeAll(() => {
  registerGlobals();
  registerMatchers();
});

describe("grid view", () => {
  test("should grid", async () => {
    const data = observable(MusicLibrary.parse(musicLibraryData));
    const TextFixture = observer(() => {
      const { value, onChange } = useInputValue(
        data,
        (data) => String(data.Title),
        (data, value) => (data.Title = String(value)),
      );
      type DataModel = (typeof data)["Artists"][0]["Albums"][0];
      const context: GridContextProps = {
        label: "grid",
        rows: data.Artists[0].Albums,
        columns: [
          { label: "Name", width: "max-content" },
          { label: "ReleaseDate", width: "max-content" },
          { label: "Label", width: "max-content" },
          { label: "Genre", width: "max-content" },
          { label: "Tracks", width: "1fr" },
        ],
        components: {
          Grid: (props: BaseGridProps) => <BaseGrid {...props} />,
          Row: (props: BaseRowProps) => <BaseRow {...props} />,
          Cell: (props: BaseCellProps) => {
            const renderCell = () => {
              const item = props.data.row as DataModel;
              const key = props.data.column.label as keyof DataModel;
              const value = item[key];
              const isJsonArray = Array.isArray(value);
              const isJsonObject = typeof value === "object";
              return isJsonArray || isJsonObject ? JSON.stringify(value) : value;
            };
            return (
              <BaseCell {...props} className="px-2">
                {renderCell()}
              </BaseCell>
            );
          },
        },
      };
      return (
        <div>
          <input type="text" value={value} onChange={action(onChange)} />
          <UnstyledGridView context={context} />
        </div>
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
