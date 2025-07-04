import { gridComponents } from "./grid-components";
import { type GridContextProps, GridContext } from "./grid-context";

export const GridView = <DataModel,>(props: {
  children?: React.ReactNode;
  context: GridContextProps<DataModel>;
}) => {
  const context = {
    ...props.context,
    components: {
      ...gridComponents,
      ...props.context.components,
    },
  };
  return <GridContext value={context as GridContextProps}>{props.children}</GridContext>;
};
