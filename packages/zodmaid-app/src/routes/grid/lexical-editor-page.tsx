import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { type LexicalEditor, ParagraphNode, type SerializedEditorState, TextNode } from "lexical";
import { useEffect, useRef, useState } from "react";
import { useControllableState } from "zodspy/hooks/use-controllable-state";

export const LexicalEditorPage = () => {
  const [editorState, setEditorState] = useState<SerializedEditorState>({
    root: {
      type: "root",
      direction: null,
      format: "",
      indent: 0,
      version: 1,
      children: [
        {
          type: "paragraph",
          direction: null,
          format: "",
          indent: 0,
          version: 1,
          children: [
            {
              type: "text",
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Hello Lexical!",
              version: 1,
            },
          ],
        },
      ],
    },
  });
  useEffect(() => {
    console.log("editor state:", editorState);
  }, [editorState]);

  return (
    <div className="h-dvh w-full overflow-hidden overscroll-contain bg-white p-4">
      <LexicalTextarea editorState={editorState} setEditorState={setEditorState} />
    </div>
  );
};

const LexicalTextarea = (props: {
  editorState?: SerializedEditorState;
  setEditorState?: (value: SerializedEditorState) => void;
}) => {
  const editorRef = useRef<LexicalEditor>(null);
  const [editorState, setEditorState] = useControllableState({
    value: props.editorState,
    onChange: props.setEditorState,
  });
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.registerUpdateListener((payload) => {
        payload.editorState.read(() => {
          setEditorState(payload.editorState.toJSON());
        });
      });
    }
  }, [editorRef]);

  function initialEditorState(editor: LexicalEditor) {
    const state = editor.parseEditorState(editorState);
    editor.setEditorState(state);
    // editor.update(
    //   () => {
    //     const root = $getRoot();
    //     const text = $createTextNode("Hello Lexical!");
    //     const p = $createParagraphNode();
    //     root.clear();
    //     p.append(text);
    //     root.append(p);
    //     console.log("update", root.exportJSON());
    //   },
    //   { tag: "history-merge" },
    // );
  }

  return (
    <LexicalComposer
      initialConfig={{
        namespace: "lexical",
        onError: (error) => {
          throw error;
        },
        editorState(editor) {
          initialEditorState(editor);
        },
        nodes: [TextNode, ParagraphNode],
      }}
    >
      <PlainTextPlugin
        placeholder={null}
        contentEditable={<ContentEditable className="bg-zinc-100 p-4 w-fit" />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <EditorRefPlugin editorRef={editorRef} />
    </LexicalComposer>
  );
};
