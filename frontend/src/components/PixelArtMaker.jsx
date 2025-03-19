import React, { useState } from "react";
import "./PixelArtMaker.css";

const PixelArtMaker = () => {
  const [gridSize, setGridSize] = useState(16); // default grid 16x16
  const [selectedColor, setSelectedColor] = useState("#4af3eb"); // default color
  const [pixelGrid, setPixelGrid] = useState(
    Array.from({ length: gridSize * gridSize }, () => "#ffffff")
  );

  const handleCellClick = (index) => {
    const newGrid = [...pixelGrid];
    newGrid[index] = selectedColor;
    setPixelGrid(newGrid);
  };

  const clearGrid = () => {
    setPixelGrid(Array.from({ length: gridSize * gridSize }, () => "#ffffff"));
  };

  const handleGridSizeChange = (size) => {
    setGridSize(size);
    setPixelGrid(Array.from({ length: size * size }, () => "#ffffff"));
  };

  return (
    <div className="pixel-art-container">
      <h2 className="pixelArtTitle">Pixel Art Maker</h2>
      <div className="pixelArtDirections">
        <h3>📌 How to Use the Pixel Art Maker:</h3>
        <ol>
          <li>
            <strong>Select a Brush Color:</strong> Click the color picker to
            choose your desired color.
          </li>
          <li>
            <strong>Choose a Grid Size:</strong> Pick between 8x8, 16x16, or
            32x32 for different levels of detail.
          </li>
          <li>
            <strong>Start Painting:</strong> Click on any square in the grid to
            color it.
          </li>
          <li>
            <strong>Clear Grid:</strong> Press the "Clear Grid" button to reset
            your artwork.
          </li>
          <li>
            <strong>Experiment & Have Fun!</strong> Try different colors and
            grid sizes to create unique pixel art designs.
          </li>
        </ol>
      </div>

      <div className="controls">
        <div className="color-picker">
          <label className="selectBrushColor">Select Brush Color</label>
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
        </div>

        <div className="grid-size-picker">
          <label>Grid Size:</label>
          <select
            value={gridSize}
            onChange={(e) => handleGridSizeChange(Number(e.target.value))}
          >
            <option value="8">8x8</option>
            <option value="16">16x16</option>
            <option value="32">32x32</option>
          </select>
        </div>

        <button className="clear-button" onClick={clearGrid}>
          Clear Grid
        </button>
      </div>

      <div
        className="pixel-grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {pixelGrid.map((color, index) => (
          <div
            key={index}
            className="pixel-cell"
            style={{ backgroundColor: color }}
            onClick={() => handleCellClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PixelArtMaker;
