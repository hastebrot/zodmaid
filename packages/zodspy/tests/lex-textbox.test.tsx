import { fireEvent, render, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import {
  $getRoot,
  $getSelection,
  COMMAND_PRIORITY_HIGH,
  KEY_DOWN_COMMAND,
  type EditorState,
  type LexicalEditor,
} from "lexical";
import { act } from "react";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { LexTextbox } from "../components/lex-textbox";
import { throwError } from "../helpers/error";
import { registerGlobals } from "./register-globals";
import { registerMatchers } from "./register-matchers";

beforeAll(() => {
  registerGlobals();
  registerMatchers();
});

const toLexicalEditorOrThrow = (element: HTMLElement) => {
  type EditorElement = { __lexicalEditor?: LexicalEditor | null };
  return (element as EditorElement).__lexicalEditor ?? throwError("lexical editor not found");
};

describe("lex textbox", () => {
  test("test", async () => {
    // Bug: Keyboard events not registering in content editable with react testing library
    // https://github.com/facebook/lexical/issues/4595

    const onChange = vi.fn();
    const screen = render(<LexTextbox value="text" onValueChange={onChange} />, {
      baseElement: global.document.body,
    });
    const user = userEvent.setup({ document: global.document });

    const textbox = screen.getByRole("textbox");
    const editor = toLexicalEditorOrThrow(textbox);
    editor._headless = false;

    document.addEventListener("selectionchange", () => {
      const selection = document.getSelection();
      console.log("doc select", repr([selection?.focusOffset, selection?.focusNode?.textContent]));
    });
    editor.registerTextContentListener((text) => {
      console.log("lex event", repr(text));
    });
    // await editor.update(() => {
    //   $getRoot().append($createParagraphNode().append($createTextNode("more")));
    // });
    editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => {
        editor.update(
          () => {
            if ($getSelection() === null) {
              // $getRoot().selectEnd();
              // $selectAll();
            }
            if (event.key === "ArrowUp") {
              return;
            }
            if (event.key === "ArrowLeft") {
              return;
            }
            if (event.key === "ArrowRight") {
              return;
            }
            if (event.key === "Enter") {
              return;
            }
            // $getSelection()?.insertText(event.key);
          },
          // { discrete: true },
        );
        return false;
      },
      COMMAND_PRIORITY_HIGH,
    );
    // editor.registerCommand(
    //   KEY_ENTER_COMMAND,
    //   () => {
    //     console.log("enter");
    //     return false;
    //   },
    //   COMMAND_PRIORITY_HIGH,
    // );
    await user.click(textbox);
    // await user.keyboard("{Enter}");
    await user.type(textbox, "1"); // "1I"
    fireEvent.input(textbox, { data: "1" });
    await user.keyboard("2"); // "12I"
    fireEvent.input(textbox, { data: "2" });
    await user.keyboard("3"); // "123I"
    fireEvent.input(textbox, { data: "3" });
    await user.keyboard("{ArrowLeft}{Enter}"); // "12\nI3"
    await user.keyboard("xx"); // "12\nxxI3"
    await user.keyboard("{ArrowLeft}yy"); // "12\nxyyIx3"

    await waitFor(() => Promise.resolve());
    await act(async () => await editor.update(() => {}));

    console.log("lex state", reprEditorState(editor.getEditorState()));
    console.log("lex elem", reprEditorElem(textbox));
    // screen.debug();

    // expect(onChange).toHaveBeenCalledTimes(8);
    expect(onChange).toHaveBeenLastCalledWith("text12xyyx3\nxxyy");
  });
});

const reprEditorElem = (editorElem: HTMLElement) => {
  return reprObject({
    text: editorElem.textContent,
    html: editorElem.outerHTML,
  });
};

const reprEditorState = (editorState: EditorState) => {
  const nodeMap = editorState._nodeMap
    .values()
    .toArray()
    .map((node) => Object.assign({}, node));
  return reprObject({
    text: editorState.read(() => $getRoot().getTextContent()),
    json: editorState.toJSON(),
    nodeMap: nodeMap,
  });
};

const repr = (value: any) => {
  return Bun.inspect(value, { compact: true, colors: true });
};

const reprObject = (object: Record<string, any>) => {
  const items = [];
  for (const key in object) {
    items.push({ key, val: repr(object[key]) });
  }
  return "{\n" + items.map((it) => `  ${it.key}: ${it.val},\n`).join("") + "}";
};
