import React, { useState, useEffect } from "react";
import "./ZenBreathing.css";

const ZenBreathing = () => {
  const [step, setStep] = useState("inhale");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (step === "inhale") {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 4) {
            setStep("hold");
            setSeconds(0);
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    } else if (step === "hold") {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 7) {
            setStep("exhale");
            setSeconds(0);
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    } else if (step === "exhale") {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 8) {
            setStep("inhale");
            setSeconds(0);
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="zen-breathing-container">
      <h2>Zen Breathing: 4-7-8 Technique</h2>
      <p className="relaxWords">Relax and follow the breathing cycle below.</p>

      <div className="breathing-display">
        <div
          className={`breathing-circle ${step}`}
          style={{
            animationDuration: `${
              step === "inhale" ? 4 : step === "hold" ? 7 : 8
            }s`,
          }}
        ></div>
        <h3 className="directionsLive">
          {step === "inhale" ? "Inhale" : step === "hold" ? "Hold" : "Exhale"}
        </h3>
        <p className="breathing-timer">{seconds}s</p>
      </div>

      <div className="instruction">
        <p>
          <strong>4 seconds:</strong> Inhale slowly.
        </p>
        <p>
          <strong>7 seconds:</strong> Hold your breath.
        </p>
        <p>
          <strong>8 seconds:</strong> Exhale completely.
        </p>
      </div>
    </div>
  );
};

export default ZenBreathing;
