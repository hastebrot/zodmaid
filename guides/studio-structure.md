## studio structure

- non-interactive, static
- interactive, dynamic

---

- studio-app = react vite application
- iris = document interface
- octo (zodmaid) = node-link diagram
- tetra (zodspy) = data grid
- tri (zodtana) = outline document
- hepta (zodhepta) = whiteboard canvas
- duo (zodbrat) = annotated text

---

- tetra grid view
- tri grid view

- tri focus group
- tri bullet button
- tri outline button
- tri tag button
- tri action button

- tri node layout
- tri list cell
- tri field cell
- tri table cell

- tri data model
- tri grid / row / cell
- tri grid context
- tri grid view

- tri cell context
- tri cell renderer
  - owner / key

- tri data mapper
  - populate rows
  - populate columns

- tri style provider
- tri node title / description / tag list

- iris toolbar
- iris toolbar overlay
- iris input
- iris textarea

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
