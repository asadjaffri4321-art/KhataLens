// ─────────────────────────────────────────────────────────────
// WhatsApp Cloud API Service
// ─────────────────────────────────────────────────────────────
// Wraps the Meta Graph API call that sends a plain-text
// WhatsApp message to a single recipient.
//
// Docs: https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages
// ─────────────────────────────────────────────────────────────

const axios = require("axios");

// Read credentials from environment
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const BASE_URL = `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`;

/**
 * Send a text message via Meta WhatsApp Cloud API.
 *
 * @param {string} to  — Recipient phone in international format WITHOUT '+' (e.g. "923001234567")
 * @param {string} body — The message text to send
 * @returns {Promise<object>} — Axios response data from the WhatsApp API
 */
async function sendWhatsAppMessage(to, body) {
  // ── Validate credentials ────────────────────────────────
  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    throw new Error(
      "Missing WhatsApp credentials. Set WHATSAPP_TOKEN and PHONE_NUMBER_ID in .env"
    );
  }

  // ── Build the request payload ───────────────────────────
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to, // e.g. "923001234567"
    type: "text",
    text: {
      preview_url: false,
      body, // The message string
    },
  };

  // ── Send via Meta Graph API ─────────────────────────────
  try {
    const response = await axios.post(BASE_URL, payload, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log(
      `✅ WhatsApp message sent to ${to}  |  msgId: ${response.data?.messages?.[0]?.id}`
    );
    return response.data;
  } catch (error) {
    // Extract a meaningful error from Meta's response (if present)
    const metaError = error.response?.data?.error;
    console.error("❌ WhatsApp API Error:", metaError || error.message);
    throw {
      status: error.response?.status || 500,
      message: metaError?.message || error.message,
      details: metaError,
    };
  }
}

module.exports = { sendWhatsAppMessage };
