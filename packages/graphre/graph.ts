import { has, isUndefined, each, isEmpty, union } from './helpers';

var DEFAULT_EDGE_NAME = "\x00";
var GRAPH_NODE = "\x00";
var EDGE_KEY_DELIM = "\x01";

// Implementation notes:
//s
//  * Node id query functions should return string ids for the nodes
//  * Edge id query functions should return an "edgeObj", edge object, that is
//    composed of enough information to uniquely identify an edge: {v, w, name}.
//  * Internally we use an "edgeId", a stringified form of the edgeObj, to
//    reference edges. This is because we need a performant way to look these
//    edges up and, object properties, which have string keys, are the closest
//    we're going to get to a performant hashtable in JavaScript.

export interface Edge {
  v: string
  w: string
  name?: string
}

export class Graph<TGraph, TNode, TEdge> {
  private _isDirected: boolean
  private _isMultigraph: boolean
  private _isCompound: boolean
  // Label for the graph itself
  private _label: TGraph = undefined;
  private _defaultNodeLabelFn: (name?: string) => TNode
  private _defaultEdgeLabelFn: (v?: string, w?: string, name?: string) => TEdge
  private _nodes: { [key: string]: TNode }
  private _parent: Record<string, string>;
  private _children: Record<string, Record<string, boolean>>;
  private _in: Record<string, Record<string, Edge>>
  private _preds: Record<string, Record<string, number>>
  private _out: Record<string, Record<string, Edge>>
  private _sucs: Record<string, Record<string, number>>
  private _edgeObjs: Record<string, Edge>
  private _edgeLabels: Record<string, TEdge>
  /* Number of nodes in the graph. Should only be changed by the implementation. */
  private _nodeCount: number = 0;
  /* Number of edges in the graph. Should only be changed by the implementation. */
  private _edgeCount: number = 0;

  constructor(opts: { directed?: boolean, multigraph?: boolean, compound?: boolean } = {}) {
    this._isDirected = has(opts, "directed") ? opts.directed : true;
    this._isMultigraph = has(opts, "multigraph") ? opts.multigraph : false;
    this._isCompound = has(opts, "compound") ? opts.compound : false;

    // Defaults to be set when creating a new node
    this._defaultNodeLabelFn = (): undefined => (undefined);

    // Defaults to be set when creating a new edge
    this._defaultEdgeLabelFn = (): undefined => (undefined);

    // v -> label
    this._nodes = {};

    if (this._isCompound) {
      // v -> parent
      this._parent = {};

      // v -> children
      this._children = {};
      this._children[GRAPH_NODE] = {};
    }

    // v -> edgeObj
    this._in = {};

    // u -> v -> Number
    this._preds = {};

    // v -> edgeObj
    this._out = {};

    // v -> w -> Number
    this._sucs = {};

    // e -> edgeObj
    this._edgeObjs = {};

    // e -> label
    this._edgeLabels = {};
  }


  /* === Grap functions ========= */

  isDirected() {
    return this._isDirected;
  }

  isMultigraph() {
    return this._isMultigraph;
  }

  isCompound() {
    return this._isCompound;
  }

  setGraph(label: TGraph) {
    this._label = label;
    return this;
  }

  graph() {
    return this._label;
  };

  /* === Node function ========== */

  setDefaultNodeLabel(newDefault: TNode|((name?: string) => TNode)) {
    function isConstant(x: unknown): x is TNode { return 'function' !== typeof x }
    if (isConstant(newDefault)) {
      this._defaultNodeLabelFn = () => (newDefault);
    } else {
      this._defaultNodeLabelFn = newDefault;
    }
    return this;
  }

  nodeCount(): number {
    return this._nodeCount;
  }

  nodes(): string[] {
    return Object.keys(this._nodes);
  }

  sources(): string[] {
    var self = this;
    return this.nodes().filter(function (v: string) {
      return isEmpty(self._in[v]);
    });
  }

  sinks(): string[] {
    var self = this;
    return this.nodes().filter((v: string) => isEmpty(self._out[v]));
  }

  setNodes(vs: string[], value?: TNode): Graph<TGraph, TNode, TEdge> {
    var self = this;
    for(var v of vs) {
      if (value !== undefined) {
        self.setNode(v, value);
      } else {
        self.setNode(v);
      }
    };
    return this;
  }

  setNode(v: string, value?: TNode) {
    if (has(this._nodes, v)) {
      if (arguments.length > 1) {
        this._nodes[v] = value;
      }
      return this;
    }

    this._nodes[v] = arguments.length > 1 ? value : this._defaultNodeLabelFn(v);
    if (this._isCompound) {
      this._parent[v] = GRAPH_NODE;
      this._children[v] = {};
      this._children[GRAPH_NODE][v] = true;
    }
    this._in[v] = {};
    this._preds[v] = {};
    this._out[v] = {};
    this._sucs[v] = {};
    ++this._nodeCount;
    return this;
  }

  node(v: string): TNode {
    return this._nodes[v];
  }

