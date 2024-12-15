import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./MoodTracker.css";

const MoodTracker = () => {
  const { user } = useAuth();
  const email = user?.email;
  const [mood, setMood] = useState("");
  const [journalEntry, setJournalEntry] = useState("");
  const [moods, setMoods] = useState([]);
  const API_BASE_URL = "http://localhost:5000/api/users";

  const fetchMoods = async () => {
    if (!email) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/${email}/moods`);
      setMoods(response.data);
    } catch (error) {
      console.error("Error fetching moods:", error.message);
    }
  };

  const addMood = async () => {
    if (!mood || !email) return alert("Please select a mood.");
    try {
      const response = await axios.post(`${API_BASE_URL}/${email}/mood`, {
        mood,
        journalEntry,
      });
      setMoods(response.data.moods);
      setMood("");
      setJournalEntry("");
    } catch (error) {
      console.error("Error adding mood:", error.message);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, [email]); 

  return (
    <div className="mood-tracker-container">
      <h2>Mood Tracker</h2>
      <div className="mood-input">
        <label>Select Mood:</label>
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="">-- Select --</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Stressed">Stressed</option>
          <option value="Excited">Excited</option>
          <option value="Calm">Calm</option>
        </select>
      </div>
      <div className="journal-input">
        <label>Journal Entry:</label>
        <textarea
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="Describe your day..."
        ></textarea>
      </div>
      <button onClick={addMood} className="submit-mood-button">
        Add Mood
      </button>

      <h3>Past Moods</h3>
      <ul className="mood-list">
        {moods.map((entry, index) => (
          <li key={index}>
            <strong>{entry.mood}</strong> -{" "}
            {new Date(entry.date).toLocaleDateString()}
            {entry.journalEntry && <p>{entry.journalEntry}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodTracker;
