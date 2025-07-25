// index.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(
  cors({
    origin: [
      "http://localhost:5173", // your local dev frontend
      "https://growthproai-1.onrender.com", // your deployed React frontend
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});
app.use(limiter);

// Headline Generator Function
const generateHeadlineFromGemini = async (name, location) => {
  const prompt = `Generate a compelling and concise SEO headline for a business named "${name}" located in "${location}". Provide only the headline.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Gemini API error:", errorData);
    throw new Error("Failed to generate headline from Gemini API");
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text.replace(/["\n]/g, "");
};

// POST /business-data
app.post("/business-data", async (req, res) => {
  const { name, location } = req.body;

  if (!name?.trim() || !location?.trim()) {
    return res.status(400).json({ error: "Missing or invalid business name or location" });
  }

  try {
    const headline = await generateHeadlineFromGemini(name, location);
    const data = {
      rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
      reviews: Math.floor(Math.random() * 500 + 50),
      headline,
    };
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error generating headline:", error);
    return res.status(500).json({ error: "Failed to generate headline" });
  }
});

// GET /regenerate-headline
app.get("/regenerate-headline", async (req, res) => {
  const { name, location } = req.query;

  if (!name?.trim() || !location?.trim()) {
    return res.status(400).json({ error: "Missing query params: name or location" });
  }

  try {
    const headline = await generateHeadlineFromGemini(name, location);
    return res.status(200).json({ headline });
  } catch (error) {
    console.error("Error regenerating headline:", error);
    return res.status(500).json({ error: "Failed to regenerate headline" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
