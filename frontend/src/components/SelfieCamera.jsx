import React, { useRef, useState } from "react";
import axios from "axios";
import "./SelfieCamera.css";

const SelfieCamera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [filter, setFilter] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const startCamera = async () => {
    setIsCameraOn(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setIsCameraOn(false);
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");

    // Apply filter directly to canvas
    context.filter = getCanvasFilter(filter);
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    const dataUrl = canvasRef.current.toDataURL("image/png");
    setCapturedImage(dataUrl);
    savePhoto(dataUrl);
  };

  const getCanvasFilter = (filterClass) => {
    switch (filterClass) {
      case "grayscale":
        return "grayscale(100%)";
      case "sepia":
        return "sepia(100%)";
      case "invert":
        return "invert(100%)";
      case "blur":
        return "blur(5px)";
      case "brightness":
        return "brightness(150%)";
      case "contrast":
        return "contrast(200%)";
      case "hue-rotate":
        return "hue-rotate(90deg)";
      case "saturate":
        return "saturate(200%)";
      default:
        return "none";
    }
  };

  const savePhoto = async (image) => {
    try {
      console.log("Sending image:", image.substring(0, 50));
      const response = await axios.post("/api/selfies/upload-base64", {
        image, // Send base64 string
      });
      console.log("Backend response:", response.data);
      alert("Selfie saved successfully!");
    } catch (error) {
      console.error("Error uploading selfie:", error.response || error.message);
      alert("Failed to save selfie.");
    }
  };

  return (
    <div className="selfie-camera">
      <h2>Selfie Camera</h2>
      <div className="camera-container">
        <video ref={videoRef} className={`video ${filter}`} />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          style={{ display: "none" }}
        />
      </div>
      <div className="controls">
        {!isCameraOn ? (
          <button onClick={startCamera}>Start Camera</button>
        ) : (
          <button onClick={stopCamera}>Stop Camera</button>
        )}
        <button onClick={capturePhoto} disabled={!isCameraOn}>
          Capture Photo
        </button>
        {capturedImage && (
          <a href={capturedImage} download="selfie.png">
            <button>Download Image</button>
          </a>
        )}
      </div>
      <div className="filters">
        <button onClick={() => setFilter("none")}>No Filter</button>
        <button onClick={() => setFilter("grayscale")}>Grayscale</button>
        <button onClick={() => setFilter("sepia")}>Sepia</button>
        <button onClick={() => setFilter("invert")}>Invert</button>
        <button onClick={() => setFilter("blur")}>Blur</button>
        <button onClick={() => setFilter("brightness")}>Brightness</button>
        <button onClick={() => setFilter("contrast")}>Contrast</button>
        <button onClick={() => setFilter("hue-rotate")}>Hue Rotate</button>
        <button onClick={() => setFilter("saturate")}>Saturate</button>
      </div>
    </div>
  );
};

export default SelfieCamera;
