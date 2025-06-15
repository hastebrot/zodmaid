import { attr, AttrType } from "./diagram/attr";
import { cell, CellType } from "./diagram/cell";
import { edge, EdgeType } from "./diagram/edge";
import { label, LabelType } from "./diagram/label";
import { node, NodeType } from "./diagram/node";

const id = (value: string) => attr("id", value);
const shape = (value: ShapeValue) => attr("shape", value);
const arrow = (value: ArrowValue) => attr("arrow", value);

export { arrow, attr, cell, edge, id, label, node, shape };
export type { AttrType, CellType, EdgeType, LabelType, NodeType };
export type DiagramType = (AttrType | CellType | EdgeType | LabelType | NodeType)[];

type ShapeValue =
  | "box"
  | "table"
  // class diagram
  | "class"
  | "abstract"
  | "instance"
  | "reference"
  | "package"
  | "frame"
  // component diagram
  | "component"
  | "lollipop"
  // flow chart
  | "start"
  | "end"
  | "state"
  | "choice"
  | "sync"
  | "input"
  | "sender"
  | "receiver"
  | "transceiver"
  // use case
  | "actor"
  | "usecase"
  // miscellaneous
  | "note"
  | "label"
  | "hidden"
  | "cloud"
  | "database"
  | "pipe";

type ArrowValue =
  | "-" // association
  | "->" // association
  | "<->" // association
  | "-->" // dependency
  | "<-->" // dependency
  | "-:>" // generalization
  | "--:>" // implementation
  | "+-" // composition
  | "+->" // composition
  | "o-" // aggregation
  | "o->" // aggregation
  | "-o)" // ball and socket
  | "o<-)" // ball and socket
  | "->o" // ball and socket
  | "--" // note
  | "-/-"; // hidden
