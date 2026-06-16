const { nanoid } = require("nanoid");
const Url = require("../models/Url");

// BUG FIX: The while-loop condition used a truthy DB document as the exit
// condition, which is correct. However, the initial value `exists = true`
// on the first iteration calls nanoid but has no code yet — this is fine.
// Real bug: if the DB is down, this loops infinitely. Added max-retry guard.
const generateUniqueCode = async (length = 7) => {
  const MAX_RETRIES = 10;
  for (let i = 0; i < MAX_RETRIES; i++) {
    const code = nanoid(length);
    const exists = await Url.findOne({ shortCode: code });
    if (!exists) return code;
  }
  throw new Error("Failed to generate a unique short code after multiple attempts");
};

module.exports = { generateUniqueCode };
