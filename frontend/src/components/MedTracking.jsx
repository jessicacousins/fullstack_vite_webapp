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
    comments: "",
    refused: false,
  });
  const [errors, setErrors] = useState({});
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
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewMed((prev) => ({ ...prev, [name]: files[0] }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newMed.name) newErrors.name = "Medication Name is required.";
    if (!newMed.dose) newErrors.dose = "Dose is required.";
    if (!newMed.route) newErrors.route = "Route is required.";
    if (!newMed.time) newErrors.time = "Time is required.";
    if (!newMed.person) newErrors.person = "Person is required.";
    if (!newMed.submittedBy)
      newErrors.submittedBy = "Your Username is required.";
    if (!newMed.acknowledgedByName)
      newErrors.acknowledgedByName = "Acknowledgment Name is required.";
    if (!agreement)
      newErrors.agreement = "You must agree and acknowledge to proceed.";
    if (!agreement)
      newErrors.agreement = "You must agree and acknowledge to proceed.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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
        comments: "",
        refused: false,
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
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
        <input
          name="dose"
          placeholder="Dose"
          value={newMed.dose}
          onChange={handleInputChange}
        />
        {errors.dose && <p className="error-text">{errors.dose}</p>}
        <input
          name="route"
          placeholder="Route"
          value={newMed.route}
          onChange={handleInputChange}
        />
        {errors.route && <p className="error-text">{errors.route}</p>}
        <input
          name="time"
          placeholder="Time"
          value={newMed.time}
          onChange={handleInputChange}
        />
        {errors.time && <p className="error-text">{errors.time}</p>}
        <input
          name="person"
          placeholder="Person"
          value={newMed.person}
          onChange={handleInputChange}
        />
        {errors.person && <p className="error-text">{errors.person}</p>}
        <input
          name="submittedBy"
          placeholder="Your Username"
          value={newMed.submittedBy}
          onChange={handleInputChange}
        />
        <textarea
          name="comments"
          placeholder="Additional Comments"
          value={newMed.comments}
          onChange={handleInputChange}
        ></textarea>
        <div>
          <label>
            <input
              type="checkbox"
              checked={newMed.refused}
              onChange={(e) =>
                setNewMed((prev) => ({ ...prev, refused: e.target.checked }))
              }
            />
            Medication Refused
          </label>
        </div>
        {errors.submittedBy && (
          <p className="error-text">{errors.submittedBy}</p>
        )}
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
          {errors.agreement && <p className="error-text">{errors.agreement}</p>}
          <input
            name="acknowledgedByName"
            placeholder="Your Full Name"
            value={newMed.acknowledgedByName}
            onChange={handleInputChange}
          />
          {errors.acknowledgedByName && (
            <p className="error-text">{errors.acknowledgedByName}</p>
          )}
        </div>
        <button type="submit">Add Medication</button>
      </form>

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
        <h2>Submitted Medications</h2>
        {medications.map((med, index) => (
          <div key={index} className="med-item">
            <p>
              <strong>Name:</strong> {med.name}
            </p>
            <p>
              <strong>Dose:</strong> {med.dose}
            </p>
            <p>
              <strong>Route:</strong> {med.route}
            </p>
            <p>
              <strong>Time:</strong> {med.time}
            </p>
            <p>
              <strong>Person:</strong> {med.person}
            </p>
            <p>
              <strong>Submitted By:</strong> {med.submittedBy}
            </p>
            <p>
              <strong>Submit Time:</strong>{" "}
              {new Date(med.submitTime).toLocaleString()}
            </p>
            <p>
              <strong>Acknowledged By:</strong>{" "}
              {med.acknowledgedBy?.name || "N/A"}
            </p>
            <p>
              <strong>Acknowledgment Time:</strong>{" "}
              {med.acknowledgedBy?.timestamp
                ? new Date(med.acknowledgedBy.timestamp).toLocaleString()
                : "N/A"}
            </p>
            <p>
              <strong>Comments:</strong> {med.comments || "None"}
            </p>
            <p>
              <strong>Refused:</strong>{" "}
              {med.refused ? (
                <span style={{ color: "red" }}>Yes</span>
              ) : (
                <span style={{ color: "green" }}>No</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedTracking;
