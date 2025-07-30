import { Kysely, sql } from "kysely";
import { beforeEach, expect, test } from "vitest";
import { createDatabaseWithSqlocal } from "../../src/helpers/sqlocal";

const database = createDatabaseWithSqlocal({
  databasePath: process.env.NODE_ENV === "test" ? ":memory:" : ":localStorage:",
});

beforeEach(async () => {
  await database.deleteDatabaseFile();
});

test("node sql", async () => {
  type NodeTable = {
    id: string;
    created_time?: Date;
    updated_time?: Date;
    title_text?: string;
    description_text?: string;
    items_array?: {
      id_node: string;
    }[];
    tags_array?: {
      id_tag: string;
    }[];
  };
  const db = database.db as Kysely<{ node: NodeTable }>;
  await db.schema
    /* wrap. */
    .createTable("node")
    .ifNotExists()
    .addColumn("id", "text", (it) => it.notNull().unique())
    .addColumn("created_time", "timestamp", (it) => it.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn("updated_time", "timestamp", (it) => it.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn("title_text", "text")
    .addColumn("description_text", "text")
    .addColumn("items_array", "jsonb")
    .addColumn("tags_array", "jsonb")
    .execute();
  await db.schema
    /* wrap. */
    .createIndex("node_items_array_idx")
    .on("node")
    .column("items_array")
    .execute();
  {
    const entry = {
      id: "1",
      items_array: [{ id_node: "2" }, { id_node: "3" }],
      tags_array: [{ id_tag: "2" }, { id_tag: "3" }],
    };
    await db.insertInto("node").values(entry).execute();
  }
  {
    for (const _ of Array(1).keys()) {
      const q = db
        /* wrap. */
        .selectFrom([
          // wrap.
          "node",
          sql`json_each(items_array)`.as("items_array"),
          sql`json_each(tags_array)`.as("tags_array"),
        ])
        // .distinct()
        .selectAll("node")
        .where("node.id", "=", "1")
        .where(sql`items_array.value->>'id_node'`, "=", "2")
        .where(sql`tags_array.value->>'id_tag'`, "=", "2")
        .limit(1);
      // console.table(await q.explain());
      const r = await q.execute();
      expect(r).toHaveLength(1);
      console.log(Bun.inspect(r, { colors: true }));
    }
  }
});
