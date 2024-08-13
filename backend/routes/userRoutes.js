const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @route POST /api/users/register
// @desc Register a new user (including Google users)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user object
    user = new User({
      name,
      email,
      password: password ? await bcrypt.hash(password, 10) : null,
    });

    // Save the user to the database
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error("Error during user registration:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
