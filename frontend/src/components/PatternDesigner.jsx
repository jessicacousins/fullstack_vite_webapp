import React, { useState, useRef } from "react";
import axios from "axios";
import "./PatternDesigner.css";

const PatternDesigner = () => {
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState("circle");
  const [color, setColor] = useState("#ff0000");
  const [background, setBackground] = useState("#ffffff");
  const canvasRef = useRef();

  const addShape = () => {
    const newShape = {
      id: shapes.length + 1,
      type: currentShape,
      color,
      x: 100,
      y: 100,
      size: 50,
    };
    setShapes([...shapes, newShape]);
  };

  const savePattern = async () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");

    try {
      await axios.post("/api/patterns", {
        image: dataUrl,
        shapes,
        background,
      });
      alert("Pattern saved successfully!");
    } catch (error) {
      console.error("Error saving pattern:", error);
      alert("Failed to save pattern. Try again later.");
    }
  };

  return (
    <div className="pattern-designer">
      <h2>Pattern Designer</h2>

      <div className="controls">
        <label>
          Shape:
          <select
            value={currentShape}
            onChange={(e) => setCurrentShape(e.target.value)}
          >
            <option value="circle">Circle</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
          </select>
        </label>

        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>

        <label>
          Background:
          <input
            type="color"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />
        </label>

        <button onClick={addShape}>Add Shape</button>
        <button onClick={savePattern}>Save Pattern</button>
      </div>

      <div className="canvas-container" style={{ backgroundColor: background }}>
        <canvas ref={canvasRef} width={500} height={500}></canvas>
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className={`shape ${shape.type}`}
            style={{
              backgroundColor: shape.color,
              top: `${shape.y}px`,
              left: `${shape.x}px`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PatternDesigner;
