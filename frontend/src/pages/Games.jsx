import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Games.css";

const Games = () => {
  const [blackjackLeaderboard, setBlackjackLeaderboard] = useState([]);
  const [memoryGameLeaderboard, setMemoryGameLeaderboard] = useState([]);
  const [simonSaysLeaderboard, setSimonSaysLeaderboard] = useState([]);
  const [snapQuestLeaderboard, setSnapQuestLeaderboard] = useState([]);
  const [ticTacToeLeaderboard, setTicTacToeLeaderboard] = useState([]);

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
    fetchLeaderboard(
      "/api/users/leaderboard/tic-tac-toe",
      setTicTacToeLeaderboard
    );
  }, []);

  return (
    <div className="games-container">
      <h1>Games</h1>

      <section className="leaderboard-section">
        {/* Tic Tac Toe Leaderboard */}
        <div className="leaderboard-card">
          <h3>Tic Tac Toe Leaderboard</h3>
          <ul>
            {ticTacToeLeaderboard.map((player, index) => (
              <li key={index}>
                <span
                  className={`rank ${
                    index === 0 ? "gold" : index === 1 ? "blue" : ""
                  }`}
                >
                  #{index + 1}
                </span>
                <span>{player.email}</span>
                <span>{player.ticTacToeGamesWon} wins</span>
              </li>
            ))}
          </ul>
        </div>

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
        <p>
          Test your luck and strategy in Blackjack! Aim to get a hand as close
          to 21 as possible without going over. Play against the dealer and see
          if you can beat the house. To review your performance and track your
          wins and highest scores, visit the Blackjack Stats page.
        </p>
        <Link to="/blackjack">Blackjack</Link>
        <Link to="/blackjack-stats">Blackjack Stats</Link>
      </section>
      <section className="game-section">
        <h2>Memory Game</h2>
        <p>
          Sharpen your cognitive skills with the Memory Game. Flip cards to find
          matching pairs and clear the board in the fewest turns possible.
          Challenge yourself to improve your memory and speed. Check your Memory
          Game Stats to see your best scores and track your progress over time.
        </p>
        <Link to="/memory-game">Memory Game</Link>
        <Link to="/memory-game-stats">Memory Game Stats</Link>
      </section>
      <section className="game-section">
        <h2>Simon Says</h2>
        <p>
          Put your memory to the ultimate test with Simon Says! Follow the
          sequence of lights and sounds, and try to repeat the pattern as it
          grows longer and more complex. See how far you can go and challenge
          your friends. Review your highest level achieved and track your
          progress on the Simon Says Stats page.
        </p>
        <Link to="/simon-says">Play Now</Link>
        <Link to="/simon-says-stats">Simon Says Stats</Link>
      </section>

      <section className="game-section">
        <h2>SnapQuest</h2>
        <p>
          Embark on a real-world scavenger hunt with SnapQuest! You'll be given
          an item to find, and you'll have 30 seconds to snap a photo and upload
          it. Score points for each successful find and compete for the highest
          score. Challenge your speed and observation skills with this exciting
          game!
        </p>
        <Link to="/snapquest">Play SnapQuest</Link>
      </section>

      <section className="game-section">
        <h2>Tic Tac Toe</h2>
        <p>
          Enjoy a classic game with a twist in Tic Tac Toe! Strategically place
          your marks to get three in a row, either horizontally, vertically, or
          diagonally. Challenge friends or play against the computer. It's a fun
          and quick way to test your strategic thinking.
        </p>
        <Link to="/tic-tac-toe">Play Now</Link>
      </section>
    </div>
  );
};

export default Games;
