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

mindmaps:
- https://github.com/mermaid-js/mermaid/blob/mermaid%4011.6.0/packages/mermaid/src/diagrams/mindmap/mindmapRenderer.ts
- https://github.com/cytoscape/cytoscape.js-cose-bilkent

> U. Dogrusoz, E. Giral, A. Cetintas, A. Civril, and E. Demir, "A Layout Algorithm For Undirected Compound Graphs", Information Sciences, 179, pp. 980-994, 2009.

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
