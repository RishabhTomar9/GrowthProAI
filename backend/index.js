const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "https://your-frontend.vercel.app", // Replace with actual frontend domain
    methods: ["GET", "POST"],
  }));
app.use(express.json());

// Rate Limiting Middleware (100 requests per 15 mins per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again later.",
  },
});
app.use(limiter);

// Load SEO templates from JSON
let seoTemplates = [];
try {
  const filePath = path.join(__dirname, "seoTemplates.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  seoTemplates = JSON.parse(fileData);
} catch (err) {
  console.error("Error reading seoTemplates.json:", err);
  process.exit(1); // Exit app if template loading fails
}

// Replace placeholders
const personalizeHeadline = (template, name, location) =>
  template.replaceAll("{name}", name).replaceAll("{location}", location);

// Generate random headline
const generateHeadline = (name, location) => {
  const randomIndex = Math.floor(Math.random() * seoTemplates.length);
  return personalizeHeadline(seoTemplates[randomIndex], name, location);
};

// POST /business-data
app.post("/business-data", (req, res) => {
  const { name, location } = req.body;

  if (!name?.trim() || !location?.trim()) {
    return res.status(400).json({ error: "Missing or invalid business name or location" });
  }

  const data = {
    rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 500 + 50),
    headline: generateHeadline(name, location),
  };

  return res.status(200).json(data);
});

// GET /regenerate-headline
app.get("/regenerate-headline", (req, res) => {
  const { name, location } = req.query;

  if (!name?.trim() || !location?.trim()) {
    return res.status(400).json({ error: "Missing query params: name or location" });
  }

  const headline = generateHeadline(name, location);
  return res.status(200).json({ headline });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
