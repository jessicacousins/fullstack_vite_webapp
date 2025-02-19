import React, { useState, useEffect } from "react";
import "./ReactionSpeedTest.css";

const ReactionSpeedTest = () => {
  const [gameState, setGameState] = useState("waiting");
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const startTest = () => {
    setReactionTime(null);
    setGameState("waiting");

    const randomDelay = Math.floor(Math.random() * 3000) + 2000; // random delay here between 2-5 seconds
    const id = setTimeout(() => {
      setGameState("ready");
      setStartTime(Date.now());
    }, randomDelay);

    setTimeoutId(id);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      setReactionTime("Too early! Wait for the cue!");
      clearTimeout(timeoutId);
    } else if (gameState === "ready") {
      const endTime = Date.now();
      const reactionDuration = endTime - startTime;
      setReactionTime(reactionDuration);

      if (!bestTime || reactionDuration < bestTime) {
        setBestTime(reactionDuration);
      }
      setGameState("clicked");
    } else {
      startTest();
    }
  };

  return (
    <div className="reaction-speed-test">
      <h2>Reaction Speed Test</h2>
      <div
        className={`cue-box ${
          gameState === "ready" ? "cue-box-active" : "cue-box-waiting"
        }`}
        onClick={handleClick}
      >
        {gameState === "waiting"
          ? "Wait for the cue..."
          : gameState === "ready"
          ? "CLICK!"
          : "Click to Start Again"}
      </div>
      <div className="result-section">
        {reactionTime && (
          <p className="reaction-result">
            Reaction Time:{" "}
            <strong>
              {reactionTime === "Too early! Wait for the cue!"
                ? reactionTime
                : `${reactionTime} ms`}
            </strong>
          </p>
        )}
        {bestTime && (
          <p className="best-time">
            Best Time: <strong>{bestTime} ms</strong>
          </p>
        )}
      </div>
      <button className="start-button1" onClick={startTest}>
        Start Test
      </button>
    </div>
  );
};

export default ReactionSpeedTest;
