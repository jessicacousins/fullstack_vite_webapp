import React, { useState } from "react";
import axios from "axios";
import "./USHistoryFactGenerator.css";

const USHistoryFactGenerator = () => {
  const [fact, setFact] = useState(
    "Click the button to get a unique U.S. history fact!"
  );
  const [loading, setLoading] = useState(false);
  const [speechInstance, setSpeechInstance] = useState(null);

  const generateFact = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/us-history-fact"
      );
      setFact(response.data.fact);
      speakFact(response.data.fact);
    } catch (error) {
      console.error("Error fetching fact:", error);
      setFact("Oops! Something went wrong. Try again.");
    }
    setLoading(false);
  };

  const speakFact = (text) => {
    stopSpeech();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    setSpeechInstance(speech);
    window.speechSynthesis.speak(speech);
  };

  const stopSpeech = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setSpeechInstance(null);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fact);
    alert("Fact copied to clipboard!");
  };

  return (
    <div className="history-fact-container">
      <h1>📜 U.S. History Fun Fact Generator</h1>
      <p className="history-fact">{fact}</p>
      <div className="buttons">
        <button onClick={generateFact} disabled={loading}>
          {loading ? "⏳ Generating..." : "🎲 Generate Fact"}
        </button>
        <button onClick={copyToClipboard}>📋 Copy Fact</button>
        <button onClick={() => speakFact(fact)}>🔊 Read Fact</button>
        <button onClick={stopSpeech}>🛑 Stop</button>
      </div>
    </div>
  );
};

export default USHistoryFactGenerator;
