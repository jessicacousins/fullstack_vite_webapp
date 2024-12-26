const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const authMiddleware = require("../middleware/authMiddleware");

// Middleware to ensure only "god" users can assign roles
const godMiddleware = (req, res, next) => {
  const user = req.user;
  if (user && user.role === "god") {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "Access denied. God-tier access required." });
  }
};

// Assign role to a user
router.put("/assign-role", authMiddleware, godMiddleware, async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ error: "Email and role are required." });
  }

  try {
    const employee = await Employee.findOneAndUpdate(
      { email },
      { role },
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }
    res.json({ message: "Role updated successfully.", employee });
  } catch (error) {
    console.error("Error updating role:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
