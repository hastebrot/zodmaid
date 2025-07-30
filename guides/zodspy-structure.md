## zodspy structure

- non-interactive, static
- interactive, dynamic

---

- iris = document interface
- zmaid = diagram graph
- zspy = data grid
- ztan = outline document
- zhepta = whiteboard canvas
- zbrat = annotated text

---

- zspy grid view
- ztan grid view

- ztan focus group
- ztan bullet button
- ztan outline button
- ztan tag button
- ztan action button

- ztan node layout
- ztan list cell
- ztan field cell
- ztan table cell

- ztan data model
- ztan grid / row / cell
- ztan grid context
- ztan grid view

- ztan cell context
- ztan cell renderer
  - owner / key

- ztan data mapper
  - populate rows
  - populate columns

- ztan style provider
- ztan node title / description / tag list

- ztan toolbar
- ztan toolbar overlay

- zhepta whiteboard
- zhepta card
- zhepta card group

- iris screen layout
- iris action list button
- iris workspace button
  - height: 32px
- iris icon button
  - size: 28x28, icon size: 14x14
- iris page header bar
  - height: 40px
- iris new content button
  - height: 32px
- iris doc bullet button
  - size: 24x24
- iris doc add button
  - size: 16x20
- iris doc focus group
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
