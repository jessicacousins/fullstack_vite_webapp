import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const PayrollAdmin = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [role, setRole] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.email) return;

      try {
        console.log(`Fetching role for: ${user.email}`);
        const response = await axios.get(`/api/users/${user.email}`);
        setUserRole(response.data.role);
        console.log(`Fetched role: ${response.data.role}`);
      } catch (error) {
        console.error("Error fetching user role:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  // Fetch all employees
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

  const assignRole = async () => {
    try {
      if (!selectedEmployee || !role) {
        alert("Please select an employee and a role.");
        return;
      }

      await axios.put(
        "/api/roles/assign-role",
        { email: selectedEmployee, role },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      alert("Role assigned successfully.");
    } catch (error) {
      console.error("Error assigning role:", error.message);
      alert("An error occurred while assigning the role.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (userRole !== "god") {
    return <p>Access denied. You do not have the required permissions.</p>;
  }

  return (
    <div className="payroll-admin-container">
      <h2 className="god-title">God-Tier Payroll Admin</h2>
      <div className="payroll-form">
        <label>
          Select Employee:
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">-- Select an Employee --</option>
            {employees.map((employee) => (
              <option key={employee.email} value={employee.email}>
                {employee.name} ({employee.email})
              </option>
            ))}
          </select>
        </label>
        <label>
          Assign Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">-- Select a Role --</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="hr">HR</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button onClick={assignRole}>Assign Role</button>
      </div>
    </div>
  );
};

export default PayrollAdmin;
