const express = require("express");
const router = express.Router();
const { getChatbotResponse } = require("../services/chatbotService");
const { getProductRecommendations } = require("../services/chatbotService");
const UserInterest = require("../models/UserInterest");
const User = require("../models/User");

router.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;
    const chatbotResponse = await getChatbotResponse(message);
    res.json({ response: chatbotResponse });
  } catch (error) {
    res.status(500).json({ error: "Error processing your request." });
  }
});

router.post("/recommendations", async (req, res) => {
  const { category } = req.body;

  try {
    // Generate recommendations
    const recommendations = await getProductRecommendations(category);
    console.log("Generated recommendations:", recommendations);

    // Respond with recommendations
    res.json({ recommendations });
  } catch (error) {
    console.error("Error in recommendation endpoint:", error);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
});

module.exports = router;
