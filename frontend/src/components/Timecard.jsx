import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./Timecard.css";

const Timecard = () => {
  const { user } = useAuth();
  const email = user?.email;
  const [timeEntries, setTimeEntries] = useState([]);
  const [clockedIn, setClockedIn] = useState(null);
  const [isHoliday, setIsHoliday] = useState(false);

  useEffect(() => {
    if (email) fetchTimeEntries();
  }, [email]);

  const fetchTimeEntries = async () => {
    try {
      const res = await axios.get(`/api/timecards/employee/${email}`);
      setTimeEntries(res.data);
      setClockedIn(res.data.find((entry) => !entry.clockOut));
    } catch (error) {
      console.error(
        "Error fetching time entries:",
        error.response?.data || error.message
      );
    }
  };

  const handleClockIn = async () => {
    try {
      await axios.post("/api/timecards/clock-in", { email, isHoliday });
      fetchTimeEntries();
    } catch (error) {
      console.error(
        "Error during clock-in:",
        error.response?.data || error.message
      );
    }
  };

  const handleClockOut = async () => {
    try {
      if (!clockedIn) return;
      await axios.post(`/api/timecards/clock-out/${clockedIn._id}`);
      fetchTimeEntries();
    } catch (error) {
      console.error(
        "Error during clock-out:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="timecard-container">
      <h2 className="timecard-header">Your Timecard</h2>
      <div className="timecard-dropdown">
        <label>
          Holiday Time:{" "}
          <select
            value={isHoliday}
            onChange={(e) => setIsHoliday(e.target.value === "true")}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </label>
      </div>
      {clockedIn ? (
        <button className="timecard-button" onClick={handleClockOut}>
          Clock Out
        </button>
      ) : (
        <button className="timecard-button" onClick={handleClockIn}>
          Clock In
        </button>
      )}

      <ul className="timecard-entries">
        {timeEntries.map((entry) => (
          <li key={entry._id} className="timecard-entry">
            Clocked In: {new Date(entry.clockIn).toLocaleString()} -{" "}
            {entry.clockOut
              ? `Clocked Out: ${new Date(entry.clockOut).toLocaleString()}`
              : "Ongoing"}{" "}
            {entry.isHoliday && (
              <span className="holiday-badge">(Holiday)</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timecard;
