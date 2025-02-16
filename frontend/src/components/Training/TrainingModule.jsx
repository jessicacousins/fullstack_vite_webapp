import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./TrainingModule.css";

const TrainingModule = () => {
  const { trainingId } = useParams();
  const [training, setTraining] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios
      .get(`/api/test-trainings/${trainingId}`)
      .then((response) => setTraining(response.data))
      .catch((error) => console.error("Error fetching training:", error));
  }, [trainingId]);

  if (!training) return <p>Loading...</p>;

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [sectionIndex]: answer });
  };

  return (
    <div className="training-module">
      <h1>{training.title}</h1>
      <h2>{training.sections[sectionIndex].title}</h2>
      <p>{training.sections[sectionIndex].content}</p>

      <div className="question-box">
        <p>{training.sections[sectionIndex].question.text}</p>
        {training.sections[sectionIndex].question.options.map((option, i) => (
          <button key={i} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={() => setSectionIndex(sectionIndex + 1)}
        disabled={sectionIndex >= training.sections.length - 1}
      >
        Next
      </button>

      {sectionIndex === training.sections.length - 1 && (
        <Link to={`/final-test/${trainingId}`} className="final-test-button">
          Take Final Test
        </Link>
      )}
    </div>
  );
};

export default TrainingModule;
