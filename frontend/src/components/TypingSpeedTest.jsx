import React, { useState, useEffect } from "react";
import "./TypingSpeedTest.css";

const phrases = [
  "Hello World",
  "Practice makes perfect",
  "Speed is key",
  "JavaScript is fun",
  "Keep coding",
  "Aliens are real",
  "Code like a pro",
  "Type swiftly",
  "Master the keys",
  "Debugging is fun",
  "Let's go!",
  "Fish live in water",
];

const TypingSpeedTest = () => {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [isTestActive, setIsTestActive] = useState(false);
  const [score, setScore] = useState(0);
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    let timer;
    if (isTestActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      endTest();
    }
    return () => clearInterval(timer);
  }, [isTestActive, timeLeft]);

  const startTest = () => {
    setUserInput("");
    setIsTestActive(true);
    setTimeLeft(10);
    setResultMessage("");
    setCurrentPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  };

  const endTest = () => {
    setIsTestActive(false);
    if (userInput.trim() === currentPhrase) {
      setScore((prev) => prev + 1);
      setResultMessage("🎉 Success! You typed the phrase correctly!");
    } else {
      setResultMessage(`❌ Oops! The correct phrase was: "${currentPhrase}".`);
    }
  };

  const handleInputChange = (e) => setUserInput(e.target.value);

  return (
    <div className="typing-test-container">
      <h1 className="typing-test-title">Typing Speed Test</h1>
      <p className="instructions">
        Type the following phrase as fast as you can:
      </p>
      <h3 className="phrase-display">
        {currentPhrase || "Press Start to Begin"}
      </h3>
      <div className="countdown">Time Left: {timeLeft} seconds</div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className="user-input"
        placeholder="Start typing here..."
        disabled={!isTestActive}
      />
      <p className="result-message">{resultMessage}</p>
      <p className="score">Score: {score}</p>
      <button
        className="start-button"
        onClick={startTest}
        disabled={isTestActive}
      >
        {isTestActive ? "Test in Progress..." : "Start Test"}
      </button>
    </div>
  );
};

export default TypingSpeedTest;
