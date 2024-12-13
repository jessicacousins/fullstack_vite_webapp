import React, { useState } from "react";
import { ChromePicker } from "react-color";
import "./ColorPicker.css";

const ColorPicker = ({ initialColor = "#66c0f4" }) => {
  const [color, setColor] = useState(initialColor); 
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  return (
    <div className="color-picker-container">
      <h2 className="color-picker-header">Color Picker Tool</h2>

      <button
        className="toggle-picker-button"
        onClick={() => setShowPicker((prev) => !prev)}
      >
        {showPicker ? "Close Picker" : "Pick a Color"}
      </button>

      {showPicker && (
        <div className="picker-popup">
          <ChromePicker color={color} onChange={handleColorChange} />
        </div>
      )}

      <div
        className="color-display"
        style={{
          backgroundColor: color,
          border: "1px solid #000",
          height: "100px",
          width: "100px",
          margin: "20px auto",
          borderRadius: "8px",
        }}
      ></div>
      <p className="color-code">Selected Color: {color}</p>
    </div>
  );
};

export default ColorPicker;
