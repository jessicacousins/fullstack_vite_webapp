const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get("/", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Provide an interesting historical fact about United States history.",
        },
      ],
      max_tokens: 100,
    });

    res.json({ fact: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error fetching OpenAI history fact:", error);
    res.status(500).json({ error: "Failed to generate history fact." });
  }
});

module.exports = router;
