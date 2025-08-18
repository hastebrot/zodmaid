import { cleanup, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { action, computed, get, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { act } from "react";
import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { registerGlobals } from "./register-globals";
import { registerMatchers } from "./register-matchers";

export const flush = () => act(() => Promise.resolve());
export const flushTimer = () => act(() => new Promise((resolve) => setTimeout(resolve)));

beforeAll(() => {
  registerGlobals();
  registerMatchers();
});

beforeEach(() => {
  cleanup();
});

describe("grid view context", () => {
  test("should", async () => {
    const o = observable.object({ foo: "bar" });
    console.log("o", get(o, "foo"));
    const m = observable.map<string, string>();
    m.set("foo", "bar");
    console.log("m", m.get("foo"));

    const data = observable({ input: "a", select: "a" });
    const TextFixture = observer(() => {
      console.log("render", data.input, computed(() => data.select === "a").get());
      const { value, onChange } = withInputValue(
        data,
        (data) => String(data.input),
        (data, value) => (data.input = String(value)),
      );
      return (
        <div>
          <input aria-label="input" type="text" value={value} onChange={action(onChange)} />
        </div>
      );
    });
    const screen = render(<TextFixture />, { baseElement: global.document.body });
    const user = userEvent.setup({ document: global.document });

    const input = screen.getByRole("textbox", { name: "input" });
    action(() => (data.input = "a"))();
    await flush();
    action(() => (data.input = "a"))();
    await flush();
    // await user.click(input);
    // await user.clear(input);
    await user.type(input, "b");
    expect(data.input).toBe("ab");

    action(() => (data.select = "a"))();
    await flush();
    action(() => (data.select = "b"))();
    await flush();
    action(() => (data.select = "c"))();
    await flush();
    action(() => (data.select = "a"))();
    await flush();

    // screen.debug();
  });
});

const withInputValue = <T extends object>(
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
