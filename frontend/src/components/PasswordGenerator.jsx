import React, { useState } from "react";
import "./Passwordgenerator.css";

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
    <div className="passwordGeneratorContainer">
      <h2 className="passwordGeneratorHeader">🔐 Secure Password Generator</h2>

      <p className="passwordGeneratorDescription">
        Generate strong, unique passwords to protect your accounts. Select the
        desired length and options to include numbers, uppercase letters, and
        special characters.
        <strong>
          {" "}
          Remember to store your password securely, as it will not be saved.
        </strong>
      </p>

      <div className="passwordOptions">
        <label className="passwordLabel">
          Password Length:
          <input
            type="number"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="passwordLengthInput"
          />
        </label>

        <label className="passwordCheckboxLabel">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Include Numbers
        </label>

        <label className="passwordCheckboxLabel">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          Include Uppercase Letters
        </label>

        <label className="passwordCheckboxLabel">
          <input
            type="checkbox"
            checked={includeSpecial}
            onChange={() => setIncludeSpecial(!includeSpecial)}
          />
          Include Special Characters
        </label>
      </div>

      <button onClick={generatePassword} className="generatePasswordButton">
        🚀 Generate Secure Password
      </button>

      {password && (
        <div className="passwordDisplay">
          <p className="passwordResult">
            <strong>Generated Password:</strong> {password}
          </p>
          <button
            onClick={() => speakPassword(password)}
            className="readPasswordButton"
          >
            🔊 Read Password
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
