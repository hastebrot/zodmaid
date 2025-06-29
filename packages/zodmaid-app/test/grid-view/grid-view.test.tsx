import { cleanup, render, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, test } from "vitest";
import { GridViewPage } from "../../src/routes/grid/grid-view-page";
import { registerGlobals } from "../register-globals";
import { registerMatchers } from "../register-matchers";

beforeAll(() => {
  registerGlobals();
  registerMatchers();
});

describe("grid view", () => {
  test("should render", async () => {
    cleanup();
    const screen = render(<GridViewPage />);
    await waitFor(() => Promise.resolve());
    expect(screen.getAllByRole("row")).toHaveLength(18);
    expect(screen.getByRole("grid", { name: "order" })).toBeInTheDocument();
    expect(screen.getByRole("grid", { name: "order.items" })).toBeInTheDocument();
    expect(screen.getByRole("grid", { name: "order.shipTo" })).toBeInTheDocument();
  });
});
