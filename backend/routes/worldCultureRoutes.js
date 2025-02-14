const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.get("/", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Generate a **concise world culture fact**. No filler content. Only include:
          1. **Country/Region Name**
          2. **Unique Cultural Insight** (tradition, custom, social etiquette, festival, or fun fact).`,
        },
      ],
      max_tokens: 150,
    });

    res.json({ fact: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error fetching world culture fact:", error);
    res.status(500).json({ error: "Failed to generate cultural insight." });
  }
});

module.exports = router;
