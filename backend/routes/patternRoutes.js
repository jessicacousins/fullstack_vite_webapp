const express = require("express");
const router = express.Router();
const Pattern = require("../models/Pattern");
let patterns = {
  shapes: [],
  background: "#ffffff",
};

router.get("/", (req, res) => {
  res.json(patterns);
});

router.post("/addShape", (req, res) => {
  const newShape = req.body;
  patterns.shapes.push(newShape);
  res.json(newShape);
});

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

router.put("/updateShape/:id", (req, res) => {
  const shapeId = parseInt(req.params.id, 10);
  const updatedShape = req.body;

  patterns.shapes = patterns.shapes.map((shape) =>
    shape.id === shapeId ? updatedShape : shape
  );

  res.json({ message: "Shape updated successfully" });
});

router.post("/", (req, res) => {
  const { shapes, background, image } = req.body;
  patterns = { shapes, background };
  console.log("Saved pattern image:", image);
  res.json({ message: "Pattern saved successfully" });
});

module.exports = router;
