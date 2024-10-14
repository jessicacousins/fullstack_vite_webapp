import React, { useState, useEffect } from "react";
import "./MemoryGame.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const cardImages = [
  { src: "/img/hat-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/broom-1.png", matched: false },
  { src: "/img/wand-1.png", matched: false },
];

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const { user } = useAuth();
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setGameOver(false);
  };

  // Handle a card choice
  const handleChoice = (card) => {
    if (!disabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  // Compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // Start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  // Check if the game is over
  useEffect(() => {
    if (cards.length && cards.every((card) => card.matched)) {
      setGameOver(true);
      saveScore();
    }
  }, [cards]);

  // Save score to the backend
  const saveScore = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/update-memory-score", {
        email: user.email,
        turns: turns,
      });
      console.log("Score saved successfully");
    } catch (error) {
      console.error("Error saving score:", error.response || error.message);
    }
  };

  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>

      <div className="card-grid">
        {cards.map((card) => (
          <div
            className={`card ${
              card === choiceOne || card === choiceTwo || card.matched
                ? "flipped"
                : ""
            }`}
            key={card.id}
            onClick={() => handleChoice(card)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img src={card.src} alt="card front" />
              </div>
              <div className="card-back">
                <img src="/img/cover.png" alt="card back" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>Congratulations! You completed the game in {turns} turns.</h2>
        </div>
      )}
    </div>
  );
}

export default MemoryGame;
