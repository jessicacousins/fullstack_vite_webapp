const express = require("express");
const router = express.Router();
const Poll = require("../models/Poll");

// creating a new poll
router.post("/create", async (req, res) => {
  const { title, options, creator } = req.body;
  try {
    const poll = new Poll({
      title,
      options: options.map((text) => ({ text })),
      creator,
    });
    await poll.save();
    res.status(201).json(poll);
  } catch (err) {
    console.error("Error creating poll:", err.message);
    res.status(500).send("Server error");
  }
});

// fetch all polls
router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find().populate("creator", "firstName lastName");
    res.status(200).json(polls);
  } catch (err) {
    console.error("Error fetching polls:", err.message);
    res.status(500).send("Server error");
  }
});

// vote on a poll
router.post("/:id/vote", async (req, res) => {
  const { optionIndex } = req.body;
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ msg: "Poll not found" });
    }
    poll.options[optionIndex].votes += 1;
    await poll.save();
    res.status(200).json(poll);
  } catch (err) {
    console.error("Error voting on poll:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
