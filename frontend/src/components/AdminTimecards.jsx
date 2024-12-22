import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminTimecards.css";

const AdminTimecards = () => {
  const [timecards, setTimecards] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchTimecards();
  }, []);

  const fetchTimecards = async () => {
    try {
      const res = await axios.get("/api/timecards/admin/timecards");
      setTimecards(res.data);
    } catch (error) {
      console.error("Error fetching timecards:", error.message);
    }
  };

  const calculateTotalHours = (clockIn, clockOut) => {
    if (!clockOut) return "Ongoing";
    const totalHours = (new Date(clockOut) - new Date(clockIn)) / 1000 / 3600;
    return totalHours.toFixed(2);
  };

  const calculatePay = (totalHours, wage, isHoliday) => {
    const regularHours = Math.min(totalHours, 40);
    const overtimeHours = totalHours > 40 ? totalHours - 40 : 0;
    const holidayMultiplier = isHoliday ? 1.5 : 1;
    const regularPay = regularHours * wage * holidayMultiplier;
    const overtimePay = overtimeHours * wage * 1.5;
    return {
      regularPay: regularPay.toFixed(2),
      overtimePay: overtimePay.toFixed(2),
    };
  };

  const handleFilterChange = (e) => setFilter(e.target.value.toLowerCase());

  const filteredTimecards = timecards.filter((entry) =>
    entry.employee?.email?.toLowerCase().includes(filter)
  );

  return (
    <div className="admin-timecards-container">
      <h2 className="admin-timecards-header">Employee Timecards</h2>
      <div className="filter-container">
        <label htmlFor="filter">Filter by Email:</label>
        <input
          type="text"
          id="filter"
          placeholder="Enter employee email..."
          onChange={handleFilterChange}
        />
      </div>
      <table className="admin-timecards-table">
        <thead className="admin-timecards-thead">
          <tr>
            <th className="admin-timecards-th">Employee Email</th>
            <th className="admin-timecards-th">Clock In</th>
            <th className="admin-timecards-th">Clock Out</th>
            <th className="admin-timecards-th">Total Hours</th>
            <th className="admin-timecards-th">Wage Rate</th>
            <th className="admin-timecards-th">Regular Pay</th>
            <th className="admin-timecards-th">Overtime Pay</th>
            <th className="admin-timecards-th">Holiday Pay</th>
          </tr>
        </thead>
        <tbody className="admin-timecards-tbody">
          {filteredTimecards.length > 0 ? (
            filteredTimecards.map((entry) => {
              const totalHours = calculateTotalHours(
                entry.clockIn,
                entry.clockOut
              );
              const { regularPay, overtimePay } = calculatePay(
                parseFloat(totalHours) || 0,
                entry.employee?.wage || 0,
                entry.isHoliday
              );

              return (
                <tr key={entry._id} className="admin-timecards-row">
                  <td className="admin-timecards-td">
                    {entry.employee?.email || "N/A"}
                  </td>
                  <td className="admin-timecards-td">
                    {new Date(entry.clockIn).toLocaleString()}
                  </td>
                  <td className="admin-timecards-td">
                    {entry.clockOut
                      ? new Date(entry.clockOut).toLocaleString()
                      : "Ongoing"}
                  </td>
                  <td className="admin-timecards-td">{totalHours}</td>
                  <td className="admin-timecards-td">
                    ${entry.employee?.wage?.toFixed(2) || "N/A"}
                  </td>
                  <td className="admin-timecards-td">${regularPay}</td>
                  <td className="admin-timecards-td">${overtimePay}</td>
                  <td className="admin-timecards-td">
                    {entry.isHoliday ? "Yes" : "No"}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="admin-timecards-no-data">
                No Timecards Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTimecards;
