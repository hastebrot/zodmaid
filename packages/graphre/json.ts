import { Graph, GraphLike } from "./graph";

export function write(g: GraphLike) {
  var json: any = {
    options: {
      directed: g.isDirected(),
      multigraph: g.isMultigraph(),
      compound: g.isCompound()
    },
    nodes: writeNodes(g),
    edges: writeEdges(g)
  };
  if (!(undefined === g.graph())) {
    (json as any).value = JSON.parse(JSON.stringify(g.graph()));
  }
  return json;
}

function writeNodes(g: GraphLike) {
  return g.nodes().map(function(v: string) {
    var nodeValue = g.node(v);
    var parent = g.parent(v);
    var node: { v: string, value?: unknown, parent?: unknown } = { v: v };
    if (!(undefined === nodeValue)) {
      node.value = nodeValue;
    }
    if (!(undefined === parent)) {
      node.parent = parent;
    }
    return node;
  });
}

function writeEdges(g: GraphLike) {
  return g.edges().map(function(e) {
    var edgeValue = g.edge(e);
    var edge: { v: string, w: string, name?: string, value?: unknown } = { v: e.v, w: e.w };
    if (!(undefined === e.name)) {
      edge.name = e.name;
    }
    if (!(undefined === edgeValue)) {
      edge.value = edgeValue;
    }
    return edge;
  });
}

export function read(json: {
  options: { directed: boolean, multigraph: boolean, compound: boolean },
  nodes: any[],
  edges: any[],
  value: any
}) {
  var g = new Graph<unknown, unknown, unknown>(json.options).setGraph(json.value);
  for(var entry of json.nodes) {
    g.setNode(entry.v, entry.value);
    if (entry.parent) {
      g.setParent(entry.v, entry.parent);
    }
  };
  for(var entry of json.edges) {
    g.setEdge({ v: entry.v, w: entry.w, name: entry.name }, entry.value);
  };
  return g;
}
