import { cleanup, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import { IrisInput } from "../components/iris-input";
import { registerGlobals } from "./register-globals";
import { registerMatchers } from "./register-matchers";

beforeAll(() => {
  registerGlobals();
  registerMatchers();
});

beforeEach(() => {
  cleanup();
});

describe("iris input", () => {
  test("style", async () => {
    // given:
    const onValueChange = vi.fn();
    const onKeyCommand = vi.fn();
    const screen = render(
      <IrisInput defaultValue="text" onValueChange={onValueChange} onKeyCommand={onKeyCommand} />,
      { baseElement: global.document.body },
    );
    const textbox = screen.getByRole("textbox") as HTMLInputElement;

    // when/then:
    expect(textbox.style.width).toBe("0px");
    expect(textbox.style.height).toBe("0px");
  });

  test("value, on value change", async () => {
    // given:
    const onValueChange = vi.fn();
    const onKeyCommand = vi.fn();
    const screen = render(
      <IrisInput defaultValue="text" onValueChange={onValueChange} onKeyCommand={onKeyCommand} />,
      { baseElement: global.document.body },
    );
    const user = userEvent.setup({ document: global.document });
    const textbox = screen.getByRole("textbox") as HTMLInputElement;

    // when/then:
    expect(textbox.value).toBe("text");

    // when/then:
    await user.click(textbox);
    await user.keyboard("abc");
    expect(onValueChange).lastCalledWith("textabc");
    expect(textbox.value).toBe("textabc");
  });

  test("selection start, end", async () => {
    // given:
    const onValueChange = vi.fn();
    const onKeyCommand = vi.fn();
    const screen = render(
      <IrisInput defaultValue="text" onValueChange={onValueChange} onKeyCommand={onKeyCommand} />,
      { baseElement: global.document.body },
    );
    const user = userEvent.setup({ document: global.document });
    const textbox = screen.getByRole("textbox") as HTMLInputElement;

    // when/then:
    await user.click(textbox);
    await user.keyboard("abc");
    expect(textbox.selectionStart).toBe(7);
    expect(textbox.selectionEnd).toBe(7);

    // when/then:
    await user.keyboard("{ArrowLeft}");
    expect(textbox.selectionStart).toBe(6);
    expect(textbox.selectionEnd).toBe(6);
    await user.keyboard("{ArrowRight}");
    expect(textbox.selectionStart).toBe(7);
    expect(textbox.selectionEnd).toBe(7);

    textbox.setSelectionRange(0, 0);
    const selection = document.getSelection();
    console.log(selection?.focusNode);
    console.log(selection?.focusOffset);
  });

  test("key command", async () => {
    // given:
    const onValueChange = vi.fn();
    const onKeyCommand = vi.fn((event) => onKeyCommand_eventKey(event.key));
    const onKeyCommand_eventKey = vi.fn();
    const screen = render(
      <IrisInput defaultValue="text" onValueChange={onValueChange} onKeyCommand={onKeyCommand} />,
      { baseElement: global.document.body },
    );
    const user = userEvent.setup({ document: global.document });
    const textbox = screen.getByRole("textbox") as HTMLInputElement;

    // when/then:
    await user.click(textbox);
    await user.keyboard("{Enter}");
    expect(onKeyCommand_eventKey).lastCalledWith("Enter");
    await user.keyboard("{Escape}");
    expect(onKeyCommand_eventKey).lastCalledWith("Escape");
  });
});
