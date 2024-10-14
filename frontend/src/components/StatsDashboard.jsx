// src/components/StatsDashboard.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const StatsDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/stats/${user.email}`
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
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
    <div>
      <h2>Your Blackjack Stats</h2>
      <ul>
        <li>Games Played: {stats.gamesPlayed}</li>
        <li>Games Won: {stats.gamesWon}</li>
        <li>Games Lost: {stats.gamesLost}</li>
        <li>Highest Score: {stats.highestScore}</li>
        <li>Longest Winning Streak: {stats.longestWinningStreak}</li>
      </ul>
    </div>
  );
};

export default StatsDashboard;
