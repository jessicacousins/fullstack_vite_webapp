const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const TimeEntry = require("../models/TimeEntry");

// Clock In
router.post("/clock-in", async (req, res) => {
  const { email, isHoliday = false } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Employee email is required." });
  }

  try {
    let employee = await Employee.findOne({ email });

    if (!employee) {
      employee = new Employee({ name: email, email, wage: 0 });
      await employee.save();
    }

    const timeEntry = new TimeEntry({
      employee: employee._id,
      clockIn: new Date(),
      isHoliday,
    });

    await timeEntry.save();
    res.status(201).json(timeEntry);
  } catch (error) {
    console.error("Clock-in error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Clock Out
router.post("/clock-out/:id", async (req, res) => {
  try {
    const timeEntry = await TimeEntry.findById(req.params.id);
    if (!timeEntry || timeEntry.clockOut) {
      return res
        .status(400)
        .json({ error: "Invalid or already clocked-out entry." });
    }

    timeEntry.clockOut = new Date();
    await timeEntry.save();
    res.json(timeEntry);
  } catch (error) {
    console.error("Clock-out error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch Time Entries - Employee
router.get("/employee/:email", async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.params.email });
    if (!employee)
      return res.status(404).json({ error: "Employee not found." });

    const timeEntries = await TimeEntry.find({ employee: employee._id });
    res.json(timeEntries);
  } catch (error) {
    console.error("Fetch entries error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch All Timecards - Admin
router.get("/admin/timecards", async (req, res) => {
  try {
    const timecards = await TimeEntry.find().populate("employee");
    res.json(timecards);
  } catch (error) {
    console.error("Fetch admin timecards error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
