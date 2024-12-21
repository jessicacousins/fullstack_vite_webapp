import React, { useState, useEffect } from "react";
import "./PomodoroTimer.css";

const PomodoroTimer = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);

  useEffect(() => {
    setTimeLeft(isWorkSession ? workTime * 60 : breakTime * 60);
  }, [workTime, breakTime, isWorkSession]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      if (isWorkSession) {
        alert("Work session complete! Take a break.");
        setIsWorkSession(false);
      } else {
        alert("Break time over! Back to work.");
        setIsWorkSession(true);
      }
    }
  }, [isRunning, timeLeft, isWorkSession]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const handleStart = () => setIsRunning(true);

  const handleStop = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(isWorkSession ? workTime * 60 : breakTime * 60);
  };

  return (
    <div className="pomodoro-container">
      <h1 className="pomodoro-heading">Pomodoro Timer</h1>
      <p>
        The Pomodoro Technique is a time management method using a timer for
        25-minute work intervals with short breaks.
      </p>
      <p className="mode-label">{isWorkSession ? "Work Time" : "Break Time"}</p>
      <p className="timer-display">{formatTime(timeLeft)}</p>
      <div className="timer-controls">
        <button className="btn" onClick={handleStart}>
          Start
        </button>
        <button className="btn" onClick={handleStop}>
          Stop
        </button>
        <button className="btn" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="settings">
        <label>
          Work Time (minutes):
          <input
            type="number"
            value={workTime}
            onChange={(e) => setWorkTime(Number(e.target.value))}
            min="1"
          />
        </label>
        <label>
          Break Time (minutes):
          <input
            type="number"
            value={breakTime}
            onChange={(e) => setBreakTime(Number(e.target.value))}
            min="1"
          />
        </label>
      </div>
    </div>
  );
};

export default PomodoroTimer;
