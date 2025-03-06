import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./FinalTest.css";

const FinalTest = () => {
  const { trainingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/test-trainings/${trainingId}`)
      .then((response) => setQuestions(response.data.finalTest))
      .catch((error) => console.error("Error fetching final test:", error));
  }, [trainingId]);

  const handleAnswer = (index, answer) => {
    setAnswers({ ...answers, [index]: answer });
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      const response = await axios.post(
        `/api/test-trainings/${trainingId}/submit-test`,
        { userId: user.uid, answers }
      );
      setScore(response.data.score);
      setPassed(response.data.passed);
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  return (
    <div className="final-test">
      <h1>Final Test</h1>
      {questions.map((q, i) => (
        <div key={i}>
          <p>{q.question}</p>
          {q.options.map((opt, j) => (
            <button
              key={j}
              className={answers[i] === opt ? "selected" : ""}
              onClick={() => handleAnswer(i, opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {score !== null && (
        <div>
          <h2>Your Score: {score}%</h2>
          {passed ? <p>🎉 You Passed!</p> : <p>❌ You Failed. Try Again.</p>}
          <button onClick={() => navigate(`/training/${trainingId}`)}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default FinalTest;
