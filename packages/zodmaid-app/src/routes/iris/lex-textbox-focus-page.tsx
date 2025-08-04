import { action, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { Fragment, useRef, useState } from "react";
import { IrisInput } from "zodspy/components/iris-input";
import { classNames } from "../../helpers/clsx";
import { throwError } from "../../helpers/error";
import { useDocumentTitle } from "../../helpers/react";

export const LexTextboxFocusPage = () => {
  useDocumentTitle("iris: textbox focus");
  const ref = useRef<HTMLDivElement>(null);
  const [items1] = useState(() => [
    { value: "Lorem" },
    { value: "Text 1 Lorem" },
    { value: "Text 2 Lore" },
    { value: "Text 3 Lor" },
  ]);
  const [items2] = useState(() => [
    { value: "Ipsum" },
    { value: "Text 1 Ipsum" },
    { value: "Text 2 Ipsu" },
    { value: "Text 3 Ips" },
  ]);
  const [items3] = useState(() => [
    { value: "Dolor" },
    { value: "Text 1 Dolor" },
    { value: "Text 2 Dolo" },
    { value: "Text 3 Dol" },
  ]);
  const onKeyCommand = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const currentInput = event.currentTarget;
    const index = currentInput.parentElement?.dataset.index?.split("-") ?? throwError("no index");
    const colIndex = Number(index[0]);
    const rowIndex = Number(index[1]);
    const range = SelectionRangeUtils.get(currentInput);

    if (event.key === "ArrowUp") {
      const input = ref.current?.querySelector(
        `div[data-index="${colIndex}-${rowIndex - 1}"] > input`,
      );
      if (input instanceof HTMLInputElement) {
        input.focus();
        SelectionRangeUtils.set(input, range);
      }
    }
    if (event.key === "ArrowDown") {
      const input = ref.current?.querySelector(
        `div[data-index="${colIndex}-${rowIndex + 1}"] > input`,
      );
      if (input instanceof HTMLInputElement) {
        input.focus();
        SelectionRangeUtils.set(input, range);
      }
    }
    if (event.key === "ArrowLeft") {
      const input = ref.current?.querySelector(
        `div[data-index="${colIndex - 1}-${rowIndex}"] > input`,
      );
      if (input instanceof HTMLInputElement) {
        input.focus();
        SelectionRangeUtils.set(input, { ...range, start: input.size - 1, end: input.size - 1 });
      }
    }
    if (event.key === "ArrowRight") {
      const input = ref.current?.querySelector(
        `div[data-index="${colIndex + 1}-${rowIndex}"] > input`,
      );
      if (input instanceof HTMLInputElement) {
        input.focus();
        SelectionRangeUtils.set(input, { ...range, start: 0, end: 0 });
      }
    }
    // console.log("key command:", event.key);
  };

  return (
    <div ref={ref} className="h-dvh w-full overflow-hidden overscroll-contain bg-white">
      <div className="flex flex-row gap-4 p-4">
        <div className="flex flex-col gap-4 p-4 border-2 border-zinc-400">
          <Items columnIndex={0} items={items1} onKeyCommand={onKeyCommand} />
        </div>
        <div className="flex flex-col gap-4 p-4 border-2 border-zinc-400">
          <Items columnIndex={1} items={items2} onKeyCommand={onKeyCommand} />
        </div>
        <div className="flex flex-col gap-4 p-4 border-2 border-zinc-400">
          <Items columnIndex={2} items={items3} onKeyCommand={onKeyCommand} />
        </div>
      </div>
    </div>
  );
};

type SelectionRange = {
  start: number | null;
  end: number | null;
  direction: "forward" | "backward" | "none" | null;
};

const SelectionRangeUtils = {
  get(input: HTMLInputElement): SelectionRange {
    return {
      start: input.selectionStart,
      end: input.selectionEnd,
      direction: input.selectionDirection,
    };
  },
  set(input: HTMLInputElement, range: SelectionRange) {
    if (range.start === null) return;
    if (range.direction === null) return;
    input.setSelectionRange(range.start, range.end, range.direction);
  },
};

type ItemsProps = {
  columnIndex: number;
  items: { value: string }[];
  onKeyCommand: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Items = observer((props: ItemsProps) => {
  const [items] = useState(() => observable(props.items));

  return (
    <Fragment>
      {items.map((item, index) => {
        return (
          <div key={index} data-index={`${props.columnIndex}-${index}`}>
            <IrisInput
              className={classNames(
                "bg-zinc-100 p-2.5 py-2 text-[16px]/[22px]",
                "outline-2 -outline-offset-1 outline-zinc-400 focus:outline-blue-600",
                "box-content _min-w-[120px]",
              )}
              placeholder="Empty"
              value={item.value}
              onValueChange={action((value) => (item.value = value))}
              onKeyCommand={props.onKeyCommand}
            />
          </div>
        );
      })}
    </Fragment>
  );
});

// selection
// - we have a grid cell
// - on click, the cell becomes selected
//   - on enter, the cell input becomes focused
//   - on escape, the cell input looses focus
// - on click the cell contains cell text
//   - on enter, the cell text is replaced by the cell input
//   - on escape, the cell input is replaced by the cell text

// navigation
// - we have a grid context
// - we have useGridContext() hook
// - we have useGridNavigation() hook. it uses an effect that registers
//   the cell coordinates and unregisters them when the component unmounts
// - we have a grid with subgrids. each subgrid knows the parent grid coordinates
// - we use the grid context to store the last cell coordinates
// - on arrow left or right, the last cell coordinate x is updated
// - on arrow up or down, the last cell coordinate y is updated

// type Position = { grid: string; row: number; col: number; }