  hasNode(v: string): boolean {
    return has(this._nodes, v);
  }

  removeNode(v: string): Graph<TGraph, TNode, TEdge> {
    var self = this;
    if (has(this._nodes, v)) {
      var removeEdge = (e: string) => { self.removeEdge(this._edgeObjs[e]); };
      delete this._nodes[v];
      if (this._isCompound) {
        this._removeFromParentsChildList(v);
        delete this._parent[v];
        for(var child of this.children(v)) {
          self.setParent(child);
        };
        delete this._children[v];
      }
      for(var key of Object.keys(this._in[v])) removeEdge(key);
      delete this._in[v];
      delete this._preds[v];
      for(var key of Object.keys(this._out[v])) removeEdge(key);
      delete this._out[v];
      delete this._sucs[v];
      --this._nodeCount;
    }
    return this;
  }

  setParent(v: string, parent?: string): Graph<TGraph, TNode, TEdge> {
    if (!this._isCompound) {
      throw new Error("Cannot set parent in a non-compound graph");
    }

    if (undefined === parent) {
      parent = GRAPH_NODE;
    } else {
      // Coerce parent to string
      parent += "";
      for (var ancestor = parent;
        !isUndefined(ancestor);
        ancestor = this.parent(ancestor)) {
        if (ancestor === v) {
          throw new Error(`Setting ${parent} as parent of ${v} would create a cycle`);
        }
      }

      this.setNode(parent);
    }

    this.setNode(v);
    this._removeFromParentsChildList(v);
    this._parent[v] = parent;
    this._children[parent][v] = true;
    return this;
  }

  _removeFromParentsChildList(v: string) {
    delete this._children[this._parent[v]][v];
  }

  parent(v: string) {
    if (this._isCompound) {
      var parent = this._parent[v];
      if (parent !== GRAPH_NODE) {
        return parent;
      }
    }
    return undefined;
  }

  children(v?: string): string[]|undefined {
    if (isUndefined(v)) {
      v = GRAPH_NODE;
    }

    if (this._isCompound) {
      var children = this._children[v];
      if (children) {
        return Object.keys(children);
      }
      return undefined;
    } else if (v === GRAPH_NODE) {
      return this.nodes();
    } else if (this.hasNode(v)) {
      return [];
    }
    return undefined;
  }

  predecessors(v: string): string[]|undefined {
    var predsV = this._preds[v];
    if (predsV) {
      return Object.keys(predsV);
    }
    return undefined;
  }

  successors(v: string): string[]|undefined {
    var sucsV = this._sucs[v];
    if (sucsV) {
      return Object.keys(sucsV);
    }
    return undefined;
  }

  neighbors(v: string): string[]|undefined {
    var preds = this.predecessors(v);
    if (preds) {
      return union(preds, this.successors(v));
    }
    return undefined;
  }

  isLeaf(v: string): boolean {
    var neighbors;
    if (this.isDirected()) {
      neighbors = this.successors(v);
    } else {
      neighbors = this.neighbors(v);
    }
    return neighbors.length === 0;
  }

  filterNodes(filter: (v: string) => boolean) {
    var copy = new Graph({
      directed: this._isDirected,
      multigraph: this._isMultigraph,
      compound: this._isCompound
    });

    copy.setGraph(this.graph());

    var self = this;
    each(this._nodes, function (value, v) {
      if (filter(v)) {
        copy.setNode(v, value);
      }
    });

    each(this._edgeObjs, function (e) {
      if (copy.hasNode(e.v) && copy.hasNode(e.w)) {
        copy.setEdge(e, self.edge(e));
      }
    });

    var parents: Record<string, string> = {};
    function findParent(v: string): string {
      var parent = self.parent(v);
      if (parent === undefined || copy.hasNode(parent)) {
        parents[v] = parent;
        return parent;
      } else if (parent in parents) {
        return parents[parent];
      } else {
        return findParent(parent);
      }
    }

    if (this._isCompound) {
      for(var v of copy.nodes()) {
        copy.setParent(v, findParent(v));
      };
    }

    return copy;
  };

  /* === Edge function ========== */

  setDefaultEdgeLabel(newDefault: TEdge|((v?: string, w?: string, name?: string) => TEdge)) {
    function isConstant(x: unknown): x is TEdge { return 'function' !== typeof x }
    if (isConstant(newDefault)) {
      this._defaultEdgeLabelFn = () => (newDefault);
    } else {
      this._defaultEdgeLabelFn = newDefault;
    }
    return this;
  }

  edgeCount() {
    return this._edgeCount;
  }

  edges() {
    return Object.values(this._edgeObjs);
  }

  setPath(vs: string[], value?: TEdge) {
    var self = this;
    var args = arguments;
    vs.reduce(function (v: string, w: string) {
      if (args.length > 1) {
        self.setEdge(v, w, value);
      } else {
        self.setEdge(v, w);
      }
      return w;
    });
    return this;
  };

