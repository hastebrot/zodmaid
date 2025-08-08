import { BaseGrid, type BaseGridProps } from "./base-grid";

export type TriGridProps = BaseGridProps;

export const TriGrid = (props: TriGridProps) => {
  return <BaseGrid {...props} />;
};
