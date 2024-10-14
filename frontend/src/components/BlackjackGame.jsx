import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Confetti from "react-confetti";
import "./BlackjackGame.css";
import axios from "axios";

const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

// Utility function to generate deck
const generateDeck = () => {
  let deck = [];
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({ value, suit });
    });
  });
  return deck;
};

// Utility to calculate hand value, handling Aces and face cards correctly
const calculateHandValue = (hand) => {
  let value = 0;
  let aceCount = 0;

  hand.forEach((card) => {
    if (card.value === "A") {
      aceCount += 1;
      value += 11;
    } else if (["J", "Q", "K"].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }
  });

  // Handle Aces (count as 1 if needed to avoid busting)
  while (value > 21 && aceCount > 0) {
    value -= 10;
    aceCount -= 1;
  }

  return value;
};

// const BlackjackGame = ({ user }) => {
const BlackjackGame = () => {
  const { user } = useAuth();
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [playerWins, setPlayerWins] = useState(false);
  const [tie, setTie] = useState(false);

  // Shuffling the deck
  const shuffleDeck = (newDeck) => {
    let shuffledDeck = [...newDeck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
  };

  // Starting a new game
  const dealInitialCards = () => {
    const newDeck = shuffleDeck(generateDeck());
    setDeck(newDeck);
    const initialPlayerHand = [newDeck[0], newDeck[2]];
    const initialDealerHand = [newDeck[1], newDeck[3]];
    setPlayerHand(initialPlayerHand);
    setDealerHand(initialDealerHand);
    setPlayerTotal(calculateHandValue(initialPlayerHand));
    setDealerTotal(calculateHandValue([newDeck[1]])); // Dealer's first card
    setGameStarted(true);
    setGameOver(false);
    setPlayerTurn(true);
    setPlayerWins(false);
    setTie(false);
  };

  // Handling player hit
  const handleHit = () => {
    const newCard = deck.pop();
    const newPlayerHand = [...playerHand, newCard];
    setPlayerHand(newPlayerHand);
    const playerValue = calculateHandValue(newPlayerHand);
    setPlayerTotal(playerValue);

    if (playerValue > 21) {
      // Player busts
      setGameOver(true);
      setPlayerTurn(false);
      setPlayerWins(false);
    }
  };

  const handleStand = () => {
    setPlayerTurn(false);
    setDealerTotal(calculateHandValue(dealerHand));
  };

  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setGameOver(false);
    setGameStarted(false);
    setPlayerTurn(true);
    setPlayerWins(false);
    setTie(false);
  };

  const checkForWinner = () => {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);

    console.log("Player Total:", playerValue);
    console.log("Dealer Total:", dealerValue);

    if (playerValue > 21) {
      setGameOver(true);
      setPlayerWins(false);
    } else if (dealerValue > 21) {
      setGameOver(true);
      setPlayerWins(true);
    } else if (dealerValue > playerValue) {
      setGameOver(true);
      setPlayerWins(false);
    } else if (playerValue > dealerValue) {
      setGameOver(true);
      setPlayerWins(true);
    } else if (playerValue === dealerValue) {
      setGameOver(true);
      setTie(true);
    }
  };

  useEffect(() => {
    if (!playerTurn && gameStarted) {
      let dealerValue = calculateHandValue(dealerHand);
      const newHand = [...dealerHand];

      while (dealerValue < 17) {
        const newCard = deck.pop();
        newHand.push(newCard);
        dealerValue = calculateHandValue(newHand);
      }

      setDealerHand(newHand);
      setDealerTotal(dealerValue);
    }
  }, [playerTurn]);

  useEffect(() => {
    if (gameOver || !playerTurn) {
      checkForWinner();
    }
  }, [dealerHand]);

  const updateScore = async (score, didWin) => {
    try {
      await axios.post("http://localhost:5000/api/users/update-score", {
        email: user.email,
        score: score,
        didWin: didWin,
      });
      console.log("Score updated successfully");
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  useEffect(() => {
    if (gameOver) {
      const playerScore = calculateHandValue(playerHand);
      const didWin = playerWins ? true : false;
      updateScore(playerScore, didWin);
    }
  }, [gameOver]);

  return (
    <div className="blackjack-game">
      <h1>Blackjack</h1>
      {playerWins && <Confetti />}
      {!gameStarted ? (
        <button className="start-button" onClick={dealInitialCards}>
          Start Game
        </button>
      ) : (
        <>
          <div className="hands">
            <div className={`player-hand ${playerWins ? "winner" : ""}`}>
              <h2>Your Hand (Total: {playerTotal})</h2>
              <div className="cards">
                {playerHand.map((card, index) => (
                  <div className="card" key={index}>
                    <div className={`card-content ${card.suit}`}>
                      <span className="card-value">{card.value}</span>
                      <span className="card-suit">{card.suit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`dealer-hand ${
                !playerWins && !tie && gameOver ? "winner" : ""
              }`}
            >
              <h2>
                Dealer's Hand (Total:{" "}
                {playerTurn ? dealerTotal : calculateHandValue(dealerHand)})
              </h2>
              <div className="cards">
                {dealerHand.map((card, index) => (
                  <div className="card" key={index}>
                    {playerTurn && index === 0 ? (
                      <div className="card-back"></div>
                    ) : (
                      <div className={`card-content ${card.suit}`}>
                        <span className="card-value">{card.value}</span>
                        <span className="card-suit">{card.suit}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="controls">
            {playerTurn && (
              <button className="hit-button" onClick={handleHit}>
                Hit
              </button>
            )}
            {playerTurn && (
              <button className="stand-button" onClick={handleStand}>
                Stand
              </button>
            )}
          </div>

          {gameOver && (
            <>
              <p>
                Game Over!{" "}
                {tie
                  ? "It's a Tie!"
                  : playerWins
                  ? "Player Wins!"
                  : "Dealer Wins!"}
              </p>
              <button className="reset-button" onClick={resetGame}>
                Play Again!
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BlackjackGame;
