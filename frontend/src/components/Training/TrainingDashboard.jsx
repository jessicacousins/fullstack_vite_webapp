import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TrainingDashboard.css";

const TrainingDashboard = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    axios
      .get("/api/test-trainings")
      .then((response) => setTrainings(response.data))
      .catch((error) => console.error("Error fetching trainings:", error));
  }, []);

  return (
    <div className="training-dashboard">
      <h1>📚 Available Trainings</h1>
      <ul>
        {trainings.map((training) => (
          <li key={training.trainingId}>
            <Link to={`/training/${training.trainingId}`}>
              {training.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainingDashboard;
