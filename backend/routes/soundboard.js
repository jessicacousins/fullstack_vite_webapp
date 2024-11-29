const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/record", async (req, res) => {
  const { email, soundName } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!user.soundPlays) {
      user.soundPlays = [];
    }

    user.soundPlays.push({
      soundName: soundName,
      playedAt: new Date(),
    });

    await user.save();
    res.status(200).json({ msg: "Sound play recorded successfully" });
  } catch (error) {
    console.error("Error recording sound play:", error.message);
    res.status(500).json({ msg: "Failed to record sound play." });
  }
});

module.exports = router;
