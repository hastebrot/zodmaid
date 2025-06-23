# ideas

**18 June 2025:**

- https://terrastruct.com/blog/post/diagram-layout-engines-crossing-minimization/
- https://medium.com/swlh/routing-orthogonal-diagram-connectors-in-javascript-191dc2c5ff70

- https://github.com/klortho/d3-flextree
- https://github.com/codeledge/entitree-flex
- https://reactflow.dev/learn/layouting/layouting#layouting-nodes
- https://github.com/tisoap/react-flow-smart-edge
- https://github.com/Aksem/libavoid-js

- https://observablehq.com/@fooloomanzoo/step-by-step-directed-graph-drawing-dagre-layout

Orthogonal Edge Routing for the EditLens
- https://vca.informatik.uni-rostock.de/~schumann/papers/2016%2B/edge-routing.pdf

manhattan layout algorithm
- https://link.springer.com/content/pdf/10.1007/BFb0021828.pdf
- https://github.com/process-analytics/bpmn-layout-generators/issues/58
- https://github.com/dagrejs/dagre/issues/111
- https://github.com/bpmn-io/diagram-js/blob/v15.3.0/lib/layout/ManhattanLayout.js

antv
- https://observablehq.com/@antv
- https://github.com/antvis/X6/tree/master/packages/x6/src/registry/router/manhattan
- https://github.com/antvis/G6/tree/v5/packages/g6/src/utils/router
- https://github.com/antvis/X6/tree/master/examples/x6-example-features/src/pages
- https://github.com/antvis/X6/blob/master/sites/x6-sites/examples/showcase/practices/demo/elk.ts

---

https://github.com/codeledge/entitree-flex
https://github.com/chuckzel/cytoscape-tidytree

Drawing Non-layered Tidy Trees in Linear Time
A.J. van der Ploeg
August 2013

https://github.com/kieler/elkjs
https://arxiv.org/abs/2311.00533

The Eclipse Layout Kernel
Sören Domrös, Reinhard von Hanxleden, Miro Spönemann, Ulf Rüegg, Christoph Daniel Schulze
November 2023

https://github.com/dagrejs/dagre
https://github.com/dagrejs/dagre/wiki#recommended-reading

A Technique for Drawing Directed Graphs
Emden R. Gansner
Eleftherios Koutsofios
Stephen C. North
Kiem-Phong Vo
March 1993

2-Layer Straightline Crossing Minimization: Performance of Exact and Heuristic Algorithms
Michael Jünger
Petra Mutzel
January 1997

Simple and Efficient Bilayer Cross Counting
Wilhelm Barth
Petra Mutzel
Michael Jünger
January 2002

Fast and Simple Horizontal Coordinate Assignment
Ulrik Brandes and Boris K¨opf
2002

Layout of compound directed graphs
Georg Sander
June 1996

https://www.adaptagrams.org/documentation/libavoid.html
https://github.com/mjwybrow/adaptagrams

M. Wybrow, K. Marriott, and P.J. Stuckey.
Orthogonal connector routing.
2010

M. Wybrow, K. Marriott, and P.J. Stuckey.
Incremental connector routing.
2006

M. Wybrow, K. Marriott and P.J. Stuckey.
Orthogonal hyperedge routing.
2012

K. Marriott, P.J. Stuckey, and M. Wybrow.
Seeing Around Corners: Fast Orthogonal Connector Routing.
2014

---

- `/diagram` (flow, sequence, state)
- `/layouter` (dagre, elk, cytoscape)
- `/renderer` (svg, png, rough)

- flowchart
- sequence diagram
- state diagram
- https://en.wikipedia.org/wiki/Deployment_flowchart
- https://en.wikipedia.org/wiki/Sequence_diagram
- https://en.wikipedia.org/wiki/Swimlane

**todo:**

https://github.com/hastebrot/zodmaid/blob/2025.6.3/packages/zodmaid/tests/mermaid.test.ts

160 LOC prototype.

what's next:
- custom node shapes
- custom edge arrows
- node padding
- multi-line labels
- node clusters / nested / compound graph (difficult one!)

later:
- other diagram types
- mermaid parser
- optional html for node content
- custom layouters (incl. elkjs)
- browser version that uses canvas or hidden html element to measure text width

**dependencies:**

zod:
- https://github.com/colinhacks/zod

resvg:
- https://github.com/thx/resvg-js

d3:
- `❯ bun add -d d3 @types/d3`
- https://github.com/d3/d3

elk:
- https://github.com/kieler/elkjs

