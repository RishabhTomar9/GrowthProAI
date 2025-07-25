const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors({
  origin: "https://growthproai-1.onrender.com",
  methods: ["GET", "POST"],
}));
app.use(express.json());

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

// Gemini: Generate SEO headline using AI
const generateAIHeadline = async (name, location) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate a catchy SEO-optimized headline for a business named "${name}" located in "${location}". The headline should be short, engaging, and suitable for boosting search engine ranking.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Optional: Clean extra markdown/formatting if needed
    return text.replace(/(^["`*]+|["`*]+$)/g, "");
  } catch (err) {
    console.error("Error generating headline with Gemini:", err);
    return "Top-Rated Service in Your Area!"; // fallback headline
  }
};

// POST /business-data
app.post("/business-data", async (req, res) => {
  const { name, location } = req.body;

  if (!name?.trim() || !location?.trim()) {
    return res.status(400).json({ error: "Missing or invalid business name or location" });
  }

  const headline = await generateAIHeadline(name, location);

  const data = {
    rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 500 + 50),
    headline,
  };

  return res.status(200).json(data);
});

// GET /regenerate-headline
app.get("/regenerate-headline", async (req, res) => {
  const { name, location } = req.query;

  if (!name?.trim() || !location?.trim()) {
    return res.status(400).json({ error: "Missing query params: name or location" });
  }

  const headline = await generateAIHeadline(name, location);
  return res.status(200).json({ headline });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
