import React, { useState } from "react";
import axios from "axios";
import "./WorldCultureGenerator.css";

const WorldCultureGenerator = () => {
  const [cultureFact, setCultureFact] = useState(
    "Click the button to learn an interesting world culture fact!"
  );
  const [loading, setLoading] = useState(false);
  const [speechInstance, setSpeechInstance] = useState(null);

  const generateFact = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/world-culture"
      );
      setCultureFact(response.data.fact);
      speakFact(response.data.fact);
    } catch (error) {
      console.error("Error fetching culture fact:", error);
      setCultureFact("Oops! Something went wrong. Try again.");
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
    navigator.clipboard.writeText(cultureFact);
    alert("Fact copied to clipboard!");
  };

  return (
    <div className="culture-container">
      <h1>🌍 World Culture Insights Generator</h1>
      <p className="culture-fact">{cultureFact}</p>
      <div className="buttons">
        <button onClick={generateFact} disabled={loading}>
          {loading ? "⏳ Generating..." : "🌎 Generate Insight"}
        </button>
        <button onClick={copyToClipboard}>📋 Copy Insight</button>
        <button onClick={() => speakFact(cultureFact)}>🔊 Read Insight</button>
        <button onClick={stopSpeech}>🛑 Stop</button>
      </div>
    </div>
  );
};

export default WorldCultureGenerator;
