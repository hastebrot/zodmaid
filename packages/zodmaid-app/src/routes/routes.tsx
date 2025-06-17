import { type RouteObject } from "react-router";
import { DiagramPage } from "./diagramPage";

export const routes: RouteObject[] = [
  // wrap.
  { path: "/", Component: () => <DiagramPage /> },
];
