## studio structure

- non-interactive, static
- interactive, dynamic

---

- iris = document interface
- octo (zodmaid) = diagram graph
- tetra (zodspy) = data grid
- proto (zodtana) = outline document
- hepta (zodhepta) = whiteboard canvas
- duo (zodbrat) = annotated text

---

- tetra grid view
- proto grid view

- proto focus group
- proto bullet button
- proto outline button
- proto tag button
- proto action button

- proto node layout
- proto list cell
- proto field cell
- proto table cell

- proto data model
- proto grid / row / cell
- proto grid context
- proto grid view

- proto cell context
- proto cell renderer
  - owner / key

- proto data mapper
  - populate rows
  - populate columns

- proto style provider
- proto node title / description / tag list

- iris toolbar
- iris toolbar overlay

- hepta whiteboard
- hepta card
- hepta card group

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
