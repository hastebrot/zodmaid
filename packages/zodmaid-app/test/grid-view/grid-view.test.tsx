import { cleanup, render, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, test } from "vitest";
import { GridView, useGridView } from "../../src/components/grid-view/grid-view";
import { GridViewPage } from "../../src/routes/grid/grid-view-page";
import { registerGlobals } from "../register-globals";
import { registerMatchers } from "../register-matchers";

beforeAll(() => {
  registerGlobals();
  registerMatchers();
});

describe("grid view", () => {
  test("should grid", async () => {
    const TextFixture = () => {
      const gridView = useGridView({
        name: "test",
        data: {
          rows: [
            { key: "key 1", value: "value 1" },
            { key: "key 2", value: "value 2" },
          ],
        },
        columns: [
          { key: "key", label: "Key" },
          { key: "value", label: "Value" },
        ],
      });
      return <GridView value={gridView} />;
    };
    const screen = render(<TextFixture />);
    screen.debug();
  });

  test("should render", async () => {
    cleanup();
    const screen = render(<GridViewPage />);
    await waitFor(() => Promise.resolve());
    screen.baseElement.querySelector("div");
    screen.getByRole("grid", { name: "order" }).querySelector("div");

    expect(screen.getAllByRole("row")).toHaveLength(19);
    expect(screen.getByRole("grid", { name: "order" })).toBeInTheDocument();
    expect(screen.getByRole("grid", { name: "order.items" })).toBeInTheDocument();
    expect(screen.getByRole("grid", { name: "order.shipTo" })).toBeInTheDocument();
  });
});
