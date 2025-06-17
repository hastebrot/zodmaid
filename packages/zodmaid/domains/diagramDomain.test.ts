import { describe, test } from "bun:test";
import { arrow, attr, cell, edge, id, node, shape } from "./diagramDomain";

const d1 = node(attr("shape", "class"), "Pirate", ["beard", "parrot"]);

// https://www.nomnoml.com/
// https://github.com/skanaar/nomnoml/blob/v1.7.0/index.html#L272-L288
/* nomnoml */ `
[<start>start] -> [<state>plunder] -> [<choice>more loot] -> [start]
[more loot] no ->[<end>end]

[Pirate|
  [beard]--[parrot]
  [beard]-:>[foul mouth]
]

[<table>mischief| bawl | sing || yell | drink ]

[<abstract>Marauder]<:--[Pirate]
[Pirate] - 0..7[mischief]
[<actor id=sailor>Jolly;Sailor]
[sailor]->[Pirate]
[sailor]->[rum]
[Pirate]-> *[rum|tastiness: Int|swig()]
`;

const d2 = [
  edge(
    node(shape("start"), "start"),
    arrow("->"),
    node(shape("state"), "plunder"),
    arrow("->"),
    node(shape("choice"), "more loot"),
    arrow("->"),
    node("start")
  ),
  edge(node("more loot"), "no", arrow("->"), node(shape("end"), "end")),
  node(
    "Pirate",
    cell(edge("beard", arrow("--"), "parrot"), edge("beard", arrow("-:>"), "foul mouth"))
  ),
  node(
    shape("table"),
    "mischief",
    cell(cell("bawl"), cell("sing")),
    cell(cell("yell"), cell("drink"))
  ),
  edge(node("Pirate"), arrow("--:>"), node(shape("abstract"), "Marauder")),
  edge(node("Pirate"), arrow("-"), "0..7", node("mischief")),
  node(shape("actor"), attr("id", "sailor"), ["Jolly", "Sailor"]),
  edge(node("sailor"), arrow("->"), node("Pirate")),
  edge(node("sailor"), arrow("->"), node("rum")),
  edge(node("Pirate"), arrow("->"), "*", node("rum", cell("tastiness: Int"), cell("swig()"))),
];

// https://nitric.io/docs/architecture#example-handling-http-requests
// https://github.com/nitrictech/nitric/blob/v1.27.1/docs/docs/architecture/index.mdx
/* mermaid */ `
flowchart TD
  %% Actors
  Browser[Client Browser]

  %% Nitric Application Containers
  API[HTTP API - API Gateway]
  Service[GET Route]
  Service2[POST Route]
  Service3[Other Services/APIs]

  %% Backend Services / Resources
  Bucket[Storage Bucket]
  Secrets[Secrets Manager]
  KVStore[Key/Value Store]
  RDS[Relational Database Service]

  %% Interactions
  Browser -->|Sends HTTP Request| API
  API -->|Triggers Service| Service
  API -->|Triggers Service| Service2
  API -->Service3
  Service -->|Read/Write| Bucket
  Service -->|Access| Secrets
  Service -->|Read/Write| KVStore
  Service -->|Execute Queries| RDS
`;

const d3 = [
  node(id("browser"), "Client Browser"),
  node(id("api"), "HTTP API - API Gateway"),
  node(id("service"), "GET Route"),
  node(id("service2"), "POST Route"),
  node(id("service3"), "Other Services/APIs"),
  node(id("bucket"), "Storage Bucket"),
  node(id("secrets"), "Secrets Manager"),
  node(id("kvstore"), "Key/Value Store"),
  node(id("rds"), "Relational Database Service"),

  edge(node("browser"), arrow("->"), node("api"), "Sends HTTP Request"),
  edge(node("api"), arrow("->"), node("service"), "Triggers Service"),
  edge(node("api"), arrow("->"), node("service2"), "Triggers Service"),
  edge(node("api"), arrow("->"), node("service3"), ""),
  edge(node("service"), arrow("->"), node("bucket"), "Read/Write"),
  edge(node("service"), arrow("->"), node("secrets"), "Access"),
  edge(node("service"), arrow("->"), node("kvstore"), "Read/Write"),
  edge(node("service"), arrow("->"), node("rds"), "Execute Queries"),
];

describe("diagram domain", () => {
  test("d1", () => {
    if (!process.env.CI) {
      console.log(d1);
    }
  });

  test("d2", () => {
    if (!process.env.CI) {
      console.log(d2);
    }
  });

  test("d3", () => {
    if (!process.env.CI) {
      console.log(d3);
    }
  });
});
