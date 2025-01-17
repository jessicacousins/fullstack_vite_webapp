import React, { useState } from "react";
import "./TimeZoneConverter.css";

const timeZones = [
  { label: "UTC", offset: 0 },
  { label: "PST (Pacific Standard Time)", offset: -8 },
  { label: "EST (Eastern Standard Time)", offset: -5 },
  { label: "CET (Central European Time)", offset: 1 },
  { label: "IST (India Standard Time)", offset: 5.5 },
  { label: "JST (Japan Standard Time)", offset: 9 },
];

const TimeZoneConverter = () => {
  const [sourceTimeZone, setSourceTimeZone] = useState(timeZones[0]);
  const [targetTimeZone, setTargetTimeZone] = useState(timeZones[1]);
  const [inputTime, setInputTime] = useState("");

  const convertTime = () => {
    if (!inputTime) return "";
    const [hours, minutes] = inputTime.split(":").map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
      return "Invalid time format.";
    }

    const totalMinutes =
      hours * 60 +
      minutes +
      (targetTimeZone.offset - sourceTimeZone.offset) * 60;
    const convertedHours = Math.floor((totalMinutes / 60 + 24) % 24);
    const convertedMinutes = Math.floor(totalMinutes % 60);

    return `${convertedHours.toString().padStart(2, "0")}:${convertedMinutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handleInputTimeChange = (e) => {
    setInputTime(e.target.value);
  };

  const convertedTime = convertTime();

  return (
    <div className="time-zone-converter">
      <h2>Time Zone Converter</h2>
      <div className="converter-form">
        <div className="field">
          <label>Source Time Zone:</label>
          <select
            value={sourceTimeZone.label}
            onChange={(e) =>
              setSourceTimeZone(
                timeZones.find((zone) => zone.label === e.target.value)
              )
            }
          >
            {timeZones.map((zone, index) => (
              <option key={index} value={zone.label}>
                {zone.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Target Time Zone:</label>
          <select
            value={targetTimeZone.label}
            onChange={(e) =>
              setTargetTimeZone(
                timeZones.find((zone) => zone.label === e.target.value)
              )
            }
          >
            {timeZones.map((zone, index) => (
              <option key={index} value={zone.label}>
                {zone.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Time (HH:MM):</label>
          <input
            type="text"
            placeholder="e.g., 14:30"
            value={inputTime}
            onChange={handleInputTimeChange}
          />
        </div>
        <div className="result">
          <p>
            Converted Time:{" "}
            <strong>{convertedTime ? convertedTime : "N/A"}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeZoneConverter;
