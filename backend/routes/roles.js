const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized access." });
  }

  const token = authHeader.split(" ")[1];
  try {
   
    req.user = { email: "god@example.com", role: "god" }; // Mocked for now
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

// Assign a role to an employee
router.put("/assign-role", authMiddleware, async (req, res) => {
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

    res.status(200).json({
      message: "Role updated successfully.",
      updatedRole: employee.role,
    });
  } catch (error) {
    console.error("Error updating role:", error.message);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
