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
      <h4 className="reactionInstructions">
        This test measures your reaction time. Here's how it works:
      </h4>

      <ol className="reactionList">
        <li>Click the "Start Test" button.</li>
        <li>Wait for the box to turn red.</li>
        <li>As soon as the box turns red, click it as quickly as possible.</li>
        <li>Your reaction time will be displayed in milliseconds.</li>
      </ol>

      <p className="reactionInstructions">
        Here are some average reaction time levels:
      </p>

      <ul className="reactionLevels">
        <li>
          <strong>Fast (Around 200ms):</strong> This is considered a very fast
          reaction time, similar to that of a professional athlete reacting to a
          starting pistol.
        </li>
        <li>
          <strong>Medium (Around 250-300ms):</strong> This is a typical reaction
          time, similar to a driver reacting to a traffic light changing.
        </li>
        <li>
          <strong>Slow (Around 350ms or more):</strong> This is a slower
          reaction time, comparable to someone reacting to a sudden sound while
          distracted.
        </li>
      </ul>

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
      <button className="start1" onClick={startTest}>
        Start Test
      </button>
      <div class="noteSection">
        Note: It's important to remember that reaction time is highly variable.
        Reaction time generally slows down with age. Fatigue, illness, and
        certain medical conditions can affect reaction time. Reaction time to
        auditory stimuli is typically faster than to visual stimuli.
        Distractions can significantly slow down reaction time. There's a wide
        range of normal reaction times among individuals. Regular practice can
        improve reaction time.
      </div>
    </div>
  );
};

export default ReactionSpeedTest;
