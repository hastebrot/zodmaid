import { Edge, GraphLike } from '../graph';
import { PriorityQueue } from '../data/priority-queue';

export function prim(g: GraphLike, weightFunc: (e: Edge) => number) {
  var result = new GraphLike({});
  var parents: Record<string, string> = {};
  var pq = new PriorityQueue();
  var v: string;

  function updateNeighbors(edge: Edge) {
    var w = edge.v === v ? edge.w : edge.v;
    var pri = pq.priority(w);
    if (pri !== undefined) {
      var edgeWeight = weightFunc(edge);
      if (edgeWeight < pri) {
        parents[w] = v;
        pq.decrease(w, edgeWeight);
      }
    }
  }

  if (g.nodeCount() === 0) {
    return result;
  }

  for(v of g.nodes()) {
    pq.add(v, Number.POSITIVE_INFINITY);
    result.setNode(v);
  };

  // Start from an arbitrary node
  pq.decrease(g.nodes()[0], 0);

  var init = false;
  while (pq.size() > 0) {
    v = pq.removeMin();
    if ((v in parents)) {
      result.setEdge(v, parents[v]);
    } else if (init) {
      throw new Error("Input graph is not connected: " + g);
    } else {
      init = true;
    }

    g.nodeEdges(v).forEach(updateNeighbors);
  }

  return result;
}
