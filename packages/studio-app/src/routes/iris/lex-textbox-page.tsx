import { useEffect, useState } from "react";
import { IrisInput } from "zodspy/components/iris-input";
import { LexTextbox } from "zodspy/components/lex-textbox";
import { useFieldSizingContent } from "zodspy/hooks/use-field-sizing-content";
import { classNames } from "../../helpers/clsx";

export const LexTextboxPage = () => {
  const [textValue, setTextValue] = useState("hello, lexical!\nnew line\nanother line");
  useEffect(() => {
    console.log("text value:", textValue);
  }, [textValue]);
  const { textAreaRef } = useFieldSizingContent();
  return (
    <div className="h-dvh w-full overflow-hidden overscroll-contain bg-white">
      <div className="flex flex-col p-4 gap-4">
        <LexTextbox
          className={classNames(
            "bg-zinc-100 box-content p-2.5 py-2 w-fit text-[16px]/[22px]",
            "outline-2 -outline-offset-1 outline-zinc-400 focus:outline-blue-600",
          )}
          value={textValue}
          onValueChange={setTextValue}
        />
        <IrisInput
          className={classNames(
            "bg-zinc-100 box-content p-2.5 py-2 w-fit text-[16px]/[22px]",
            "outline-2 -outline-offset-1 outline-zinc-400 focus:outline-blue-600",
          )}
          value={textValue}
          onValueChange={setTextValue}
          onKeyCommand={(name, event) => {
            console.log("key command:", name, event);
          }}
        />
        <textarea
          ref={textAreaRef}
          className={classNames(
            "bg-zinc-100 box-content p-2.5 py-2 w-fit text-[16px]/[22px]",
            "outline-2 -outline-offset-1 outline-zinc-400 focus:outline-blue-600",
            "resize-none whitespace-pre",
          )}
          value={textValue}
          onChange={(event) => setTextValue(event.target.value)}
        />
      </div>
    </div>
  );
};
