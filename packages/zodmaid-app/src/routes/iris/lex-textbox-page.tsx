import { useEffect, useState } from "react";
import { IrisInput } from "zodspy/components/iris-input";
import { LexTextbox } from "zodspy/components/lex-textbox";
import { classNames } from "../../helpers/clsx";

export const LexTextboxPage = () => {
  const [inputValue, setInputValue] = useState("hello, lexical!\nline feed");
  useEffect(() => {
    console.log("input value:", inputValue);
  }, [inputValue]);

  return (
    <div className="h-dvh w-full overflow-hidden overscroll-contain bg-white">
      <div className="flex flex-col p-4 gap-4">
        <LexTextbox
          className={classNames(
            "bg-zinc-100 box-content p-2.5 py-2 w-fit text-[16px]/[22px]",
            "outline-2 -outline-offset-1 outline-zinc-400 focus:outline-blue-600",
          )}
          value={inputValue}
          onValueChange={setInputValue}
        />
        <IrisInput
          className={classNames(
            "bg-zinc-100 box-content p-2.5 py-2 w-fit text-[16px]/[22px]",
            "outline-2 -outline-offset-1 outline-zinc-400 focus:outline-blue-600",
          )}
          value={inputValue}
          onValueChange={setInputValue}
          onKeyCommand={(name, event) => {
            console.log("key command:", name, event);
          }}
        />
      </div>
    </div>
  );
};
