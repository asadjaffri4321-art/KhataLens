// ─────────────────────────────────────────────────────────────
// KhataLens WhatsApp Reminder Server — Entry Point
// ─────────────────────────────────────────────────────────────
// Loads environment variables, wires up middleware, mounts
// routes, and starts the Express server.
// ─────────────────────────────────────────────────────────────

require("dotenv").config(); // Load .env BEFORE anything else

const express = require("express");
const cors = require("cors");
const reminderRoutes = require("./routes/reminder.routes");
const customerRoutes = require("./routes/customer.routes");

const app = express();

// ── Middleware ─────────────────────────────────────────────
app.use(cors()); // Allow cross-origin requests (Vite frontend)
app.use(express.json()); // Parse JSON request bodies

// ── Health Check ──────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "khatalens-whatsapp", timestamp: new Date().toISOString() });
});

// ── Routes ────────────────────────────────────────────────
app.use("/api", reminderRoutes);
app.use("/api", customerRoutes);

// ── Global Error Handler ──────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("🔴 Unhandled Error:", err);
  res.status(500).json({ success: false, error: "Internal server error" });
});

// ── Start Server ──────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🟢 KhataLens WhatsApp server running → http://localhost:${PORT}`);
  console.log(`   Health check → http://localhost:${PORT}/health\n`);
});
