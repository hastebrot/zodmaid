export type GridColumn<DataModel = unknown> = {
  label: string | keyof DataModel;
  width: string | "min-content" | "max-content" | "auto";
};
