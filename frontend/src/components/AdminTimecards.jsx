import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminTimecards.css";

const AdminTimecards = () => {
  const [timecards, setTimecards] = useState([]);

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

  return (
    <div className="admin-timecards-container">
      <h2 className="admin-timecards-header">Employee Timecards</h2>
      <table className="admin-timecards-table">
        <thead className="admin-timecards-thead">
          <tr>
            <th className="admin-timecards-th">Employee Email</th>
            <th className="admin-timecards-th">Clock In</th>
            <th className="admin-timecards-th">Clock Out</th>
            <th className="admin-timecards-th">Total Hours</th>
          </tr>
        </thead>
        <tbody className="admin-timecards-tbody">
          {timecards.length > 0 ? (
            timecards.map((entry) => (
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
                <td
                  className={`admin-timecards-td ${
                    entry.isHoliday ? "admin-timecards-holiday" : ""
                  }`}
                >
                  {entry.isHoliday ? "Yes" : "No"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="admin-timecards-no-data">
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
