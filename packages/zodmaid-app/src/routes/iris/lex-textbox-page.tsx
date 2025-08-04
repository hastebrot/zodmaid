import { useEffect, useState } from "react";
import { IrisInput } from "zodspy/components/iris-input";
import { IrisTextarea } from "zodspy/components/iris-textarea";
import { LexTextbox } from "zodspy/components/lex-textbox";
import { classNames } from "../../helpers/clsx";
import { useDocumentTitle } from "../../helpers/react";

export const LexTextboxPage = () => {
  useDocumentTitle("iris: textbox");
  const [textValue, setTextValue] = useState("hello, lexical!\nnew line\nanother line");
  useEffect(() => {
    console.log("text value:", textValue);
  }, [textValue]);
  return (
    <div className="h-dvh w-full overflow-hidden overscroll-contain bg-white">
      <div className="flex flex-col p-4 gap-4">
        <LexTextbox
          className={classNames(
            "bg-zinc-100 p-2.5 py-2 text-[16px]/[22px]",
            "outline-2 -outline-offset-1 outline-zinc-400 focus:outline-blue-600",
            "w-fit",
          )}
          value={textValue}
          onValueChange={setTextValue}
        />
        <IrisInput
          className={classNames(
            "bg-zinc-100 p-2.5 py-2 text-[16px]/[22px]",
            "outline-2 -outline-offset-1 outline-zinc-400 focus:outline-blue-600",
            "box-content",
          )}
          placeholder="Empty"
          value={textValue}
          onValueChange={setTextValue}
          onKeyCommand={(event) => {
            console.log("key command:", event.key, event);
          }}
        />
        <IrisTextarea
          className={classNames(
            "bg-zinc-100 p-2.5 py-2 text-[16px]/[22px]",
            "outline-2 -outline-offset-1 outline-zinc-400 focus:outline-blue-600",
            "box-content resize-none whitespace-pre overflow-hidden",
          )}
          placeholder="Empty"
          value={textValue}
          onValueChange={setTextValue}
          onKeyCommand={(event) => {
            console.log("key command:", event.key, event);
          }}
        />
      </div>
    </div>
  );
};
