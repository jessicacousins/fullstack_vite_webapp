import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h2>Employee Timecards</h2>
      <table>
        <thead>
          <tr>
            <th>Employee Email</th>
            <th>Clock In</th>
            <th>Clock Out</th>
            <th>Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {timecards.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.employee?.email || "N/A"}</td>
              <td>{new Date(entry.clockIn).toLocaleString()}</td>
              <td>
                {entry.clockOut
                  ? new Date(entry.clockOut).toLocaleString()
                  : "Ongoing"}
              </td>
              <td>{entry.isHoliday ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTimecards;
