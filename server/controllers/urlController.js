const Url = require("../models/Url");
const { generateUniqueCode } = require("../utils/codeGenerator");

// POST /api/url/shorten
const shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

    // Return existing short URL if already shortened
    const existing = await Url.findOne({ originalUrl });
    if (existing) {
      return res.status(200).json({
        shortUrl: `${BASE_URL}/${existing.shortCode}`,
        shortCode: existing.shortCode,
        originalUrl: existing.originalUrl,
        clicks: existing.clicks,
      });
    }

    const shortCode = await generateUniqueCode();
    const url = await Url.create({ originalUrl, shortCode });

    res.status(201).json({
      shortUrl: `${BASE_URL}/${url.shortCode}`,
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
      clicks: url.clicks,
    });
  } catch (err) {
    // BUG FIX: previously swallowed the error message; now log it and return
    // more informative response in development.
    console.error("shortenUrl error:", err.message);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// GET /api/url/all
const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 }).limit(20);
    const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
    const result = urls.map((u) => ({
      shortUrl: `${BASE_URL}/${u.shortCode}`,
      shortCode: u.shortCode,
      originalUrl: u.originalUrl,
      clicks: u.clicks,
      createdAt: u.createdAt,
    }));
    res.json(result);
  } catch (err) {
    console.error("getAllUrls error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { shortenUrl, getAllUrls };
