import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "./SnapQuestGame.css";

const SnapQuestGame = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.email || "guest");
  const [challenge, setChallenge] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [image, setImage] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isJudging, setIsJudging] = useState(false);
  const [model, setModel] = useState(null);

  useEffect(() => {
    fetchNewChallenge();
    fetchLeaderboard();
    loadModel();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else {
      handleGameOver();
    }
  }, [timeLeft]);

  const loadModel = async () => {
    const loadedModel = await mobilenet.load();
    setModel(loadedModel);
  };

  const fetchNewChallenge = () => {
    const items = ["cup", "pen", "phone", "hat", "book"];
    setChallenge(items[Math.floor(Math.random() * items.length)]);
    setTimeLeft(30);
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/snapquest/leaderboard"
      );
      setLeaderboard(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const classifyImage = async (imageFile) => {
    setIsJudging(true);
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);
    await img.decode();

    const predictions = await model.classify(img);
    const isCorrect = predictions.some((p) =>
      p.className.toLowerCase().includes(challenge.toLowerCase())
    );

    setIsJudging(false);
    return isCorrect;
  };

  const submitImage = async () => {
    if (!image || !model) return;

    try {
      const isCorrect = await classifyImage(image);
      if (!isCorrect) {
        alert("Try again! The image does not match the challenge.");
        return;
      }

      const formData = new FormData();
      formData.append("image", image);
      formData.append("username", username); 
      formData.append("challenge", challenge);

      const response = await axios.post(
        "http://localhost:5000/api/snapquest/upload",
        formData
      );
      if (response.data.success) {
        setScore(score + 1);
        alert("Correct! +1 point.");
        fetchLeaderboard();
        fetchNewChallenge();
        setImage(null);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting image:", error);
    }
  };

  const handleGameOver = () => {
    alert("Time's up! Game Over.");
    fetchNewChallenge();
    setScore(0);
  };

  return (
    <div className="snapquest-game">
      <h1>SnapQuest</h1>
      <h2>Find and Snap a: {challenge}</h2>
      <p>Time Left: {timeLeft} seconds</p>
      <p>Score: {score}</p>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={submitImage} disabled={isJudging || !image}>
        {isJudging ? "Judges are thinking..." : "Submit Image"}
      </button>

      <div className="leaderboard">
        <h3>Leaderboard</h3>
        <ul>
          {leaderboard.map((entry, index) => (
            <li key={index}>
              {entry.username}: {entry.highestSnapQuestScore} points
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SnapQuestGame;
