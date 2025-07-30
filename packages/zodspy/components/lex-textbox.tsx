import { createEmptyHistoryState, registerHistory } from "@lexical/history";
import { registerPlainText } from "@lexical/plain-text";
import { mergeRegister } from "@lexical/utils";
import {
  $createLineBreakNode,
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  COMMAND_PRIORITY_HIGH,
  createEditor,
  HISTORY_MERGE_TAG,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  LineBreakNode,
  ParagraphNode,
  TextNode,
  type LexicalEditor,
} from "lexical";
import { useLayoutEffect, useMemo, useRef, type CSSProperties, type Ref } from "react";
import { useControllableState } from "../hooks/use-controllable-state";

export type LexTextboxProps = {
  className?: string;
  style?: CSSProperties;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

export const LexTextbox = (props: LexTextboxProps) => {
  const [inputValue, setInputValue] = useControllableState({
    defaultValue: props.defaultValue,
    value: props.value,
    onChange: props.onValueChange,
  });
  const rootElementRef = useRef<HTMLDivElement>(null);
  const historyState = useMemo(() => {
    return createEmptyHistoryState();
  }, []);
  const lexicalEditor = useMemo(() => {
    return createEditor({
      editable: true,
      nodes: [ParagraphNode, TextNode, LineBreakNode],
      onError: (error) => {
        throw error;
      },
    });
  }, []);
  const registerEditorPlugins = (editor: LexicalEditor) => {
    return mergeRegister(
      registerPlainText(editor),
      registerHistory(editor, historyState, /* delayMillis */ 1000),
    );
  };
  const registerEditorCommands = (editor: LexicalEditor) => {
    return mergeRegister(
      editor.registerCommand<KeyboardEvent>(
        KEY_ENTER_COMMAND,
        (event) => {
          // event.preventDefault();
          return false;
        },
        COMMAND_PRIORITY_HIGH,
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ESCAPE_COMMAND,
        (event) => {
          // event.preventDefault();
          return false;
        },
        COMMAND_PRIORITY_HIGH,
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ARROW_UP_COMMAND,
        (event) => {
          // event.preventDefault();
          return false;
        },
        COMMAND_PRIORITY_HIGH,
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ARROW_DOWN_COMMAND,
        (event) => {
          // event.preventDefault();
          return false;
        },
        COMMAND_PRIORITY_HIGH,
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ARROW_LEFT_COMMAND,
        (event) => {
          // event.preventDefault();
          return false;
        },
        COMMAND_PRIORITY_HIGH,
      ),
      editor.registerCommand<KeyboardEvent>(
        KEY_ARROW_RIGHT_COMMAND,
        (event) => {
          // event.preventDefault();
          return false;
        },
        COMMAND_PRIORITY_HIGH,
      ),
    );
  };
  const $setTextContent = (value: string) => {
    const root = $getRoot();
    const node = $createParagraphNode();
    const lines = value.split(/\n|\r\n/);
    for (const line of lines.slice(0, 1)) {
      node.append($createTextNode(line));
    }
    for (const line of lines.slice(1)) {
      node.append($createLineBreakNode());
      node.append($createTextNode(line));
    }
    root.clear().append(node);
  };
  useLayoutEffect(() => {
    const rootElement = rootElementRef.current ?? null;
    lexicalEditor.setRootElement(rootElement);
    lexicalEditor.update(
      () => {
        $setTextContent(inputValue);
      },
      { tag: HISTORY_MERGE_TAG },
    );
    return mergeRegister(
      registerEditorPlugins(lexicalEditor),
      registerEditorCommands(lexicalEditor),
      lexicalEditor.registerTextContentListener((value) => {
        setInputValue(value);
      }),
    );
  }, [rootElementRef]);
  // useEffect(() => {
  //   type LexicalEditorElement = { __lexicalEditor?: LexicalEditor | null };
  //   const rootElement = rootElementRef.current as LexicalEditorElement | null;
  //   if (rootElement !== null) {
  //     rootElement.__lexicalEditor = lexicalEditor;
  //     return () => {
  //       rootElement.__lexicalEditor = null;
  //     };
  //   }
  // }, [rootElementRef, lexicalEditor]);

  return (
    <LexContentEditable ref={rootElementRef} className={props.className} style={props.style} />
  );
};

type LexContentEditableProps = {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  style?: CSSProperties;
};

const LexContentEditable = (props: LexContentEditableProps) => {
  return (
    <div
      ref={props.ref}
      className={props.className}
      style={props.style}
      contentEditable
      role="textbox"
      tabIndex={-1}
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck="false"
    />
  );
};
