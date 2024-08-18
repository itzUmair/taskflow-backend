import { migrate } from "drizzle-orm/node-postgres/migrator";
import connectDB, { closeDB } from ".";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const db = await connectDB();
  await migrate(db, { migrationsFolder: "./drizzle" });
  await closeDB();
  console.log("migrations complete!");
}

main();
