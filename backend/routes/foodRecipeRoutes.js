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
          content: `Generate a **concise food recipe** with an educational insight. No filler content. Include:
          - **Recipe Name**
          - **Short Educational Insight** (technique, history, or key ingredient tip)
          - **Ingredients List**
          - **Step-by-step preparation** (short, clear, and easy to follow).`,
        },
      ],
      max_tokens: 300,
    });

    res.json({ recipe: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error fetching food recipe:", error);
    res.status(500).json({ error: "Failed to generate recipe." });
  }
});

module.exports = router;
