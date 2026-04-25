// ─────────────────────────────────────────────────────────────
// Reminder Routes  —  POST /api/send-reminder
//                      POST /api/send-reminder/:customerId
// ─────────────────────────────────────────────────────────────
// • POST /api/send-reminder          → Sends reminders to ALL customers with balance > 0
// • POST /api/send-reminder/:id      → Sends a reminder to ONE specific customer
//
// Query params:
//   ?lang=ur   → Send message in Urdu (default: en)
// ─────────────────────────────────────────────────────────────

const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { sendWhatsAppMessage } = require("../services/whatsapp.service");
const { generateReminderEN, generateReminderUR } = require("../utils/messageGenerator");

// ─────────────────────────────────────────────────────────
// POST /api/send-reminder
// Fetch ALL customers with balance > 0, send each a reminder
// ─────────────────────────────────────────────────────────
router.post("/send-reminder", async (req, res) => {
  try {
    // ── 1. Fetch customers with pending balance ──────────
    const customers = db
      .prepare(
        `SELECT id, name, phone, balance
           FROM customers
          WHERE balance > 0
            AND phone IS NOT NULL
          ORDER BY balance DESC`
      )
      .all();

    if (customers.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No customers with pending balance found.",
        sent: 0,
      });
    }

    // ── 2. Determine language ────────────────────────────
    const lang = (req.query.lang || "en").toLowerCase();

    // ── 3. Send reminders concurrently ───────────────────
    const results = await Promise.allSettled(
      customers.map(async (customer) => {
        const messageText =
          lang === "ur"
            ? generateReminderUR(customer.name, customer.balance)
            : generateReminderEN(customer.name, customer.balance);

        const apiResponse = await sendWhatsAppMessage(customer.phone, messageText);

        return {
          customerId: customer.id,
          name: customer.name,
          phone: customer.phone,
          message: messageText,
          whatsappResponse: apiResponse,
        };
      })
    );

    // ── 4. Separate successes from failures ──────────────
    const sent = [];
    const failed = [];

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        sent.push(result.value);
      } else {
        failed.push({
          customerId: customers[index].id,
          name: customers[index].name,
          phone: customers[index].phone,
          error: result.reason?.message || String(result.reason),
        });
      }
    });

    // ── 5. Respond ───────────────────────────────────────
    console.log(`📤 Bulk reminder: ${sent.length} sent, ${failed.length} failed`);

    return res.status(200).json({
      success: true,
      totalCustomers: customers.length,
      sent: sent.length,
      failed: failed.length,
      details: { sent, failed },
    });
  } catch (error) {
    console.error("🔴 /send-reminder error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ─────────────────────────────────────────────────────────
// POST /api/send-reminder/:customerId
// Send a reminder to a SINGLE customer by their ID
// ─────────────────────────────────────────────────────────
router.post("/send-reminder/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;

    // ── 1. Fetch the specific customer ───────────────────
    const customer = db
      .prepare(`SELECT id, name, phone, balance FROM customers WHERE id = ?`)
      .get(customerId);

    if (!customer) {
      return res.status(404).json({ success: false, error: "Customer not found" });
    }

    if (!customer.phone) {
      return res
        .status(400)
        .json({ success: false, error: "Customer has no phone number on file" });
    }

    if (customer.balance <= 0) {
      return res.status(200).json({
        success: true,
        message: `${customer.name} has no pending balance.`,
      });
    }

    // ── 2. Build message ─────────────────────────────────
    const lang = (req.query.lang || "en").toLowerCase();
    const messageText =
      lang === "ur"
        ? generateReminderUR(customer.name, customer.balance)
        : generateReminderEN(customer.name, customer.balance);

    // ── 3. Send via WhatsApp ─────────────────────────────
    const whatsappResponse = await sendWhatsAppMessage(customer.phone, messageText);

    console.log(`📤 Reminder sent → ${customer.name} (${customer.phone})`);

    return res.status(200).json({
      success: true,
      data: {
        customerId: customer.id,
        name: customer.name,
        phone: customer.phone,
        message: messageText,
        whatsappResponse,
      },
    });
  } catch (error) {
    console.error("🔴 /send-reminder/:id error:", error);
    return res.status(error.status || 500).json({
      success: false,
      error: error.message || "Failed to send reminder",
      details: error.details || null,
    });
  }
});

module.exports = router;
