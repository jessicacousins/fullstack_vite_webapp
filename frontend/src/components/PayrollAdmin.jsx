import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./PayrollAdmin.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const EmployeeCard = ({ employee }) => (
  <div className="employee-card">
    <p>
      <strong>Name:</strong> {employee.name}
    </p>
    <p>
      <strong>Email:</strong> {employee.email}
    </p>
    <p>
      <strong>Role:</strong> {employee.role}
    </p>
  </div>
);

const PayrollAdmin = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [role, setRole] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.email) return;

      try {
        const response = await axios.get(`/api/users/${user.email}`);
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/timecards/employees");
        const employeeData = response.data;

        setEmployees(employeeData);

        const newLayout = employeeData.map((employee, index) => ({
          i: employee.email,
          x: (index * 2) % 12,
          y: Math.floor(index / 6),
          w: 2,
          h: 1,
        }));
        setLayout(newLayout);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, []);

  const assignRole = async () => {
    if (!selectedEmployee || !role) {
      alert("Please select an employee and a role.");
      return;
    }

    try {
      const response = await axios.put("/api/roles/assign-role", {
        email: selectedEmployee,
        role,
      });
      alert("Role assigned successfully.");
      setEmployees(
        employees.map((employee) =>
          employee.email === selectedEmployee
            ? { ...employee, role: response.data.employee.role }
            : employee
        )
      );
    } catch (error) {
      console.error("Error assigning role:", error.message);
      alert("An error occurred while assigning the role.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (userRole !== "god")
    return <p>Access denied. God-tier access required.</p>;

  return (
    <div className="payroll-admin-container">
      <h2 className="god-title">God-Tier Payroll Admin</h2>
      <div className="payroll-form">
        <label>
          Select Employee:
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="employee-select"
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
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
          >
            <option value="">-- Select a Role --</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="hr">HR</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button onClick={assignRole}>Assign Role</button>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={200}
      >
        {employees.map((employee) => (
          <div
            key={employee.email}
            data-grid={{
              i: employee.email,
              x: layout.find((item) => item.i === employee.email)?.x || 0,
              y: layout.find((item) => item.i === employee.email)?.y || 0,
              w: 2,
              h: 1,
            }}
          >
            <EmployeeCard employee={employee} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default PayrollAdmin;
