import React, { useState } from "react";
import "./GradientGenerator.css";

const GradientGenerator = () => {
  const [color1, setColor1] = useState("#ff7eb3");
  const [color2, setColor2] = useState("#ff758c");
  const [direction, setDirection] = useState("to right");
  const [copied, setCopied] = useState(false);

  const gradientStyle = {
    background: `linear-gradient(${direction}, ${color1}, ${color2})`,
  };

  const handleCopy = () => {
    const gradientCSS = `background: linear-gradient(${direction}, ${color1}, ${color2});`;
    navigator.clipboard.writeText(gradientCSS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="gradient-generator">
      <h1>CSS Gradient Generator</h1>
      <div className="preview" style={gradientStyle}></div>
      <div className="controls">
        <div className="color-picker">
          <label htmlFor="color1">Color 1</label>
          <input
            type="color"
            id="color1"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
          />
        </div>
        <div className="color-picker">
          <label htmlFor="color2">Color 2</label>
          <input
            type="color"
            id="color2"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
          />
        </div>
        <div className="direction-picker">
          <label htmlFor="direction">Direction</label>
          <select
            id="direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="to right">To Right</option>
            <option value="to left">To Left</option>
            <option value="to top">To Top</option>
            <option value="to bottom">To Bottom</option>
            <option value="to top right">To Top Right</option>
            <option value="to bottom left">To Bottom Left</option>
          </select>
        </div>
      </div>
      <button className="copy-button" onClick={handleCopy}>
        {copied ? "Copied!" : "Copy CSS"}
      </button>
    </div>
  );
};

export default GradientGenerator;
