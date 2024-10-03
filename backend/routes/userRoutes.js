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
