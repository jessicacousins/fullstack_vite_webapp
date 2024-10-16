import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./SimonSaysGame.css";

const SimonSaysGame = () => {
  const { user } = useAuth();
  const colors = ["red", "green", "blue", "yellow"];
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [message, setMessage] = useState("Click Start to Play!");
  const [currentLevel, setCurrentLevel] = useState(0);

  // Create refs for each color
  const redRef = useRef(null);
  const greenRef = useRef(null);
  const blueRef = useRef(null);
  const yellowRef = useRef(null);

  const buttonRefs = {
    red: redRef,
    green: greenRef,
    blue: blueRef,
    yellow: yellowRef,
  };

  // Use useEffect to play the sequence whenever it updates
  useEffect(() => {
    if (sequence.length > 0) {
      playSequence();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequence]);

  const playSequence = async () => {
    setIsUserTurn(false);
    setMessage("Watch the sequence...");

    for (let i = 0; i < sequence.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const color = sequence[i];
      const button = buttonRefs[color].current;
      if (button) {
        button.classList.add("active");
        await new Promise((resolve) => setTimeout(resolve, 500));
        button.classList.remove("active");
      }
    }

    setIsUserTurn(true);
    setMessage("Your turn!");
  };

  const startGame = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence([newColor]);
    setUserSequence([]);
    setCurrentLevel(1);
  };

  const handleUserInput = async (color) => {
    if (!isUserTurn) return;
    const newUserSequence = [...userSequence, color];
    setUserSequence(newUserSequence);

    // Animate the button press
    const button = buttonRefs[color].current;
    if (button) {
      button.classList.add("active");
      await new Promise((resolve) => setTimeout(resolve, 300));
      button.classList.remove("active");
    }

    // Check if the user's input matches the sequence so far
    const currentIndex = newUserSequence.length - 1;
    if (newUserSequence[currentIndex] !== sequence[currentIndex]) {
      setMessage("Wrong move! Game Over.");
      saveGameResult(currentLevel - 1);
      setIsUserTurn(false);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      setIsUserTurn(false);
      setMessage("Good job! Next round...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      nextRound();
    }
  };

  const nextRound = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence((prevSequence) => [...prevSequence, newColor]);
    setUserSequence([]);
    setCurrentLevel((prevLevel) => prevLevel + 1);
  };

  const saveGameResult = async (levelReached) => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/update-simon-says-score",
        {
          email: user.email,
          levelReached,
        }
      );
    } catch (error) {
      console.error("Error saving Simon Says score:", error);
    }
  };

  return (
    <div className="simon-container">
      <h1>Simon Says Game</h1>
      <p>Level: {currentLevel}</p>
      <p>{message}</p>
      <div className="simon-board">
        <button
          ref={redRef}
          className="simon-button red"
          onClick={() => handleUserInput("red")}
        ></button>
        <button
          ref={greenRef}
          className="simon-button green"
          onClick={() => handleUserInput("green")}
        ></button>
        <button
          ref={blueRef}
          className="simon-button blue"
          onClick={() => handleUserInput("blue")}
        ></button>
        <button
          ref={yellowRef}
          className="simon-button yellow"
          onClick={() => handleUserInput("yellow")}
        ></button>
      </div>
      {!isUserTurn && (
        <button className="start-button" onClick={startGame}>
          {currentLevel === 0 ? "Start Game" : "Restart Game"}
        </button>
      )}
    </div>
  );
};

export default SimonSaysGame;
