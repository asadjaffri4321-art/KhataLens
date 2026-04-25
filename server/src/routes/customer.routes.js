// ─────────────────────────────────────────────────────────────
// Customer Routes  —  lightweight read endpoints for testing
// ─────────────────────────────────────────────────────────────
// These endpoints let you view customers without needing the
// Vite frontend or the Python FastAPI server.
// ─────────────────────────────────────────────────────────────

const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ── GET /api/customers — List all customers ──────────────
router.get("/customers", (_req, res) => {
  try {
    const customers = db
      .prepare("SELECT id, name, phone, balance, created_at FROM customers ORDER BY balance DESC")
      .all();
    return res.json({ success: true, count: customers.length, data: customers });
  } catch (err) {
    console.error("🔴 GET /customers:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ── GET /api/customers/pending — Only customers with balance > 0 ─
router.get("/customers/pending", (_req, res) => {
  try {
    const customers = db
      .prepare(
        `SELECT id, name, phone, balance
           FROM customers
          WHERE balance > 0 AND phone IS NOT NULL
          ORDER BY balance DESC`
      )
      .all();
    return res.json({ success: true, count: customers.length, data: customers });
  } catch (err) {
    console.error("🔴 GET /customers/pending:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
