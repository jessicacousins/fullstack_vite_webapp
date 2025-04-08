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
      <h2 className="mood-tracker-title">Mood Tracker</h2>
      <div className="mood-tracker-info-box">
        <h3 className="mood-tracker-info-heading">Why Use a Mood Tracker?</h3>
        <p className="mood-tracker-info-text">
          This mood tracker helps you reflect on how you're feeling each day and
          keep a private journal entry alongside your emotions.
        </p>
        <p className="mood-tracker-info-text">
          Simply choose your mood from the dropdown, jot down a few thoughts,
          and click "Add Mood" to save. You can review your emotional patterns
          and journal entries below to build self-awareness over time.
        </p>
        <p className="mood-tracker-info-text">
          Everything is securely stored and connected to your account, so you
          can revisit your journey whenever you need a mental health check-in.
        </p>
      </div>

      <div className="mood-input">
        <label>Select Mood:</label>
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="">-- Select --</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Stressed">Stressed</option>
          <option value="Excited">Excited</option>
          <option value="Calm">Calm</option>
          <option value="Anxious">Anxious</option>
          <option value="Motivated">Motivated</option>
          <option value="Tired">Tired</option>
          <option value="Grateful">Grateful</option>
          <option value="Confident">Confident</option>
          <option value="Lonely">Lonely</option>
          <option value="Relaxed">Relaxed</option>
          <option value="Frustrated">Frustrated</option>
          <option value="Hopeful">Hopeful</option>
          <option value="Bored">Bored</option>
          <option value="Productive">Productive</option>
          <option value="Angry">Angry</option>
          <option value="Overwhelmed">Overwhelmed</option>
          <option value="Content">Content</option>
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

      <h3 className="past-mood-title">Past Moods</h3>
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
