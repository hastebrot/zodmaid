import { type GridContextProps, GridContext } from "./grid-context";

export type GridViewProps<DataModel> = {
  children?: React.ReactNode;
  context: GridContextProps<DataModel>;
};

export const GridView = <DataModel,>(props: GridViewProps<DataModel>) => {
  return <GridContext value={props.context as GridContextProps}>{props.children}</GridContext>;
};
