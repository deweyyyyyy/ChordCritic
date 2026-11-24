import "dotenv/config";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

export const pool = new pg.Pool({
  user: "postgres",
  password: "TestPassword",
  host: "localhost",
  port: 5432,
  database: "chordcritic",
});
