import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PayrollAdmin.css";

const PayrollAdmin = () => {
  const [employees, setEmployees] = useState([]); // To store the list of employees
  const [selectedEmployee, setSelectedEmployee] = useState(""); // Store selected employee ID
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [payrollData, setPayrollData] = useState(null);
  const [newWage, setNewWage] = useState("");

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/timecards/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, []);

  const handleCalculatePayroll = async () => {
    try {
      if (!selectedEmployee || !startDate || !endDate) {
        alert("Please select an employee and specify the date range.");
        return;
      }

      const response = await axios.post("/api/timecards/process-payroll", {
        employeeId: selectedEmployee,
        startDate,
        endDate,
      });

      if (response.status === 200) {
        setPayrollData(response.data);
      } else {
        console.error("Error processing payroll:", response.data.error);
        alert("Failed to calculate payroll. Please try again.");
      }
    } catch (error) {
      console.error("Error calculating payroll:", error.message);
      alert("An error occurred while calculating payroll.");
    }
  };

  const handleUpdateWage = async () => {
    try {
      await axios.put(`/api/timecards/employees/${selectedEmployee}`, {
        wage: newWage,
      });
      alert("Wage updated successfully");

      // Refresh the employee list
      const updatedEmployees = await axios.get("/api/timecards/employees");
      setEmployees(updatedEmployees.data);
      setNewWage(""); // Reset the input field
    } catch (error) {
      console.error("Error updating wage:", error.message);
    }
  };

  return (
    <div className="payroll-admin-container">
      <h2>Payroll Management</h2>
      <div className="payroll-form">
        <label>
          Select Employee:
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">-- Select an Employee --</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name} ({employee.email}) - ${employee.wage}/hr
              </option>
            ))}
          </select>
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button className="calculate-button" onClick={handleCalculatePayroll}>Calculate Payroll</button>
      </div>

      {selectedEmployee && (
        <div className="update-wage">
          <label>
            Update Wage:
            <input
              type="number"
              value={newWage}
              placeholder="Enter new wage"
              onChange={(e) => setNewWage(e.target.value)}
            />
          </label>
          <button onClick={handleUpdateWage} disabled={!newWage}>
            Update Wage
          </button>
        </div>
      )}

      {payrollData && (
        <div className="payroll-summary">
          <h3>Payroll Summary</h3>
          <p>Total Hours: {payrollData.totalHours.toFixed(2)} hrs</p>
          <p>Regular Hours: {payrollData.regularHours.toFixed(2)} hrs</p>
          <p>Overtime Hours: {payrollData.overtimeHours.toFixed(2)} hrs</p>
          <p>Regular Pay: ${payrollData.regularPay.toFixed(2)}</p>
          <p>Overtime Pay: ${payrollData.overtimePay.toFixed(2)}</p>
          <p>Federal Tax: ${payrollData.federalTax.toFixed(2)}</p>
          <p>State Tax: ${payrollData.stateTax.toFixed(2)}</p>
          <p>Local Tax: ${payrollData.localTax.toFixed(2)}</p>
          <p>Net Pay: ${payrollData.netPay.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default PayrollAdmin;