  /*
    * setEdge(v, w, [value, [name]])
    * setEde({ v, w, [name] }, [value])
   */
  setEdge(v: string|{ v: string, w: string, name?: string }, w?: string|TEdge, value?: TEdge, name?: string) {
    var valueSpecified = false;
    var arg0 = v;

    if (typeof arg0 === "object" && arg0 !== null && "v" in arg0) {
      v = arg0.v;
      w = arg0.w;
      name = arg0.name;
      if (arguments.length === 2) {
        value = arguments[1];
        valueSpecified = true;
      }
    } else {
      v = arg0;
      w = arguments[1];
      name = arguments[3];
      if (arguments.length > 2) {
        value = arguments[2];
        valueSpecified = true;
      }
    }

    v = "" + v;
    w = "" + w;
    if (!isUndefined(name)) {
      name = "" + name;
    }

    var e = edgeArgsToId(this._isDirected, v, w, name);
    if (has(this._edgeLabels, e)) {
      if (valueSpecified) {
        this._edgeLabels[e] = value;
      }
      return this;
    }

    if (!isUndefined(name) && !this._isMultigraph) {
      throw new Error("Cannot set a named edge when isMultigraph = false");
    }

    // It didn't exist, so we need to create it.
    // First ensure the nodes exist.
    this.setNode(v);
    this.setNode(w);

    this._edgeLabels[e] = valueSpecified ? value : this._defaultEdgeLabelFn(v, w, name);

    var edgeObj = edgeArgsToObj(this._isDirected, v, w, name);
    // Ensure we add undirected edges in a consistent way.
    v = edgeObj.v;
    w = edgeObj.w;

    Object.freeze(edgeObj);
    this._edgeObjs[e] = edgeObj;
    incrementOrInitEntry(this._preds[w], v);
    incrementOrInitEntry(this._sucs[v], w);
    this._in[w][e] = edgeObj;
    this._out[v][e] = edgeObj;
    this._edgeCount++;
    return this;
  }

  edge(v: string|Edge, w?: string, name?: string) {
    var e = (('object' === typeof v)
      ? edgeObjToId(this._isDirected, v)
      : edgeArgsToId(this._isDirected, v, w, name));
    return this._edgeLabels[e];
  }

  hasEdge(v: string, w?: string, name?: string) {
    var e = (arguments.length === 1
      ? edgeObjToId(this._isDirected, arguments[0])
      : edgeArgsToId(this._isDirected, v, w, name));
    return has(this._edgeLabels, e);
  }

  removeEdge(v: string|Edge, w?: string, name?: string) {
    var e = (('object' === typeof v)
      ? edgeObjToId(this._isDirected, v)
      : edgeArgsToId(this._isDirected, v, w, name));
    var edge = this._edgeObjs[e];
    if (edge) {
      v = edge.v;
      w = edge.w;
      delete this._edgeLabels[e];
      delete this._edgeObjs[e];
      decrementOrRemoveEntry(this._preds[w], v);
      decrementOrRemoveEntry(this._sucs[v], w);
      delete this._in[w][e];
      delete this._out[v][e];
      this._edgeCount--;
    }
    return this;
  }

  inEdges(v: string, u?: string) {
    var inV = this._in[v];
    if (inV) {
      var edges = Object.values(inV);
      if (!u) {
        return edges;
      }
      return edges.filter(function (edge) { return edge.v === u; });
    }
    return undefined;
  }

  outEdges(v: string, w?: string) {
    var outV = this._out[v];
    if (outV) {
      var edges = Object.values(outV);
      if (!w) {
        return edges;
      }
      return edges.filter(function (edge) { return edge.w === w; });
    }
    return undefined;
  }

  nodeEdges(v: string, w?: string) {
    var inEdges = this.inEdges(v, w);
    if (inEdges) {
      return inEdges.concat(this.outEdges(v, w));
    }
    return undefined;
  };
}

export class GraphLike extends Graph<unknown, unknown, unknown> {}

function incrementOrInitEntry(map: Record<string, number>, k: string) {
  if (map[k]) {
    map[k]++;
  } else {
    map[k] = 1;
  }
}

function decrementOrRemoveEntry(map: Record<string, number>, k: string) {
  if (!--map[k]) { delete map[k]; }
}

function edgeArgsToId(isDirected: boolean, v_: string, w_: string, name: string) {
  var v = "" + v_;
  var w = "" + w_;
  if (!isDirected && v > w) {
    var tmp = v;
    v = w;
    w = tmp;
  }
  return v + EDGE_KEY_DELIM + w + EDGE_KEY_DELIM +
    (isUndefined(name) ? DEFAULT_EDGE_NAME : name);
}

function edgeArgsToObj(isDirected: boolean, v_: string, w_: string, name: string) {
  var v = "" + v_;
  var w = "" + w_;
  if (!isDirected && v > w) {
    var tmp = v;
    v = w;
    w = tmp;
  }
  var edgeObj: Edge = { v: v, w: w };
  if (name) {
    edgeObj.name = name;
  }
  return edgeObj;
}

function edgeObjToId(isDirected: boolean, edgeObj: Edge) {
  return edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);
}
