import React, { useState } from "react";
import { ChromePicker } from "react-color";
import "./ColorPicker.css";

const ColorPicker = ({ initialColor = "#b91356" }) => {
  const [color, setColor] = useState(initialColor);
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    alert(`Copied: ${value}`);
  };

  const getColorFormats = () => {
    const rgb = hexToRgb(color);
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
    return {
      hex: color,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      rgba,
    };
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const colorFormats = getColorFormats();

  return (
    <div className="color-picker-container">
      <h2 className="color-picker-header">Color Picker Tool</h2>
      <div className="color-picker-directions">
        <h3 className="color-picker-directions-title">
          How to Use the Color Picker
        </h3>
        <ul className="color-picker-directions-list">
          <li>
            Click <strong>"Pick a Color"</strong> to open the color selection
            panel.
          </li>
          <li>
            Choose your color using the built-in visual picker or hex/rgb
            inputs.
          </li>
          <li>
            The preview box updates instantly so you can see your color in
            real-time.
          </li>
          <li>
            Below the preview, you’ll see that same color formatted in{" "}
            <strong>Hex</strong>, <strong>RGB</strong>, and{" "}
            <strong>RGBA</strong>.
          </li>
          <li>
            Click any <strong>Copy</strong> button to copy that color format to
            your clipboard.
          </li>
        </ul>
        <p className="color-picker-note">
          Note: Great for designers, developers, and branding tasks that require
          precise color formats.
        </p>
      </div>

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

      <div className="color-info">
        <div className="color-format">
          <strong>Hex:</strong> {colorFormats.hex}
          <button
            className="copy-button"
            onClick={() => copyToClipboard(colorFormats.hex)}
          >
            Copy
          </button>
        </div>
        <div className="color-format">
          <strong>RGB:</strong> {colorFormats.rgb}
          <button
            className="copy-button"
            onClick={() => copyToClipboard(colorFormats.rgb)}
          >
            Copy
          </button>
        </div>
        <div className="color-format">
          <strong>RGBA:</strong> {colorFormats.rgba}
          <button
            className="copy-button"
            onClick={() => copyToClipboard(colorFormats.rgba)}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
