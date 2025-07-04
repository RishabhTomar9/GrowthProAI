const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(express.json())

// Sample SEO headlines
const seoHeadlines = [
  "Why {name} is {location}'s Top Choice for Quality in 2025",
  "Discover the Magic of {name} in {location}",
  "How {name} is Changing the Game for Businesses in {location}",
  "{name}: Your Go-To Brand in {location}",
  "People in {location} Love {name} – Here's Why!",
  "{name} Dominates the Scene in {location} in 2025",
]

// Helper to randomize and personalize headline
const generateHeadline = (name, location) => {
  const randomIndex = Math.floor(Math.random() * seoHeadlines.length)
  return seoHeadlines[randomIndex].replace('{name}', name).replace('{location}', location)
}

// POST /business-data
app.post('/business-data', (req, res) => {
  const { name, location } = req.body
  if (!name || !location) {
    return res.status(400).json({ error: 'Missing business name or location' })
  }

  const responseData = {
    rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1), // random rating between 3.5–5.0
    reviews: Math.floor(Math.random() * 500 + 50),       // random reviews between 50–550
    headline: generateHeadline(name, location),
  }

  res.json(responseData)
})

// GET /regenerate-headline
app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query
  if (!name || !location) {
    return res.status(400).json({ error: 'Missing query params: name or location' })
  }

  const headline = generateHeadline(name, location)
  res.json({ headline })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
