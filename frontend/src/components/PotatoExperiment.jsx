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
    <div className="experimentContainer">
      <h1 className="experimentTitle">⚡ Potato Battery Experiment</h1>

      <p className="experimentDescription">
        The potato battery experiment demonstrates how a potato can generate
        electricity using a simple chemical reaction. When a **copper
        electrode** (🪙) and a **zinc electrode** (🔩) are inserted into the
        potato, the natural acids inside act as an electrolyte, allowing
        electrons to flow between the metals. Connecting wires between multiple
        potatoes increases the voltage, and when the circuit is complete, the
        stored energy powers a small **light bulb** (💡).
      </p>

      <div className="experimentGrid">
        <div className="potato">
          <div className="electrode copper">🪙</div>
          <div className="electrode zinc">🔩</div>
        </div>

        <div className="wireSection" onClick={handleWireClick}>
          <svg className="wireSvg">
            <path
              d={connected ? "M10,20 C50,0 150,0 190,20" : "M10,20 L190,20"}
              stroke={connected ? "red" : "gray"}
              strokeWidth="5"
              fill="none"
            />
          </svg>
          <p className="wireText">
            Click to {connected ? "disconnect" : "connect"} wires
          </p>
        </div>

        <div className="potato">
          <div className="electrode copper">🪙</div>
          <div className="electrode zinc">🔩</div>
        </div>

        <div className="bulbContainer">
          <div className={`bulb ${bulbOn ? "on" : "off"}`}></div>
          <p className="bulbStatus">
            {bulbOn
              ? "💡 The light is ON! The circuit is complete."
              : "🔌 Connect wires to turn on the light."}
          </p>
        </div>
      </div>

      <p className="experimentConclusion">
        This experiment shows how chemical energy in a potato can be transformed
        into electrical energy, creating a basic **potato-powered circuit**.
      </p>
    </div>
  );
};

export default PotatoExperiment;
