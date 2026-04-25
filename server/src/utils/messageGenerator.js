// ─────────────────────────────────────────────────────────────
// Message Generator — builds reminder strings dynamically
// ─────────────────────────────────────────────────────────────

/**
 * Generate an English payment reminder message.
 *
 * @param {string} name   — Customer name
 * @param {number} amount — Pending balance in Rupees
 * @returns {string}
 */
function generateReminderEN(name, amount) {
  return (
    `Hello ${name}, your pending balance is Rs. ${Number(amount).toLocaleString("en-PK")}. ` +
    `Please clear it at your earliest convenience. Thank you — KhataLens`
  );
}

/**
 * Generate an Urdu payment reminder message.
 * Uses Unicode Urdu script so it renders correctly on any phone.
 *
 * @param {string} name   — Customer name
 * @param {number} amount — Pending balance in Rupees
 * @returns {string}
 */
function generateReminderUR(name, amount) {
  return (
    `السلام علیکم ${name}، آپ کا بقایا بیلنس ${Number(amount).toLocaleString("ur-PK")} روپے ہے۔ ` +
    `براہ کرم جلد از جلد ادائیگی کریں۔ شکریہ — خاتا لینز`
  );
}

module.exports = { generateReminderEN, generateReminderUR };
