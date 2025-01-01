const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Fetch stats for Tic Tac Toe
router.get("/stats/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const stats = {
      gamesPlayed: user.ticTacToeGamesPlayed || 0,
      gamesWon: user.ticTacToeGamesWon || 0,
      gamesLost: user.ticTacToeGamesLost || 0,
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error.message);
    res.status(500).send("Server error");
  }
});

// Update stats for Tic Tac Toe
router.post("/update-stats", async (req, res) => {
  const { email, didWin } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.ticTacToeGamesPlayed = (user.ticTacToeGamesPlayed || 0) + 1;
    if (didWin) {
      user.ticTacToeGamesWon = (user.ticTacToeGamesWon || 0) + 1;
    } else {
      user.ticTacToeGamesLost = (user.ticTacToeGamesLost || 0) + 1;
    }

    await user.save();

    res.status(200).json({ msg: "Stats updated successfully", user });
  } catch (error) {
    console.error("Error updating stats:", error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