d3 dagre:
- `❯ bun add -d dagre graphlib @types/dagre @types/graphlib`
- https://github.com/dagrejs/dagre-d3
- https://github.com/dagrejs/dagre
- https://github.com/dagrejs/graphlib
- forks:
  - https://github.com/tbo47/dagre-es
  - https://github.com/codeStryke/dagre-esm
  - https://github.com/skanaar/graphre

d3 dag:
- https://github.com/erikbrinkman/d3-dag
  - https://github.com/erikbrinkman/d3-dag/blob/main/src/graph/stratify.ts
  - https://app.unpkg.com/d3-dag@1.1.0/files/bundle

---

**references:**

- https://www.nomnoml.com
- https://github.com/skanaar/nomnoml

```html
<script src="//unpkg.com/graphre/dist/graphre.js"></script>
<script src="//unpkg.com/nomnoml/dist/nomnoml.js"></script>

<canvas id="target-canvas"></canvas>
<script>
  var canvas = document.getElementById('target-canvas')
  var source = '[nomnoml] is -> [awesome]'
  nomnoml.draw(canvas, source)
</script>
```

- `graphre.js` (38.7 kB), https://app.unpkg.com/graphre@0.1.3/files/dist
- `nomnoml.js` (71.8 kB), https://app.unpkg.com/nomnoml@1.7.0/files/dist
- `nomnoml.css` (5.99 kB),
- https://cdn.jsdelivr.net/npm/graphre@0.1.3/dist/graphre.js (transferred 13.77 kB, 38.69 kB size)
- https://cdn.jsdelivr.net/npm/nomnoml@1.7.0 (transferred 10.35 kB, 30.18 kB size)

```
#padding: 6
#spacing: 60
#.blob: fill=pink

[«Browser»|Client Browser] -> Sends HTTP Request [«API»|HTTP API - API Gateway]
[«API»|HTTP API - API Gateway] -> Triggers Service [GET Route]
[«API»|HTTP API - API Gateway] -> Triggers Service [POST Route]
[«API»|HTTP API - API Gateway] -> [Other Services/APIs]
[GET Route] -> Read/Write [<blob>Storage Bucket]
[GET Route] -> Access [<blob>Secrets Manager]
[GET Route] -> Read/Write [<blob>Key/Value Store]
[GET Route] -> Execute Queries [<blob>Relational Database Service]
```

```
#padding: 6
#spacing: 60
#.blob: fill=pink

[<class id=browser>«Browser»|Client Browser]
[<class id=api>«API»|HTTP API - API Gateway]

[browser] -> Sends HTTP Request [api]
[api] -> Triggers Service [GET Route]
[api] -> Triggers Service [POST Route]
[api] -> [Other Services/APIs]
[GET Route] -> Read/Write [<blob>Storage Bucket]
[GET Route] -> Access [<blob>Secrets Manager]
[GET Route] -> Read/Write [<blob>Key/Value Store]
[GET Route] -> Execute Queries [<blob>Relational Database Service]
```

```
#padding: 6
#spacing: 60
#bendSize: 0.3
#direction: down
#edgeMargin: 2
#arrowSize: 0.5
#.rect: fill=lightgreen align=center visual=class bold
#.blob: fill=pink align=center visual=class bold

[browser|
	[<rect id=browser>«Browser»|Client Browser]
]
[<rect id=api>«API»|HTTP API - API Gateway]

[browser] -> Sends HTTP Request [api]
[api] -> Triggers Service [GET Route]
[api] -> Triggers Service [POST Route]
[api] -> [Other Services/APIs]
[GET Route] -> Read/Write [<blob>Storage Bucket]
[GET Route] -> Access [<blob>Secrets Manager]
[GET Route] -> Read/Write [<blob>Key/Value Store]
[GET Route] -> Execute Queries [<blob>Relational Database Service]
```

- https://github.com/skanaar/nomnoml/issues/220
- https://github.com/dagrejs/dagre/blob/master/lib/nesting-graph.js
- https://github.com/skanaar/graphre/blob/master/lib/nesting-graph.ts
- https://github.com/dagrejs/dagre/issues/238
- https://github.com/dagrejs/dagre/pull/293


---

mindmaps:
- https://github.com/mermaid-js/mermaid/blob/mermaid%4011.6.0/packages/mermaid/src/diagrams/mindmap/mindmapRenderer.ts
- https://github.com/cytoscape/cytoscape.js-cose-bilkent
- https://github.com/iVis-at-Bilkent/cytoscape.js-fcose

> U. Dogrusoz, E. Giral, A. Cetintas, A. Civril, and E. Demir, "A Layout Algorithm For Undirected Compound Graphs", Information Sciences, 179, pp. 980-994, 2009.

