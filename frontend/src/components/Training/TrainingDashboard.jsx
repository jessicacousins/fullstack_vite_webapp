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
    <div className="trainingDashboard">
      <h1>📚 Employee Training Hub</h1>

      <p className="trainingDescription">
        This training module provides essential **workplace compliance** and
        **skill enhancement** sessions. Employees will gain **industry-standard
        knowledge** and best practices across various categories, including:
      </p>

      <ul className="trainingDirections">
        <li>✅ Compliance & Workplace Safety Regulations</li>
        <li>✅ Cybersecurity Awareness & Data Protection</li>
        <li>✅ Diversity, Equity, and Inclusion (DEI) Training</li>
        <li>✅ Leadership & Professional Development</li>
        <li>✅ Technical Skill Training for Digital Tools & Software</li>
      </ul>

      <p className="trainingNote">
        <strong>💡 Select a training session below to begin!</strong>
        These courses are designed to help employees **improve workplace
        knowledge, ensure safety, and maintain compliance** with industry
        regulations.
      </p>

      <ul className="trainingList">
        {trainings.map((training) => (
          <li key={training.trainingId} className="trainingItem">
            <Link
              to={`/training/${training.trainingId}`}
              className="trainingLink"
            >
              {training.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainingDashboard;
