import { useControllableState } from "../hooks/use-controllable-state";
import { useInputFieldSizing } from "../hooks/use-input-field-sizing";

export type IrisInputProps = {
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onKeyCommand?: (name: string, event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const IrisInput = (props: IrisInputProps) => {
  const [inputValue, setInputValue] = useControllableState({
    defaultValue: props.defaultValue,
    value: props.value,
    onChange: props.onValueChange,
  });
  const { inputRef } = useInputFieldSizing();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      props.onKeyCommand?.("Enter", event);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      props.onKeyCommand?.("Escape", event);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      props.onKeyCommand?.("ArrowUp", event);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      props.onKeyCommand?.("ArrowDown", event);
    }
    if (event.target instanceof HTMLInputElement) {
      const value = event.target.value;
      const selectionStart = event.target.selectionStart;
      const selectionEnd = event.target.selectionEnd;
      if (event.key === "ArrowLeft" && selectionStart === 0) {
        event.preventDefault();
        props.onKeyCommand?.("ArrowLeft", event);
      }
      if (event.key === "ArrowRight" && selectionEnd === value.length) {
        event.preventDefault();
        props.onKeyCommand?.("ArrowRight", event);
      }
    }
  };

  return (
    <input
      ref={inputRef}
      className={props.className}
      style={props.style}
      placeholder={props.placeholder}
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};
