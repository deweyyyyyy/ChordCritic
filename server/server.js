import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "./db.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") ?? true }));

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRET is not set. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

const signToken = (user) =>
  jwt.sign({ sub: String(user.id), username: user.username }, JWT_SECRET, { expiresIn: "7d" });

function requireAuth(req, res, next) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "missing bearer token" });
  try {
    req.auth = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "invalid or expired token" });
  }
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body ?? {};
  if (!username || !email || !password)
    return res.status(400).json({ error: "username, email, and password are required" });
  if (password.length < 8)
    return res.status(400).json({ error: "password must be at least 8 characters" });

  const password_hash = await bcrypt.hash(password, 10);
  try {
    const sql = "insert into users (username, email, password_hash) " +
      "values ($1, lower($2), $3) " +
      "returning id, username, email, display_name, created_at";
    const { rows } = await pool.query(sql, [username.trim(), email, password_hash]);
    res.status(201).json({ token: signToken(rows[0]), user: rows[0] });
  } catch (err) {
    if (err.code === "23505") {
      const field = err.constraint?.includes("email") ? "email" : "username";
      return res.status(409).json({ error: "that " + field + " is already taken" });
    }
    throw err;
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password)
    return res.status(400).json({ error: "email and password are required" });

  const sql = "select id, username, email, display_name, password_hash, created_at " +
    "from users where email = lower($1)";
  const { rows } = await pool.query(sql, [email]);
  const user = rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash)))
    return res.status(401).json({ error: "invalid email or password" });

  delete user.password_hash;
  res.json({ token: signToken(user), user });
});

app.get("/api/auth/me", requireAuth, async (req, res) => {
  const { rows } = await pool.query(
    "select id, username, email, display_name, created_at from users where id = $1",
    [req.auth.sub]
  );
  if (!rows[0]) return res.status(404).json({ error: "user not found" });
  res.json({ user: rows[0] });
});

// Express 5 forwards thrown async errors here
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "internal server error" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("ChordCritic API listening on port " + port));
