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
};

export type FieldCellProps = {
  bulletSlot?: React.ReactNode;
  titleSlot?: React.ReactNode;
  descriptionSlot?: React.ReactNode;
};

export type TableCellProps = {
  bulletSlot?: React.ReactNode;
  outlineSlot?: React.ReactNode;
  titleSlot?: React.ReactNode;
  descriptionSlot?: React.ReactNode;
  itemsSlot?: React.ReactNode;
};
```

- https://mobx.js.org/computeds-with-args.html#2-close-over-the-arguments

```js
import * as React from "react";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";

const Item = observer(({ item, store }) => {
  const isSelected = computed(() => store.isSelected(item.id)).get();
  return (
    <div className={isSelected ? "selected" : ""}>
      {item.title}
    </div>
  );
});
```

selection
- we have a grid cell
- on click, the cell becomes selected
  - on enter, the cell input becomes focused
  - on escape, the cell input looses focus
- on click the cell contains cell text
  - on enter, the cell text is replaced by the cell input
  - on escape, the cell input is replaced by the cell text

navigation
- we have a grid context
- we have useGridContext() hook
- we have useGridNavigation() hook. it uses an effect that registers
  the cell coordinates and unregisters them when the component unmounts
- we have a grid with subgrids. each subgrid knows the parent grid coordinates
- we use the grid context to store the last cell coordinates
- on arrow left or right, the last cell coordinate x is updated
- on arrow up or down, the last cell coordinate y is updated

- grid view context
  - model
  - selection: text, grid
  - position: grid
    - position [grid name, row index, col index] = grid type, grid ref
    - registerGrid
    - unregisterGrid
  - position: cell
    - position [grid name, row index, col index] = cell type, cell ref
    - registerCell
    - unregisterCell
