import { type Generated, Kysely, sql } from "kysely";
import { beforeEach, expect, test } from "vitest";
import { Fmt } from "../../src/helpers/fmt";
import { createDatabaseWithSqlocal } from "../../src/helpers/sqlocal";

function randNumber(options: { min: number; max: number }) {
  return options.min + Math.floor(Math.random() * (options.max - options.min));
}

const database = createDatabaseWithSqlocal({
  databasePath: process.env.NODE_ENV === "test" ? ":memory:" : ":localStorage:",
});
const skipBenchmarks = false;

beforeEach(async () => {
  await database.deleteDatabaseFile();
});

test.skipIf(skipBenchmarks)("sqlocal bench", async () => {
  type FooTable = {
    id: Generated<number>;
    data: {
      names: string[];
    };
  };
  const db = database.db as Kysely<{ foo: FooTable }>;
  await db.schema
    /* wrap. */
    .createTable("foo")
    .ifNotExists()
    .addColumn("id", "integer", (it) => it.primaryKey().autoIncrement())
    .addColumn("data", "jsonb", (it) => it.notNull())
    .execute();

  // warm up.
  for (const _ of Array(10_000).keys()) {
    await db.selectFrom("foo").limit(1).selectAll().execute();
  }

  {
    const startTime = performance.now();
    const entry = {
      id: 1,
      data: {
        names: ["inky", "blinky", "pinky"],
      },
    };
    await db.insertInto("foo").values(entry).execute();
    // insert: 3ms
    console.log("insert:", Fmt.millis(performance.now() - startTime, "millis"));
  }

  {
    const startTime = performance.now();
    const q = db
      /* wrap. */
      .selectFrom("foo")
      .selectAll()
      .where("id", "=", 1)
      .limit(1)
      .compile();
    for (const _ of Array(10_000).keys()) {
      const r = await db.executeQuery(q);
      expect(r.rows).toHaveLength(1);
    }
    // select compiled: 353ms
    console.log("select compiled:", Fmt.millis(performance.now() - startTime, "millis"));
  }

  {
    const startTime = performance.now();
    for (const _ of Array(10_000).keys()) {
      const q = db
        /* wrap. */
        .selectFrom("foo")
        .selectAll()
        .where("id", "=", 1)
        .limit(1);
      const r = await q.execute();
      expect(r).toHaveLength(1);
    }
    // select: 448ms
    console.log("select:", Fmt.millis(performance.now() - startTime, "millis"));
  }
});

test.skipIf(skipBenchmarks)("sqlocal bench index", async () => {
  type FooTable = {
    id: Generated<number>;
    copyid: number;
    data: {
      jsonid: number;
      names: string[];
    };
  };
  const db = database.db as Kysely<{ foo: FooTable }>;
  await db.schema
    /* wrap. */
    .createTable("foo")
    .ifNotExists()
    .addColumn("id", "integer", (it) => it.primaryKey().autoIncrement())
    .addColumn("copyid", "integer", (it) => it.notNull())
    .addColumn("data", "jsonb", (it) => it.notNull())
    .execute();
  await db.schema
    /* wrap. */
    .createIndex("foo_copyid_idx")
    .on("foo")
    .column("copyid")
    .execute();
  await db.schema
    /* wrap. */
    .createIndex("foo_data_jsonid_idx")
    .on("foo")
    .expression(sql`"data"->>'jsonid'`)
    .execute();

  // warm up.
  for (const _ of Array(10_000).keys()) {
    await db.selectFrom("foo").limit(1).selectAll().execute();
  }

  {
    const startTime = performance.now();
    for (const index of Array(10_000).keys()) {
      const id = index + 1;
      const entry = {
        id,
        copyid: id,
        data: {
          jsonid: id,
          names: ["inky", "blinky", "pinky"],
        },
      };
      await db.insertInto("foo").values(entry).execute();
    }
    // insert: 772ms
    console.log("insert:", Fmt.millis(performance.now() - startTime, "millis"));
  }

  // warm up.
  for (const _ of Array(10_000).keys()) {
    await db.selectFrom("foo").limit(1).selectAll().execute();
  }

  {
    const startTime = performance.now();
    const id = randNumber({ min: 1, max: 999 });
    const q = db
      .selectFrom("foo")
      .selectAll()
      .where("copyid", "=", id)
      .where(sql`"data"->>'jsonid'`, "=", id)
      .limit(1)
      .compile();
    for (const _ of Array(10_000).keys()) {
      const r = await db.executeQuery(q);
      expect(r.rows).toHaveLength(1);
    }
    // select compiled: 450ms
    console.log("select compiled:", Fmt.millis(performance.now() - startTime, "millis"));
  }

  {
    const startTime = performance.now();
    for (const _ of Array(10_000).keys()) {
      const id = randNumber({ min: 1, max: 999 });
      const q = db
        .selectFrom("foo")
        .selectAll()
        .where("copyid", "=", id)
        .where(sql`"data"->>'jsonid'`, "=", id)
        .limit(1);
      const r = await q.execute();
      expect(r).toHaveLength(1);
    }
    // select: 662ms
    console.log("select:", Fmt.millis(performance.now() - startTime, "millis"));
  }
});
