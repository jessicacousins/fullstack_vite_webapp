import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Games.css";

const Games = () => {
  const [blackjackLeaderboard, setBlackjackLeaderboard] = useState([]);
  const [memoryGameLeaderboard, setMemoryGameLeaderboard] = useState([]);
  const [simonSaysLeaderboard, setSimonSaysLeaderboard] = useState([]);
  const [snapQuestLeaderboard, setSnapQuestLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async (url, setState) => {
      try {
        const response = await axios.get(url);
        setState(response.data.slice(0, 5)); // Display top 5 players
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard(
      "/api/users/leaderboard/blackjack",
      setBlackjackLeaderboard
    );
    fetchLeaderboard(
      "/api/users/leaderboard/memory-game",
      setMemoryGameLeaderboard
    );
    fetchLeaderboard(
      "/api/users/leaderboard/simon-says",
      setSimonSaysLeaderboard
    );
    fetchLeaderboard(
      "/api/users/leaderboard/snapquest",
      setSnapQuestLeaderboard
    );
  }, []);

  return (
    <div className="games-container">
      <h1>Games</h1>

      <section className="leaderboard-section">
        {/* Blackjack Leaderboard */}
        <div className="leaderboard-card">
          <h3>Blackjack Leaderboard</h3>
          <ul>
            {blackjackLeaderboard.map((player, index) => (
              <li key={index}>
                <span
                  className={`rank ${
                    index === 0 ? "gold" : index === 1 ? "blue" : ""
                  }`}
                >
                  #{index + 1}
                </span>
                <span>{player.email}</span>
                <span>{player.highestScore} points</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Memory Game Leaderboard */}
        <div className="leaderboard-card">
          <h3>Memory Game Leaderboard</h3>
          <ul>
            {memoryGameLeaderboard.map((player, index) => (
              <li key={index}>
                <span
                  className={`rank ${
                    index === 0 ? "gold" : index === 1 ? "blue" : ""
                  }`}
                >
                  #{index + 1}
                </span>
                <span>{player.email}</span>
                <span>{player.bestMemoryGameScore} turns</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Simon Says Leaderboard */}
        <div className="leaderboard-card">
          <h3>Simon Says Leaderboard</h3>
          <ul>
            {simonSaysLeaderboard.map((player, index) => (
              <li key={index}>
                <span
                  className={`rank ${
                    index === 0 ? "gold" : index === 1 ? "blue" : ""
                  }`}
                >
                  #{index + 1}
                </span>
                <span>{player.email}</span>
                <span>Level {player.simonSaysHighestLevel}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SnapQuest Leaderboard */}
        <div className="leaderboard-card">
          <h3>SnapQuest Leaderboard</h3>
          <ul>
            {snapQuestLeaderboard.map((player, index) => (
              <li key={index}>
                <span
                  className={`rank ${
                    index === 0 ? "gold" : index === 1 ? "blue" : ""
                  }`}
                >
                  #{index + 1}
                </span>
                <span>{player.email}</span>
                <span>{player.highestSnapQuestScore} points</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Game Links */}
      <section className="game-section">
        <h2>Blackjack</h2>
        <p>A classic game.</p>
        <Link to="/blackjack">Blackjack</Link>
        <Link to="/blackjack-stats">Blackjack Stats</Link>
      </section>
      <section className="game-section">
        <h2>Memory Game</h2>
        <p>Test your memory skills by matching cards as fast as you can!</p>
        <Link to="/memory-game">Memory Game</Link>
        <Link to="/memory-game-stats">Memory Game Stats</Link>
      </section>
      <section className="game-section">
        <h2>Simon Says</h2>
        <p>Challenge your memory with Simon Says!</p>
        <Link to="/simon-says">Play Now</Link>
        <Link to="/simon-says-stats">Simon Says Stats</Link>
      </section>

      <section className="game-section">
        <h2>SnapQuest</h2>
        <p>
          Find and upload an image of a given item within 30 seconds to score
          points!
        </p>
        <Link to="/snapquest">Play SnapQuest</Link>
      </section>

      <section className="game-section">
        <h2>Tic Tac Toe</h2>
        <p>A fun twist on the classic Tic Tac Toe game.</p>
        <Link to="/tic-tac-toe">Play Now</Link>
      </section>
    </div>
  );
};

export default Games;
