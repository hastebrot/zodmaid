import { classNames } from "../helpers/clsx";
import { BaseRow, type BaseRowProps } from "./base-row";

export const JsonRow = (props: BaseRowProps) => {
  return (
    <BaseRow
      {...props}
      className={classNames("grid grid-cols-subgrid grid-flow-col col-span-full")}
    />
  );
};
