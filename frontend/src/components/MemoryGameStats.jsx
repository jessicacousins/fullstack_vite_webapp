import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./MemoryGameStats.css";

const MemoryGameStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/memory-game-stats/${user.email}`
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching memory game stats:", error);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (!stats) {
    return <p>Loading stats...</p>;
  }

  return (
    <div className="memory-game-stats">
      <h2>Your Memory Game Stats</h2>
      <ul>
        <li>Games Played: {stats.gamesPlayed}</li>
        <li>Best Score (Fewest Turns): {stats.bestScore}</li>
      </ul>
      <h3>All Scores:</h3>
      <ul>
        {stats.scores.map((score, index) => (
          <li key={index}>
            Turns: {score.turns} on {new Date(score.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoryGameStats;
