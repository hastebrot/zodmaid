## studio structure

- non-interactive, static
- interactive, dynamic

---

- studio-app = react vite application
- iris = document interface
- octo (zodmaid) = diagram graph
- tetra (zodspy) = data grid
- juxta (zodtana) = outline document
- hepta (zodhepta) = whiteboard canvas
- duo (zodbrat) = annotated text

- ortho, inter, circa, peri, proto, forma, orbis, structa, forma

---

- tetra grid view
- juxta grid view

- juxta focus group
- juxta bullet button
- juxta outline button
- juxta tag button
- juxta action button

- juxta node layout
- juxta list cell
- juxta field cell
- juxta table cell

- juxta data model
- juxta grid / row / cell
- juxta grid context
- juxta grid view

- juxta cell context
- juxta cell renderer
  - owner / key

- juxta data mapper
  - populate rows
  - populate columns

- juxta style provider
- juxta node title / description / tag list

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
