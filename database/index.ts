import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

let client: Client;

async function connectDB(): Promise<ReturnType<typeof drizzle>> {
  client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  await client.connect();
  const db = drizzle(client);
  return db;
}

export async function closeDB(): Promise<void> {
  client.end();
}

export default connectDB;
