import { useDocumentTitle } from "../../helpers/react";
import { useFieldSizingInput } from "./input-field-sizing/use-field-sizing-input";
import { useFieldSizingTextarea } from "./input-field-sizing/use-field-sizing-textarea";

export const InputFieldSizingPage = () => {
  useDocumentTitle("iris: input field sizing");
  const { inputRef } = useFieldSizingInput();
  const { textareaRef } = useFieldSizingTextarea();

  return (
    <div className="p-4 grid justify-start gap-2 max-w-[400px]">
      <input
        ref={inputRef}
        placeholder="Placeholder"
        className="box-content p-1 w-auto outline-2 outline-blue-500"
      />

      <textarea
        ref={textareaRef}
        placeholder="Placeholder"
        rows={1}
        className="box-content p-1 min-w-[200px] max-w-[200px] w-auto resize-none outline-2 outline-blue-500"
      />
    </div>
  );
};