> H. Balci and U. Dogrusoz, "fCoSE: A Fast Compound Graph Layout Algorithm with Constraint Support," in IEEE Transactions on Visualization and Computer Graphics, 28(12), pp. 4582-4593, 2022.

- https://bpmn.io/toolkit/bpmn-js/examples/
- https://reactflow.dev/examples/layout/dagre
- https://github.com/Klortho/d3-flextree
- https://github.com/rough-stuff/rough
- https://github.com/excalidraw/excalidraw/blob/v0.18.0/packages/excalidraw/renderer/staticSvgScene.ts#L42-L56
- https://github.com/shannpersand/comic-shanns
- https://github.com/kaBeech/serious-shanns
- https://github.com/maragudk/gomponents/blob/main/LLMs.md

https://github.com/dagrejs/dagre/wiki#recommended-reading


> This work was produced by taking advantage of many papers and books. If you're interested in how dagre works internally here are some of the most important papers to read.
>
> The general skeleton for Dagre comes from Gansner, et al., "A Technique for Drawing Directed Graphs", which gives both an excellent high level overview of the phases involved in layered drawing as well as diving into the details and problems of each of the phases. Besides the basic skeleton, we specifically used the technique described in the paper to produce an acyclic graph, and we use the network simplex algorithm for ranking. If there is one paper to start with when learning about layered graph drawing, this is it!
>
> For crossing minimization we used Jünger and Mutzel, "2-Layer Straightline Crossing Minimization", which provides a comparison of the performance of various heuristics and exact algorithms for crossing minimization.
>
> For counting the number of edge crossings between two layers we use the O(|E| log |V_small|) algorithm described in Barth, et al., "Simple and Efficient Bilayer Cross Counting".
>
> For positioning (or coordinate assignment), we derived our algorithm from Brandes and Köpf, "Fast and Simple Horizontal Coordinate Assignment". We made some adjustments to get tighter graphs when node and edges sizes vary greatly.
>
> The implementation for clustering derives extensively from Sander, "Layout of Compound Directed Graphs." It is an excellent paper that details the impact of clustering on all phases of layout and also covers many of the associated problems. Crossing reduction with clustered graphs derives from two papers by Michael Forster, "Applying Crossing Reduction Strategies to Layered Compound Graphs" and "A Fast and Simple Heuristic for Constrained Two-Level Crossing Reduction."

aesthetics:
- nomnoml text-based diagram tool
- kmime dataflow analysis
- brat annotation tool

---

- schemas
	- graph
	- node
	- attr, directive
	- cell
	- port
	- edge
	- label
- renderers
	- colors
		- brush (neutral, emphasis: base, subtle, muted; accent: accent-blue, critical-red, warning-orange, success-blue)
		- surface
		- frame
- layouters
- engines
- graphics
- diagrams
- shapes
	- class diagram
		- class, abstract, instance, reference
		- package
		- frame
	- component diagram
		- socket, lollipop
	- flow chart
		- start, end
		- state, choice, sync
		- input, sender, receiver, transceiver
	- use case
		- actor, usecase
	- misc
		- note
		- label, hidden
		- database, pipe
		- table


----

- brat annotation tool, [https://github.com/nlplab/brat](https://github.com/nlplab/brat)

```ts
const Test = () => {
  return (
    <div
      className="p-4"
      style={
        {
          // https://www.tints.dev/sandstone/EEE8D5 (300 locked, 10 saturation, perceived)
          "--color-sandstone-50": "#fefcf6",
          "--color-sandstone-100": "#fcf6e6",
          "--color-sandstone-200": "#f7f1db",
          "--color-sandstone-300": "#eee8d5",
          "--color-sandstone-400": "#d1c490",
          "--color-sandstone-500": "#afa066",
          "--color-sandstone-600": "#8d7f3d",
          "--color-sandstone-700": "#695c13",
          "--color-sandstone-800": "#473e00",
          "--color-sandstone-900": "#282200",
          "--color-sandstone-950": "#1a1500",
        } as CSSProperties
      }
    >
      <div>
        <div className="p-4 bg-[#eee8d5] border-b-3 border-[#33322E]">test</div>
        <div className="p-4 bg-[#fdf6e3]">test</div>
      </div>
      <div>&nbsp;</div>
      <div className="text-(--color-sandstone-900)">
        <div className="p-4 bg-(--color-sandstone-300) border-b-3 border-(--color-sandstone-900)">
          test
        </div>
        <div className="p-4 bg-(--color-sandstone-100)">test</div>
      </div>
    </div>
  );
};
```
