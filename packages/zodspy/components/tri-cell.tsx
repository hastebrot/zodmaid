import { BaseCell, type BaseCellProps } from "./base-cell";

export type TriCellProps = BaseCellProps<any>;

export const TriCell = (props: TriCellProps) => {
  return <BaseCell {...props} />;
};
