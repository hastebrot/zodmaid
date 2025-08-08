import { type TriItem } from "../components/tri/tri-data-model";

export const items: TriItem[] = [
  // item title, folded, and reference.
  { title: "Text", isFolded: false },
  { title: "Text", isFolded: true },
  { title: "Text", isFolded: false, isReference: true },
  { title: "Text", isFolded: true, isReference: true },

  // item type, and tags.
  { title: "Text", type: "plain" },
  { title: "Text", type: "plain", tags: [{ title: "Text" }] },
  { title: "Text", type: "field:plain" },
  { title: "Text", type: "field:tag" },
  { title: "Text", type: "field:email" },
  { title: "Text", type: "field:bool" },
  { title: "Text", type: "field:code" },

  // item description.
  { title: "Text", description: "Description", type: "plain" },
  { title: "Text", description: "Description", type: "field:plain" },

  // item view.
  { title: "Text", type: "plain", view: "list", items: [{ title: "" }] },
  { title: "Text", type: "plain", view: "list", items: [{ title: "", items: [{ title: "" }] }] },
  { title: "Text", type: "field:plain", view: "list", items: [{ title: "" }] },
  {
    title: "Text",
    type: "field:plain",
    view: "list",
    items: [{ title: "", items: [{ title: "" }] }],
  },
  { title: "Text", type: "field:plain", view: "field", items: [{ title: "" }] },
  {
    title: "Text",
    type: "field:plain",
    view: "field",
    items: [{ title: "", items: [{ title: "" }] }],
  },
  {
    title: "Text",
    type: "plain",
    view: "table",
    items: [
      { title: "Text", type: "field:tag", items: [{ title: "" }] },
      { title: "Text", type: "field:plain", items: [{ title: "" }] },
    ],
  },
];
