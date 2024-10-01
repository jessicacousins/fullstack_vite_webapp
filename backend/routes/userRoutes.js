const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const useragent = require("useragent");

// @route POST /api/users/register
// @desc Register a new user (including capturing IP and User-Agent info)
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, phone, bio, photoURL } =
    req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Capture IP address and User-Agent string
    const userIP = req.ip; // Get user's IP address
    const agent = useragent.parse(req.headers["user-agent"]); // Get User-Agent info
    const deviceInfo = {
      browser: agent.toAgent(),
      os: agent.os.toString(),
      device: agent.device.toString(),
    };

    // Create a new user object
    user = new User({
      firstName,
      lastName,
      email,
      password: password ? await bcrypt.hash(password, 10) : null,
      phone,
      bio,
      photoURL,
      ip: userIP, // Store IP address
      deviceInfo, // Store device info (browser, OS, device)
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Update last login, IP address, and device info
    user.lastLogin = new Date();
    user.ipAddress = req.ip;
    user.deviceInfo = useragent.parse(req.headers["user-agent"]).toString();

    await user.save();

    res.json(user);
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
