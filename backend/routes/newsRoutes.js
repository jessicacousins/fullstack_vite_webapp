const express = require("express");
const router = express.Router();
const axios = require("axios");

// Get News Data
router.get("/news", async (req, res) => {
  try {
    const response = await axios.get("https://newsdata.io/api/1/news", {
      params: {
        apikey: process.env.NEWS_API_KEY, // located in .env file
        language: "en",
        country: "us",
        category: "top",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;
