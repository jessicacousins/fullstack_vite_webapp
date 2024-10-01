const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @route POST /api/users/register
//  including Google users
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, phone, bio, photoURL } =
    req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user object
    user = new User({
      firstName,
      lastName,
      email,
      password: password ? await bcrypt.hash(password, 10) : null,
      phone,
      bio,
      photoURL,
    });

    // Save the user to the database
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error("Error during user registration:", err.message);
    res.status(500).send("Server error");
  }
});

// @route POST /api/users/update
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

module.exports = router;
