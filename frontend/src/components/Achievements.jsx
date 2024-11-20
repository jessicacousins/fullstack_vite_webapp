import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Achievements.css";
import { useAuth } from "../context/AuthContext";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!user?.email) return;

      try {
        const response = await axios.get(
          `/api/users/${user.email}/achievements`
        );
        setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        setError("Failed to load achievements. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [user]);

  if (loading) {
    return <p>Loading achievements...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="achievements-container">
      <h1 className="achievements-title">Your Achievements</h1>
      {achievements.length > 0 ? (
        <div className="achievement-list">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <h3>{achievement.name}</h3>
              <p>{achievement.description}</p>
              <small>
                Date Earned:{" "}
                {new Date(achievement.dateEarned).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      ) : (
        <p>No achievements earned yet!</p>
      )}
    </div>
  );
};

export default Achievements;
