const express = require("express");
const router = express.Router();
const { shortenUrl, getAllUrls } = require("../controllers/urlController");
const { validateUrl } = require("../validators/urlValidator");

router.post("/shorten", validateUrl, shortenUrl);
router.get("/all", getAllUrls);

module.exports = router;
