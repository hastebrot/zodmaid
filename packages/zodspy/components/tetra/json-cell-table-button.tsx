import { useState } from "react";
import { classNames } from "../../helpers/clsx";

export type JsonCellTableButtonProps = {
  isSelected?: boolean;
};

export const JsonCellTableButton = (props: JsonCellTableButtonProps) => {
  const [isSelected, setSelected] = useState(props.isSelected);

  return (
    <button
      type="button"
      className={classNames(
        "mx-[2px] w-fit h-fit",
        "outline-(--color-gray-500) outline-offset-0",
        "hover:bg-(--color-gray-300) hover:outline",
        "cursor-pointer",
      )}
      onClick={(event) => {
        event.stopPropagation();
        setSelected((isSelected) => !isSelected);
      }}
      onDoubleClick={(event) => {
        event.stopPropagation();
      }}
      onFocus={(event) => {
        event.stopPropagation();
      }}
    >
      <div className="m-[-2px] flex items-center justify-center w-[24px] h-[24px]">
        {!isSelected && (
          <div className="flex items-center size-[18px] text-zinc-700 [&>svg>g]:fill-none opacity-40">
            {iconTable}
          </div>
        )}
        {isSelected && (
          <div className="flex items-center size-[18px] text-zinc-700 [&>svg>g]:fill-yellow-300 opacity-100">
            {iconTable}
          </div>
        )}
      </div>
    </button>
  );
};

const iconTable = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-table"
  >
    <g stroke="none">
      <path d="M4 11h4a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-2a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-6a1 1 0 0 1 1 -1z" />
      <path d="M18 3a3 3 0 0 1 2.995 2.824l.005 .176v2a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h6z" />
      <path d="M9 4v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a3 3 0 0 1 2.824 -2.995l.176 -.005h2a1 1 0 0 1 1 1z" />
    </g>
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
    <path d="M3 10h18" />
    <path d="M10 3v18" />
  </svg>
);
