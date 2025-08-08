export type TriItem = {
  title: string;
  description?: string;
  items?: TriItem[];
  type?: TriType;
  view?: TriView;
  tags?: TriTag[];
  isFolded?: boolean;
  isReference?: boolean;
};

export type TriType =
  | "plain"
  | "field:plain"
  | "field:tag"
  | "field:email"
  | "field:bool"
  | "field:code";

export type TriView = "list" | "field" | "table";

export type TriTag = TriItem;
