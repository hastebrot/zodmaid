import { BaseRow, type BaseRowProps } from "./base-row";

export type TriRowProps = BaseRowProps;

export const TriRow = (props: TriRowProps) => {
  return <BaseRow {...props} />;
};
