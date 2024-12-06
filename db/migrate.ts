import "dotenv/config";

import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, pg } from "@/db";

async function init() {
  await migrate(db, { migrationsFolder: "./db/migrations" });
  await pg.end();
}

init();
