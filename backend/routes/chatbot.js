const express = require("express");
const router = express.Router();
const { getChatbotResponse } = require("../services/chatbotService");

router.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;
    const chatbotResponse = await getChatbotResponse(message);
    res.json({ response: chatbotResponse });
  } catch (error) {
    res.status(500).json({ error: "Error processing your request." });
  }
});

module.exports = router;
