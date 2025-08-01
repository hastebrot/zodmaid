import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { IrisInput } from "../components/iris-input";
import { registerGlobals } from "./register-globals";
import { registerMatchers } from "./register-matchers";

beforeAll(() => {
  registerGlobals();
  registerMatchers();
});

describe("iris input", () => {
  test("test", async () => {
    const onChange = vi.fn();
    const screen = render(
      <IrisInput
        defaultValue="text"
        onValueChange={onChange}
        onKeyCommand={(event) => console.log(event.key)}
      />,
      {
        baseElement: global.document.body,
      },
    );
    const user = userEvent.setup({ document: global.document });

    const textbox = screen.getByRole("textbox");
    document.addEventListener("selectionchange", () => {
      const selection = document.getSelection();
      console.log("doc select", [selection?.focusOffset, selection?.focusNode?.textContent]);
    });

    await user.click(textbox);
    await user.keyboard("abc");
    await user.keyboard("{Enter}");

    expect(onChange).toHaveBeenLastCalledWith("textabc");

    screen.debug();
  });
});
