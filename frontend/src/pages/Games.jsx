import React from "react";
import { Link } from "react-router-dom";
import "./Games.css"; // Custom styles for the games page

const Games = () => {
  return (
    <div className="games-container">
      <h1>Games</h1>
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
        <h2>Trivia Quiz</h2>
        <p>
          Challenge yourself with fun trivia questions across various topics.
        </p>
        <Link to="/trivia-quiz">Play Now</Link>
      </section>
    </div>
  );
};

export default Games;
