const express = require("express");
const router = express.Router();
const Pattern = require("../models/Pattern");

// Save new pattern
router.post("/", async (req, res) => {
  const { image, shapes, background } = req.body;

  try {
    const newPattern = new Pattern({
      image,
      shapes,
      background,
      createdAt: new Date(),
    });
    await newPattern.save();
    res.status(201).json(newPattern);
  } catch (error) {
    console.error("Error saving pattern:", error);
    res.status(500).json({ error: "Failed to save pattern" });
  }
});

// Get all saved patterns
router.get("/", async (req, res) => {
  try {
    const patterns = await Pattern.find();
    res.json(patterns);
  } catch (error) {
    console.error("Error fetching patterns:", error);
    res.status(500).json({ error: "Failed to fetch patterns" });
  }
});

module.exports = router;
