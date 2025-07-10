import { cleanup, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { defineGridContext, JsonCell, JsonGrid, JsonRow, type GridContextProps } from "zodspy";
import { JsonGridView } from "../../components/json-grid-view";
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

describe("json grid view", () => {
  describe("cell selected", () => {
    test("two columns", async () => {
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
            return <JsonGrid {...props} />;
          },
          Row(props) {
            return <JsonRow {...props} />;
          },
          Cell(props) {
            return <JsonCell {...props} />;
          },
        },
      });

      // when:
      const screen = render(<JsonGridView context={context as GridContextProps} />, {
        baseElement: global.document.body,
      });
      const user = userEvent.setup({ document: global.document });

      // then:
      const grid = queryHelper.grid(screen.container);
      expect(grid.getCellExt(0, 0, "group")).toHaveAttribute("role", "group");
      expect(grid.getCellExt(0, 0, "group")).not.toHaveAttribute("aria-selected");
      expect(grid.getCellExt(0, 0, "group")).toHaveAttribute("data-selected", "false");
      expect(grid.getCellExt(0, 0, "group")).toHaveAttribute("data-editable", "false");

      await user.click(grid.getCellExt(0, 0, "group"));
      expect(grid.getCellExt(0, 0, "group")).toHaveAttribute("aria-selected", "true");
      expect(grid.getCellExt(0, 0, "group")).toHaveAttribute("data-selected", "true");

      await user.dblClick(grid.getCellExt(0, 0, "group"));
      expect(grid.getCellExt(0, 0, "group")).toHaveAttribute("aria-selected", "true");
      expect(grid.getCellExt(0, 0, "group")).toHaveAttribute("data-selected", "true");
      expect(grid.getCellExt(0, 0, "group")).toHaveAttribute("data-editable", "true");

      await user.click(grid.getCellExt(1, 0, "group"));
      expect(grid.getCellExt(0, 0, "group")).not.toHaveAttribute("aria-selected");
      expect(grid.getCellExt(0, 0, "group")).toHaveAttribute("data-selected", "false");
      expect(grid.getCellExt(0, 0, "group")).toHaveAttribute("data-editable", "false");
    });
  });
});
