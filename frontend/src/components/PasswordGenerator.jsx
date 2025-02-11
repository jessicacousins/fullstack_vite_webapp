import React, { useState } from "react";
import "./passwordgenerator.css";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeSpecial) charset += "!@#$%^&*()-_=+<>?/";

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const speakPassword = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.2;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="password-generator-container">
      <h2 className="password-generator-header">Password Generator Tool</h2>
      <div className="password-options">
        <label>
          Password Length:
          <input
            type="number"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="password-length-input"
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          Include Uppercase Letters
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSpecial}
            onChange={() => setIncludeSpecial(!includeSpecial)}
          />
          Include Special Characters
        </label>
      </div>
      <button onClick={generatePassword} className="generate-password-button">
        Generate Password
      </button>
      {password && (
        <div className="password-display">
          <strong>Generated Password:</strong> {password}
          <button onClick={() => speakPassword(password)}>
            🔊 Read Password
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
