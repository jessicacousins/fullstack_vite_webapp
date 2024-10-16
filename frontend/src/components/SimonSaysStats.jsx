import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SimonSaysStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/simon-says-stats/${user.email}`
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching Simon Says stats:", error);
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
    <div className="stats-container">
      <h1>Simon Says Stats</h1>
      <p>Total Games Played: {stats.gamesPlayed}</p>
      <p>Highest Level Reached: {stats.highestLevel}</p>
      <h2>Game History:</h2>
      <ul>
        {stats.gameRecords.map((record, index) => (
          <li key={index}>
            Level Reached: {record.levelReached} | Date:{" "}
            {new Date(record.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimonSaysStats;
