import React, { useState } from "react";
import "./ImageEditor.css";

const ImageEditor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [filteredImage, setFilteredImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFilteredImage(imageUrl);
    }
  };

  const applyFilters = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();

    image.src = selectedImage;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);

      setFilteredImage(canvas.toDataURL());
    };
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setRotation(0);
    setFilteredImage(selectedImage);
  };

  return (
    <div className="image-editor-container">
      <h2 className="image-editor-header">Image Editor Tool</h2>

      <div className="image-editor-directions">
        <h3 className="image-editor-directions-title">
          🖼️ How to Use the Image Editor
        </h3>
        <p>
          This tool allows you to quickly apply simple edits to any image.
          Follow these steps:
        </p>
        <ol className="image-editor-directions-list">
          <li>Upload an image using the file input at the top.</li>
          <li>
            Adjust the <strong>Brightness</strong>, <strong>Contrast</strong>,
            and <strong>Rotation</strong> sliders as needed.
          </li>
          <li>
            Click <strong>Apply Filters</strong> to generate the preview with
            your edits.
          </li>
          <li>
            Use <strong>Reset</strong> to return all values to default.
          </li>
          <li>
            If you’re happy with the result, click{" "}
            <strong>Download Edited Image</strong> to save it locally.
          </li>
        </ol>
        <p>
          🎨 Perfect for quick adjustments, profile pics, or testing image ideas
          before further editing elsewhere.
        </p>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="image-upload-input"
      />

      {selectedImage && (
        <>
          <div className="image-editor-controls">
            <label>
              Brightness:
              <input
                type="range"
                min="0"
                max="200"
                value={brightness}
                onChange={(e) => setBrightness(e.target.value)}
              />
            </label>

            <label>
              Contrast:
              <input
                type="range"
                min="0"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(e.target.value)}
              />
            </label>

            <label>
              Rotation:
              <input
                type="range"
                min="0"
                max="360"
                value={rotation}
                onChange={(e) => setRotation(e.target.value)}
              />
            </label>
          </div>

          <div className="image-preview">
            <h3 className="image-preview-title">Image Preview</h3>
            <img
              src={filteredImage}
              alt="Edited"
              style={{
                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                transform: `rotate(${rotation}deg)`,
              }}
            />
          </div>

          <div className="image-editor-actions">
            <button onClick={applyFilters}>Apply Filters</button>
            <button onClick={resetFilters}>Reset</button>
            {filteredImage && (
              <a
                href={filteredImage}
                download="edited-image.png"
                className="download-button"
              >
                Download Edited Image
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageEditor;
