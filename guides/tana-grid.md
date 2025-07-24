## grid layout

- non-interactive, static
- interactive, dynamic

---

- spy: data grid
- tan: knowledge graph
- cap: multi document ui
- hep: whiteboard canvas
- pro: annotated text

- spy grid view
- tan grid view

- tan focus group
- tan bullet button
- tan outline button
- tan tag button
- tan action button

- tan node layout
- tan list cell
- tan field cell
- tan table cell

- tan data model
- tan grid / row / cell
- tan grid context
- tan grid view

- tan cell context
- tan cell renderer
  - owner / key

- tan data mapper
  - populate rows
  - populate columns

- tan style provider
- tan node title / description / tag list

- tan toolbar
- tan toolbar overlay

- hep whiteboard
- hep card
- hep card group

- cap screen layout
- cap action list button
- cap workspace button
  - height: 32px
- cap icon button
  - size: 28x28, icon size: 14x14
- cap page header bar
  - height: 40px
- cap new content button
  - height: 32px
- cap doc bullet button
  - size: 24x24
- cap doc add button
  - size: 16x20
- cap doc focus group
  - height: 30px, line height: 24px

---

- lexical input
- lexical textarea
  - value: string
  - on change

- antvis whiteboard (diagram)
- antvis card (node)
- antvis card group (group node)

---

- https://floating-ui.com/docs/getting-started
- https://github.com/floating-ui/floating-ui/tree/%40floating-ui/react%400.27.13/packages/react

- `node.items`

```ts
export type NodeCellProps = {
  bulletSlot?: React.ReactNode;
  outlineSlot?: React.ReactNode;
  titleSlot?: React.ReactNode;
  descriptionSlot?: React.ReactNode;
  itemsSlot?: React.ReactNode;
}

export type FieldCellProps = {
  bulletSlot?: React.ReactNode;
  titleSlot?: React.ReactNode;
  descriptionSlot?: React.ReactNode;
}

export type TableCellProps = {
  bulletSlot?: React.ReactNode;
  outlineSlot?: React.ReactNode;
  titleSlot?: React.ReactNode;
  descriptionSlot?: React.ReactNode;
  itemsSlot?: React.ReactNode;
}
```
