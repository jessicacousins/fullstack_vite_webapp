const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @route POST /api/users
// @desc Register a new user
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({
      name,
      email,
      password, // note: need to change later and add secure password
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
