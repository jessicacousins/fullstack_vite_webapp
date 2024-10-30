const express = require("express");
const { getLearningContent } = require("../services/learningService");

const router = express.Router();

router.post("/insights", async (req, res) => {
  const { label } = req.body;

  try {
    const insight = await getLearningContent(label);
    res.json({ insight });
  } catch (error) {
    console.error("Error fetching learning content:", error);
    res.status(500).json({ error: "Failed to fetch educational insights." });
  }
});

module.exports = router;
