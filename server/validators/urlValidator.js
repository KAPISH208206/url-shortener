const validUrl = require("valid-url");

const validateUrl = (req, res, next) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL format. Must include http:// or https://" });
  }

  next();
};

module.exports = { validateUrl };
