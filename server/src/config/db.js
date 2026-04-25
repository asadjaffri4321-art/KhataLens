// ─────────────────────────────────────────────────────────────
// SQLite Database Connection (better-sqlite3)
// ─────────────────────────────────────────────────────────────
// Points to the same khata.db file used by the Python FastAPI
// backend, so both servers share the same data.
// ─────────────────────────────────────────────────────────────

const Database = require("better-sqlite3");
const path = require("path");

// Default: khata.db in the KhataLens project root (one level up from server/)
const DB_PATH = process.env.DB_PATH || path.join(__dirname, "..", "..", "..", "khata.db");

let db;

try {
  db = new Database(DB_PATH, { verbose: console.log });

  // Enable WAL mode for better concurrent read performance
  db.pragma("journal_mode = WAL");

  console.log(`✅ SQLite connected → ${DB_PATH}`);

  // Auto-create tables if they don't exist (mirrors Python api.py schema)
  db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT UNIQUE,
      balance REAL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      customer_id TEXT NOT NULL,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      description TEXT,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers (id)
    );
  `);
} catch (err) {
  console.error("❌ SQLite connection failed:", err.message);
  process.exit(1);
}

module.exports = db;
