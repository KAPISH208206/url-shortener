require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: ["https://url-shortener-flax-pi.vercel.app", "http://localhost:3000"]
}));
app.use(express.json());

app.use("/api/url", urlRoutes);

// BUG FIX: The redirect route must come BEFORE the notFound middleware,
// and it must be mounted with a named param ":code" which the child router
// reads via mergeParams:true.
// Previously the route path "/:code" conflicted with everything; now explicit.
app.use("/:code", require("./routes/redirectRoute"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
