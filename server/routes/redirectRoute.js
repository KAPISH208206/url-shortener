const express = require("express");
// BUG FIX: mergeParams: true is required so that /:code defined in index.js
// is accessible as req.params.code inside this router.
// Without it, req.params is empty and code is always undefined,
// causing every redirect to return 404.
const router = express.Router({ mergeParams: true });
const Url = require("../models/Url");

router.get("/", async (req, res) => {
  const code = req.params.code;

  try {
    const url = await Url.findOneAndUpdate(
      { shortCode: code },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
