const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const requestIp = require("request-ip"); // For collecting IP address
const useragent = require("useragent"); // For capturing user agent info

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
  const { firstName, lastName, email, password, phone, bio, photoURL, dob } =
    req.body;

  try {
    // Age check for users under 13 (COPPA compliance)
    const age = calculateAge(dob);
    if (age < 13) {
      return res.status(400).json({ msg: "Users under 13 cannot register." });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Capture IP address and User-Agent string
    const ip = requestIp.getClientIp(req);
    const agent = useragent.parse(req.headers["user-agent"]);
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
      password: hashedPassword,
      phone,
      bio,
      photoURL,
      dob,
      ip,
      deviceInfo,
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

// @route POST /api/users/login
// @desc User login with logging of device info and IP
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Update last login, IP address, and device info
    user.lastLogin = new Date();
    user.ip = requestIp.getClientIp(req);
    user.deviceInfo = useragent.parse(req.headers["user-agent"]).toString();

    await user.save();

    res.json(user);
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
