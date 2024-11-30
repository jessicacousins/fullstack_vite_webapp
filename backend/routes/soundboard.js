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

router.post("/record-playlist", async (req, res) => {
  const { email, playlistName } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!user.playlistPlays) {
      user.playlistPlays = [];
    }

    user.playlistPlays.push({
      playlistName,
      playedAt: new Date(),
    });

    await user.save();
    res.status(200).json({ msg: "Playlist play recorded successfully" });
  } catch (error) {
    console.error("Error recording playlist play:", error.message);
    res.status(500).json({ msg: "Failed to record playlist play." });
  }
});

router.post("/save-playlist", async (req, res) => {
  const { email, playlistName, sounds } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Add the new playlist
    user.playlists.push({
      name: playlistName,
      sounds,
    });

    await user.save();
    res
      .status(200)
      .json({ msg: "Playlist saved successfully", playlists: user.playlists });
  } catch (error) {
    console.error("Error saving playlist:", error.message);
    res.status(500).json({ msg: "Failed to save playlist." });
  }
});

router.get("/get-playlists/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ playlists: user.playlists });
  } catch (error) {
    console.error("Error fetching playlists:", error.message);
    res.status(500).json({ msg: "Failed to fetch playlists." });
  }
});

module.exports = router;
