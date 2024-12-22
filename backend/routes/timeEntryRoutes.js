const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const TimeEntry = require("../models/TimeEntry");

const calculatePayroll = async (employeeId, startDate, endDate) => {
  const timeEntries = await TimeEntry.find({
    employee: employeeId,
    clockIn: { $gte: new Date(startDate), $lte: new Date(endDate) }, // Ensure valid range
    clockOut: { $gte: new Date(startDate), $lte: new Date(endDate) }, // Ensure valid range
  });

  if (timeEntries.length === 0) {
    throw new Error("No time entries found for the given period.");
  }

  let totalHours = 0;
  let overtimeHours = 0;

  timeEntries.forEach((entry) => {
    const hours =
      (new Date(entry.clockOut) - new Date(entry.clockIn)) / (1000 * 60 * 60); // Convert ms to hours
    totalHours += hours;
  });

  const employee = await Employee.findById(employeeId);
  if (!employee) {
    throw new Error("Employee not found.");
  }

  const regularHours = Math.min(totalHours, 40);
  overtimeHours = Math.max(0, totalHours - 40);

  const regularPay = parseFloat((employee.wage * regularHours).toFixed(2));
  const overtimePay = parseFloat(
    (employee.wage * employee.overtimeRate * overtimeHours).toFixed(2)
  );

  const grossPay = regularPay + overtimePay;
  const federalTax = parseFloat(
    (grossPay * employee.federalTaxRate).toFixed(2)
  );
  const stateTax = parseFloat((grossPay * employee.stateTaxRate).toFixed(2));
  const localTax = parseFloat((grossPay * employee.localTaxRate).toFixed(2));
  const netPay = parseFloat(
    (grossPay - federalTax - stateTax - localTax).toFixed(2)
  );

  return {
    totalHours,
    regularHours,
    overtimeHours,
    regularPay,
    overtimePay,
    federalTax,
    stateTax,
    localTax,
    netPay,
  };
};

const handleCalculatePayroll = async () => {
  try {
    const response = await axios.post("/api/timecards/process-payroll", {
      employeeId: selectedEmployee,
      startDate,
      endDate,
    });

    // Handle the response correctly
    if (response.status === 200) {
      setPayrollData(response.data);
    } else {
      console.error("Payroll calculation failed with status", response.status);
    }
  } catch (error) {
    console.error("Error calculating payroll:", error.message);
  }
};

const handleUpdateWage = async () => {
  try {
    const response = await axios.put(
      `/api/timecards/employees/${selectedEmployee}`,
      {
        wage: newWage,
      }
    );
    if (response.status === 200) {
      alert("Wage updated successfully");

      const updatedEmployees = await axios.get("/api/timecards/employees");
      setEmployees(updatedEmployees.data);
      setNewWage("");
    } else {
      console.error("Failed to update wage with status", response.status);
    }
  } catch (error) {
    console.error("Error updating wage:", error.message);
  }
};

// Fetch all employees -  name email wage
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find({}, "name email wage");
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to process payroll
router.post("/process-payroll", async (req, res) => {
  const { employeeId, startDate, endDate } = req.body;

  try {
    if (!employeeId) throw new Error("Employee ID is required");

    const payroll = await calculatePayroll(employeeId, startDate, endDate);
    res.status(200).json(payroll);
  } catch (error) {
    console.error("Error processing payroll:", error.message);
    res.status(500).json({ error: error.message });
  }
});

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

router.post("/clock-out/:id", async (req, res) => {
  try {
    const timeEntry = await TimeEntry.findById(req.params.id);
    if (!timeEntry || timeEntry.clockOut) {
      return res
        .status(400)
        .json({ error: "Invalid or already clocked-out entry." });
    }

    const now = new Date();
    const clockInTime = new Date(timeEntry.clockIn);
    const totalHours = (now - clockInTime) / (1000 * 60 * 60);

    if (totalHours <= 0) {
      return res
        .status(400)
        .json({ error: "Clock-out time must be after clock-in time." });
    }

    timeEntry.clockOut = now;
    timeEntry.totalHours = parseFloat(totalHours.toFixed(2));
    timeEntry.overtimeHours = Math.max(0, totalHours - 8);

    await timeEntry.save();
    res.status(200).json(timeEntry);
  } catch (error) {
    console.error("Clock-out error:", error.message);
    res.status(500).json({ error: "Server error while clocking out." });
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

// update employee details like wage
router.put("/employees/:id", async (req, res) => {
  const { wage } = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { wage },
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
