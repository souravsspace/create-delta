import postgres from "postgres";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";

import { env } from "@/lib/env";
import * as schema from "@/db/schema";

let db: PostgresJsDatabase<typeof schema>;
let pg: ReturnType<typeof postgres>;

if (env.NODE_ENV === "production") {
  pg = postgres(env.DATABASE_URL);
  db = drizzle(pg, { schema });
} else {
  if (!global.db) {
    pg = postgres(env.DATABASE_URL);
    global.db = drizzle(pg, { schema });
  }
  db = global.db;
}

export { db, pg };

declare global {
  // eslint-disable-next-line no-var
  var db: PostgresJsDatabase<typeof schema> | undefined;
}
