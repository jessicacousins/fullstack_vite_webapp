const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const requestIp = require("request-ip"); // For collecting IP address
const useragent = require("useragent"); // For capturing user agent info

// @route POST /api/users/login
// @desc Log last login info in MongoDB (not for re-authentication)
router.post("/login", async (req, res) => {
  const { email } = req.body; // Only email is needed

  try {
    // Find the user by email
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Update login details (optional)
    user.lastLogin = new Date();
    user.ip = requestIp.getClientIp(req);
    user.deviceInfo = useragent.parse(req.headers["user-agent"]).toString();

    await user.save();
    res.status(200).json({ msg: "Login info updated", user });
  } catch (err) {
    console.error("Error during login update:", err.message);
    res.status(500).send("Server error");
  }
});

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

// @route POST /api/users/register
// @desc Register a new user (including capturing IP and User-Agent info)
router.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    bio,
    photoURL,
    googleUID,
    dob, // Date of birth might be missing from Google
    policyAccepted,
  } = req.body;

  try {
    // Check if the user already exists by email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Check if DOB is missing (for Google sign-ups)
    if (!dob) {
      return res
        .status(400)
        .json({ msg: "Date of birth is required for Google sign-ups." });
    }

    // new user object for Google sign-ups
    user = new User({
      firstName,
      lastName,
      email,
      password: password ? await bcrypt.hash(password, 10) : null,
      phone,
      bio,
      photoURL,
      dob,
      googleUID, // Store Google UID for future reference
      policyAccepted,
    });

    // Save the user in the database
    await user.save();
    res.status(200).json({ msg: "User registered successfully", user });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).send("Server error");
  }
});

// @route POST /api/users/update
// @desc Update user profile
router.post("/update", async (req, res) => {
  const { email, firstName, lastName, phone, bio, photoURL } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Update user fields
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.bio = bio;
    user.photoURL = photoURL;

    // Save the updated user to the database
    await user.save();

    res.json({ user });
  } catch (err) {
    console.error("Error updating user profile:", err.message);
    res.status(500).send("Server error");
  }
});

// @route GET /api/users/:email
// @desc Get user profile by email
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Add a comment to a blog post
router.post("/:id/comments", async (req, res) => {
  const { body, user } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    const newComment = {
      body,
      date: new Date(),
      user,
    };

    blog.comments.push(newComment);

    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update Player Score
router.post("/update-score", async (req, res) => {
  const { email, score, didWin } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Increment games played
    user.gamesPlayed += 1;

    if (didWin) {
      user.gamesWon += 1; // Increment games won
      user.currentWinningStreak += 1; // Increment current streak
      if (user.currentWinningStreak > user.longestWinningStreak) {
        user.longestWinningStreak = user.currentWinningStreak; // Update longest streak
      }
    } else {
      user.gamesLost += 1; // Increment games lost
      user.currentWinningStreak = 0; // Reset current streak on loss
    }

    // Check if new score is the highest score
    if (score > user.highestScore) {
      user.highestScore = score;
    }

    // Add the new score with the current date
    user.scores.push({ value: score });

    await user.save();

    res.status(200).json({ msg: "Score updated", user });
  } catch (error) {
    console.error("Error updating score:", error.message);
    res.status(500).send("Server error");
  }
});

// Get User Stats
router.get("/stats/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const stats = {
      gamesPlayed: user.gamesPlayed,
      gamesWon: user.gamesWon,
      gamesLost: user.gamesLost,
      highestScore: user.highestScore,
      longestWinningStreak: user.longestWinningStreak,
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error.message);
    res.status(500).send("Server error");
  }
});

// Update Memory Game Score
router.post("/update-memory-score", async (req, res) => {
  const { email, turns } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Add the new score
    user.memoryGameScores.push({ turns });

    // Update best score
    if (user.bestMemoryGameScore === null || turns < user.bestMemoryGameScore) {
      user.bestMemoryGameScore = turns;
    }

    await user.save();

    res.status(200).json({ msg: "Memory game score updated", user });
  } catch (error) {
    console.error("Error updating memory game score:", error.message);
    res.status(500).send("Server error");
  }
});

// Get Memory Game Stats
router.get("/memory-game-stats/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const stats = {
      gamesPlayed: user.memoryGameScores.length,
      bestScore: user.bestMemoryGameScore,
      scores: user.memoryGameScores,
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching memory game stats:", error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
