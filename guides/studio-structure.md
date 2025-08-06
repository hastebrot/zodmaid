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

- tri item layout
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
- tri item title / description / tag list

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
- we have useGridNavigation() hook. it uses an effect that registers the cell
  coordinates and unregisters them when the component unmounts
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

---

- `<Grid name="">` and parent grid name
- `<Cell row={0} col={0}>` and grid name

- `<Grid>` use grid view context
- `<Cell>` use grid view context, use effect, register and unregister

- selection =
  - grid name
  - cell row
  - cell col

- movements = + grid type, current selection
  - arrow up cell
  - arrow down cell
  - arrow left cell
  - arrow right cell

- to sub grid
- to parent grid

- test: to sub grid
  - selection: grid / 1 / 1
  - on arrow down
  - selection: grid / 1 / 2
  - selection: subgrid / 1 / 1

- test: to parent grid
  - selection: subgrid / 1 / 1
  - on arrow up
  - selection: grid / 1 / 2
  - selection: subgrid / 1 / 1

- grid view context
- grid context
- cell context

- lookup parent grid + cell in parent grid
- lookup subgrid + cell in subgrid + grid row + grid col
- lookup cell

- json object
- json array
- json array table
- json root

- keydown handler
  - enter + cell selection to text selection
  - escape

- tri grid layout
- tri cell layout

- expand last column
  - fixed width
  - width: max px
  - width: 100% + screen right end

- tri bullet button
- tri tag button
  - static
  - playwright test
  - headless test

- https://www.rfc-editor.org/rfc/rfc9535.html, JSONPath: Query Expressions for
  JSON

```json
{ "store": {
    "book": [
      { "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      { "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      { "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      { "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 399
    }
  }
}
```
