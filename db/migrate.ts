import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, pg } from "@/db";

async function init() {
  try {
    await migrate(db, { migrationsFolder: "./db/migrations" });
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Error during migration:", error);
    throw error;
  } finally {
    await pg.end();
  }
}

init().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
