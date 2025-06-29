import { useEffect } from "react";
import { useNavigate, type RouteObject } from "react-router";
import { DiagramAntvPage } from "./diagram/diagram-antv-page";
import { DiagramPage } from "./diagram/diagram-page";
import { GridMockupPage } from "./grid/grid-mockup-page";
import { GridViewPage } from "./grid/grid-view-page";
import { ReactDataGridPage } from "./grid/react-data-grid-page";

// dagre, https://github.com/antvis/layout/blob/v5/packages/layout/src/dagre.ts
// - uses @dagrejs/dagre, https://github.com/dagrejs/dagre
// - uses @dagrejs/graphlib, https://github.com/dagrejs/graphlib
// antv dagre, https://github.com/antvis/layout/blob/v5/packages/layout/src/antv-dagre.ts
// - uses @antv/graphlib, https://github.com/antvis/graphlib/tree/master/src
// rust dagre, https://github.com/antvis/layout/tree/v5/packages/layout-rust/src/dagre
// - uses @antv/layout-rust, https://github.com/antvis/layout/tree/v5/packages/layout-rust/src/dagre
// - uses graphlib_rust, https://crates.io/crates/graphlib_rust
// - uses dagre_rust, https://crates.io/crates/dagre_rust

export const routes: RouteObject[] = [
  // wrap.
  {
    path: "/",
    Component: () => {
      const navigate = useNavigate();
      useEffect(() => {
        navigate("/grid-view", { replace: true });
      }, []);
      return null;
    },
  },
  { path: "/diagram", Component: () => <DiagramPage /> },
  { path: "/diagram-antv", Component: () => <DiagramAntvPage /> },
  { path: "/grid", Component: () => <ReactDataGridPage /> },
  { path: "/grid-mockup", Component: () => <GridMockupPage /> },
  { path: "/grid-view", Component: () => <GridViewPage /> },
];
