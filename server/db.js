import "dotenv/config";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

export const pool = new pg.Pool({
  connectionString,
  // Render and Neon URLs require SSL; local Postgres does not.
  ssl: connectionString.includes("render.com") || connectionString.includes("neon.tech")
    ? { rejectUnauthorized: false }
    : false,
});
