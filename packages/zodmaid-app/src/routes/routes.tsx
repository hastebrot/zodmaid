import { useEffect } from "react";
import { useNavigate, type RouteObject } from "react-router";
import { DiagramAntvPage } from "./diagram/diagram-antv-page";
import { DiagramPage } from "./diagram/diagram-page";
import { GridViewStaticPage } from "./grid/grid-view-static-page";
import { GridViewStyledPage } from "./grid/grid-view-styled-page";
import { InputFieldSizingPage } from "./grid/input-field-sizing-page";
import { MobxObserverPage } from "./grid/mobx-observer-page";
import { MockupGridPage } from "./grid/mockup-grid-page";
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
  {
    path: "/",
    Component: () => {
      const navigate = useNavigate();
      useEffect(() => {
        navigate("/grid/static", { replace: true });
      }, []);
      return null;
    },
  },
  {
    path: "/diagram",
    children: [
      // wrap.
      { path: "", Component: () => <DiagramPage /> },
      { path: "antv", Component: () => <DiagramAntvPage /> },
    ],
  },
  {
    path: "/grid",
    children: [
      // wrap.
      { path: "static", Component: () => <GridViewStaticPage /> },
      { path: "styled", Component: () => <GridViewStyledPage /> },
      { path: "mockup", Component: () => <MockupGridPage /> },
      { path: "react-data-grid", Component: () => <ReactDataGridPage /> },
      { path: "mobx", Component: () => <MobxObserverPage /> },
      { path: "field-sizing", Component: () => <InputFieldSizingPage /> },
    ],
  },
];
