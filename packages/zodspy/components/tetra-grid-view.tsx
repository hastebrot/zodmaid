import { BaseGridView } from "./base-grid-view";
import type { GridContextProps } from "./grid-context";

export type TetraGridViewProps = {
  context: GridContextProps;
  showHeader?: boolean;
};

export const TetraGridView = (props: TetraGridViewProps) => {
  if (props.showHeader) {
    return <BaseGridView.WithHeader context={props.context} />;
  }
  return <BaseGridView context={props.context} />;
};
