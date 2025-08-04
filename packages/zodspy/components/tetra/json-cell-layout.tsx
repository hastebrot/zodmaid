export type JsonCellLayoutProps = {
  prefixSlot?: React.ReactNode;
  primarySlot?: React.ReactNode;
  secondarySlot?: React.ReactNode;
};

export const JsonCellLayout = (props: JsonCellLayoutProps) => {
  return (
    <div className="flex flex-row items-stretch h-full">
      {props.prefixSlot && <div className="p-[2px] pr-0">{props.prefixSlot}</div>}
      <div className="flex flex-col items-start justify-start pr-[4px]">
        {props.primarySlot && <div className="flex">{props.primarySlot}</div>}
        {props.secondarySlot && <div className="flex">{props.secondarySlot}</div>}
      </div>
    </div>
  );
};
