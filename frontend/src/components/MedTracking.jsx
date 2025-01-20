import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MedTracking.css";

const MedTracking = () => {
  const [medications, setMedications] = useState([]);
  const [newMed, setNewMed] = useState({
    name: "",
    dose: "",
    route: "",
    time: "",
    person: "",
    labelImage: null,
    medOrder: null,
    submittedBy: "",
    acknowledgedByName: "",
  });
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);
  const [agreement, setAgreement] = useState(false);

  useEffect(() => {
    fetchMedications();
    const interval = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    generateCalendar();
  }, [selectedMonth, medications]);

  const fetchMedications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/medications");
      setMedications(response.data);
    } catch (err) {
      console.error("Error fetching medications:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMed((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewMed((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreement) {
      alert("You must agree and sign to proceed.");
      return;
    }

    const formData = new FormData();
    Object.entries({ ...newMed, acknowledgedCheckbox: agreement }).forEach(
      ([key, value]) => {
        formData.append(key, value);
      }
    );

    try {
      await axios.post("http://localhost:5000/api/medications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchMedications();
      setNewMed({
        name: "",
        dose: "",
        route: "",
        time: "",
        person: "",
        labelImage: null,
        medOrder: null,
        submittedBy: "",
        acknowledgedByName: "",
      });
      setAgreement(false);
    } catch (err) {
      console.error("Error submitting medication:", err);
      alert("Error submitting medication. Check console for details.");
    }
  };

  const generateCalendar = () => {
    const daysInMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      0
    ).getDate();

    const calendar = Array.from({ length: daysInMonth }, (_, dayIndex) => ({
      day: dayIndex + 1,
      meds: medications.filter((med) => {
        const medDate = new Date(med.submitTime);
        return (
          medDate.getMonth() === selectedMonth.getMonth() &&
          medDate.getFullYear() === selectedMonth.getFullYear() &&
          medDate.getDate() === dayIndex + 1
        );
      }),
    }));

    setCalendarData(calendar);
  };

  const handleMonthChange = (direction) => {
    setSelectedMonth(
      new Date(selectedMonth.setMonth(selectedMonth.getMonth() + direction))
    );
  };

  return (
    <div className="med-tracking-container">
      <h1>Medication Tracking System</h1>
      <p className="map-directions">
        <strong>Massachusetts MAP Directions:</strong> Ensure the "5 Rights" are
        met for every medication administered: Right Person, Right Dose, Right
        Route, Right Time, and Right Medication. Document accurately and report
        any issues immediately to the supervisor.
      </p>

      <p className="current-date-time">
        Current Date/Time: {currentDateTime.toLocaleString()}
      </p>
      <form className="med-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Medication Name"
          value={newMed.name}
          onChange={handleInputChange}
          required
        />
        <input
          name="dose"
          placeholder="Dose"
          value={newMed.dose}
          onChange={handleInputChange}
          required
        />
        <input
          name="route"
          placeholder="Route"
          value={newMed.route}
          onChange={handleInputChange}
          required
        />
        <input
          name="time"
          placeholder="Time"
          value={newMed.time}
          onChange={handleInputChange}
          required
        />
        <input
          name="person"
          placeholder="Person"
          value={newMed.person}
          onChange={handleInputChange}
          required
        />
        <input
          name="submittedBy"
          placeholder="Your Username"
          value={newMed.submittedBy}
          onChange={handleInputChange}
          required
        />
        <input type="file" name="labelImage" onChange={handleFileChange} />
        <input type="file" name="medOrder" onChange={handleFileChange} />
        <div className="agreement-section">
          <input
            type="checkbox"
            checked={agreement}
            onChange={() => setAgreement(!agreement)}
          />
          <label>
            I agree and acknowledge this submission. Enter your name below:
          </label>
          <input
            name="acknowledgedByName"
            placeholder="Your Full Name"
            value={newMed.acknowledgedByName}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Medication</button>
      </form>

      <div className="date-selector">
        <button onClick={() => handleMonthChange(-1)}>Previous Month</button>
        <span>
          {selectedMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button onClick={() => handleMonthChange(1)}>Next Month</button>
      </div>

      <div className="calendar-grid">
        {calendarData.map((day) => (
          <div key={day.day} className="calendar-day">
            <h3>Day {day.day}</h3>
            {day.meds.length > 0 ? (
              day.meds.map((med, index) => (
                <p key={index} className="med-entry">
                  {med.name}: <span className="med-status">X</span>
                </p>
              ))
            ) : (
              <p className="med-entry">
                No Medications: <span className="med-status">O</span>
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="med-list">
        {medications.map((med, index) => (
          <div key={index} className="med-item">
            <p>Name: {med.name}</p>
            <p>Dose: {med.dose}</p>
            <p>Route: {med.route}</p>
            <p>Time: {med.time}</p>
            <p>Person: {med.person}</p>
            <p>Submitted By: {med.submittedBy}</p>
            <p>Submit Time: {new Date(med.submitTime).toLocaleString()}</p>
            <p>Acknowledged By: {med.acknowledgedBy.name}</p>
            <p>
              Acknowledgment Time:{" "}
              {new Date(med.acknowledgedBy.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedTracking;
