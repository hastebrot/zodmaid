import { useControllableState } from "../hooks/use-controllable-state";
import { useFieldSizingContent } from "../hooks/use-field-sizing-content";

export type IrisTextareaProps = {
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onKeyCommand?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

export const IrisTextarea = (props: IrisTextareaProps) => {
  const [inputValue, setInputValue] = useControllableState({
    defaultValue: props.defaultValue,
    value: props.value,
    onChange: props.onValueChange,
  });
  const { textAreaRef } = useFieldSizingContent();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      // event.preventDefault();
      props.onKeyCommand?.(event);
    }
    if (event.key === "Escape") {
      // event.preventDefault();
      props.onKeyCommand?.(event);
    }
    if (event.key === "ArrowUp") {
      // event.preventDefault();
      props.onKeyCommand?.(event);
    }
    if (event.key === "ArrowDown") {
      // event.preventDefault();
      props.onKeyCommand?.(event);
    }
    if (event.target instanceof HTMLTextAreaElement) {
      const value = event.target.value;
      const selectionStart = event.target.selectionStart;
      const selectionEnd = event.target.selectionEnd;
      if (event.key === "ArrowLeft" && selectionStart === 0) {
        // event.preventDefault();
        props.onKeyCommand?.(event);
      }
      if (event.key === "ArrowRight" && selectionEnd === value.length) {
        // event.preventDefault();
        props.onKeyCommand?.(event);
      }
    }
  };

  return (
    <textarea
      ref={textAreaRef}
      className={props.className}
      style={props.style}
      placeholder={props.placeholder}
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};
