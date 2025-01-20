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
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    fetchMedications();
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
    const formData = new FormData();
    Object.entries(newMed).forEach(([key, value]) => {
      formData.append(key, value);
    });

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
      });
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
        const medDate = new Date(med.createdAt);
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
        <input type="file" name="labelImage" onChange={handleFileChange} />
        <input type="file" name="medOrder" onChange={handleFileChange} />
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
    </div>
  );
};

export default MedTracking;
