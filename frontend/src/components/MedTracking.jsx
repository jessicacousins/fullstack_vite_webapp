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

  useEffect(() => {
    fetchMedications();
  }, []);

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

  return (
    <div className="med-tracking-container">
      <h1>Medication Tracking System</h1>
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

      <div className="med-list">
        {medications.map((med, index) => (
          <div key={index} className="med-item">
            <p>Name: {med.name}</p>
            <p>Dose: {med.dose}</p>
            <p>Route: {med.route}</p>
            <p>Time: {med.time}</p>
            <p>Person: {med.person}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedTracking;
