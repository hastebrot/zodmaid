import { BaseGridView } from "./base-grid-view";
import type { GridContextProps } from "./grid-context";

export type JsonGridViewProps = {
  context: GridContextProps;
  showHeader?: boolean;
};

export const JsonGridView = (props: JsonGridViewProps) => {
  if (props.showHeader) {
    return <BaseGridView.WithHeader context={props.context} />;
  }
  return <BaseGridView context={props.context} />;
};
