# zodmaid

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

d3 dag:
- https://github.com/erikbrinkman/d3-dag
  - https://github.com/erikbrinkman/d3-dag/blob/main/src/graph/stratify.ts
  - https://app.unpkg.com/d3-dag@1.1.0/files/bundle

---

**references:**

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
