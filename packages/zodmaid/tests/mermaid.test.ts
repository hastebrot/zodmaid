import { expect, test } from "bun:test";

// https://github.com/nitrictech/nitric/blob/v1.27.1/docs/docs/architecture/index.mdx
const chart = [
  { node: "Browser", "[]": "Client Browser" },
  { node: "API", "[]": "HTTP API - API Gateway" },
  { node: "Service", "[]": "GET Route" },
  { node: "Service2", "[]": "POST Route" },
  { node: "Service3", "[]": "Other Services/APIs" },
  { node: "Bucket", "[]": "Storage Bucket" },
  { node: "Secrets", "[]": "Secrets Manager" },
  { node: "KVStore", "[]": "Key/Value Store" },
  { node: "RDS", "[]": "Relational Database Service" },
  { edge: ["Browser", "API"], "-->": "Sends HTTP Request" },
  { edge: ["API", "Service"], "-->": "Triggers Service" },
  { edge: ["API", "Service2"], "-->": "Triggers Service" },
  { edge: ["API", "Service3"], "-->": "" },
  { edge: ["Service", "Bucket"], "-->": "Read/Write" },
  { edge: ["Service", "Secrets"], "-->": "Access" },
  { edge: ["Service", "KVStore"], "-->": "Read/Write" },
  { edge: ["Service", "RDS"], "-->": "Execute Queries" },
];

test("mermaid", () => {
  expect(chart).toBeArray();
});
