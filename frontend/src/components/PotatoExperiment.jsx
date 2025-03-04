import React, { useState } from "react";
import "./PotatoExperiment.css";

const PotatoExperiment = () => {
  const [connected, setConnected] = useState(false);
  const [bulbOn, setBulbOn] = useState(false);

  const handleWireClick = () => {
    setConnected(!connected);
    setBulbOn(!bulbOn);
  };

  return (
    <div className="experiment-container">
      <h1>Potato Battery Experiment</h1>

      <div className="experiment-grid">
        <div className="potato">
          <div className="electrode copper">🪙</div>
          <div className="electrode zinc">🔩</div>
        </div>

        <div className="wire-section" onClick={handleWireClick}>
          <svg className="wire-svg">
            <path
              d={connected ? "M10,20 C50,0 150,0 190,20" : "M10,20 L190,20"}
              stroke={connected ? "red" : "gray"}
              strokeWidth="5"
              fill="none"
            />
          </svg>
          <p>Click to {connected ? "disconnect" : "connect"} wires</p>
        </div>

        <div className="potato">
          <div className="electrode copper">🪙</div>
          <div className="electrode zinc">🔩</div>
        </div>

        <div className="bulb-container">
          <div className={`bulb ${bulbOn ? "on" : "off"}`}></div>
          <p>
            {bulbOn ? "💡 Light is ON!" : "🔌 Connect wires to turn on light"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PotatoExperiment;
