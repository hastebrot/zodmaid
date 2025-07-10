import { cleanup, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import {
  BaseCell,
  BaseGrid,
  BaseGridView,
  BaseRow,
  defineGridContext,
  type GridContextProps,
} from "zodspy";
import { queryHelper } from "../query-helper";
import { registerGlobals } from "../register-globals";
import { registerMatchers } from "../register-matchers";

beforeAll(() => {
  registerGlobals();
  registerMatchers();
});

beforeEach(() => {
  cleanup();
});

describe("base grid view", () => {
  describe("grid columns width", () => {
    test("two columns", () => {
      // given:
      type DataModel = {
        id: number;
        productName: string;
      };
      const context = defineGridContext<DataModel>({
        label: "grid",
        rows: [
          { id: 1, productName: "Diamond heart" },
          { id: 2, productName: "Amber ring" },
          { id: 3, productName: "Pearl necklace" },
          { id: 4, productName: "Jade earring" },
          { id: 5, productName: "Ruby bracelet" },
        ],
        columns: [
          {
            label: "id",
            width: "max-content",
            cellRenderer(props) {
              return <span>{props.data.row?.id}</span>;
            },
          },
          {
            label: "productName",
            width: "1fr",
            cellRenderer(props) {
              return <span>{props.data.row?.productName}</span>;
            },
          },
        ],
        elements: {
          Grid(props) {
            return <BaseGrid {...props} />;
          },
          Row(props) {
            return <BaseRow {...props} />;
          },
          Cell(props) {
            return <BaseCell {...props}>{props.data.column?.cellRenderer?.(props)}</BaseCell>;
          },
        },
      });

      // when:
      const screen = render(<BaseGridView context={context as GridContextProps} />, {
        baseElement: global.document.body,
      });
      const user = userEvent.setup({ document: global.document });

      // then:
      const grid = queryHelper.grid(screen.container);
      expect(grid.getGrid("grid")).toHaveStyle({ gridTemplateColumns: "max-content 1fr" });
    });
  });
});
