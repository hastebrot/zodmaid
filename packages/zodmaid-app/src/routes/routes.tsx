import { type RouteObject } from "react-router";

export const routes: RouteObject[] = [
  // wrap.
  { path: "/", Component: () => <Index /> },
];

const Index = () => <div className="p-4">index</div>;
