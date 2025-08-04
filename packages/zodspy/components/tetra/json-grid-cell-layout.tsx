export type JsonGridCellLayoutProps = {
  gridSlot?: React.ReactNode;
};

export const JsonGridCellLayout = (props: JsonGridCellLayoutProps) => {
  return <div className="grid -m-px">{props.gridSlot}</div>;
};
