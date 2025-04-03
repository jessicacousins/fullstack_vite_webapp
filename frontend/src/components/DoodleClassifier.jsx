import React, { useRef, useState, useEffect } from "react";
import "./DoodleClassifier.css";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

const DoodleClassifier = () => {
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // loading the TensorFlow model
    const loadModel = async () => {
      try {
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
        setLoading(false);
      } catch (error) {
        console.error("Error loading the model", error);
      }
    };
    loadModel();
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.strokeStyle = "#4af3eb";
    context.lineWidth = 4;
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setPrediction("");
    setConfidence(0);
  };

  const classifyDrawing = async () => {
    if (!model) return;

    const canvas = canvasRef.current;
    const imgTensor = tf.browser
      .fromPixels(canvas)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .expandDims();

    const predictions = await model.classify(imgTensor);
    if (predictions.length > 0) {
      setPrediction(predictions[0].className);
      setConfidence((predictions[0].probability * 100).toFixed(2));
    }
    imgTensor.dispose();
  };

  return (
    <div className="doodle-classifier-container">
      <h1 className="doodle-title">Doodle Classifier</h1>

      <div className="doodle-info-box">
        <h3 className="doodle-info-title">
          🧠 How the Doodle Classifier Works
        </h3>
        <ul className="doodle-info-list">
          <li>Draw anything you like inside the box using your mouse.</li>
          <li>
            When ready, click <strong>"Classify Drawing"</strong> and watch the
            AI guess what you made!
          </li>
          <li>
            The classifier is powered by <strong>TensorFlow.js</strong> and uses
            a real <strong>MobileNet</strong> deep learning model trained on
            thousands of images.
          </li>
          <li>
            Your drawing is converted into a 224x224 pixel image and processed
            in real-time using your browser — no server or upload needed!
          </li>
          <li>
            The model will predict the object category and display its{" "}
            <strong>confidence score</strong>.
          </li>
          <li>
            Press <strong>"Clear Canvas"</strong> to try again with a new
            drawing.
          </li>
        </ul>
        <p className="doodle-info-note">
          🤯 This tool shows how powerful client-side machine learning can be,
          enabling live image recognition directly in the browser without any
          external data sent!
        </p>
      </div>

      <p className="instructions">
        Draw something, and the AI will try to guess what it is!
      </p>
      {loading ? (
        <p className="loading-text">Loading AI Model... Please Wait</p>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="drawing-canvas"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          <div className="button-container">
            <button className="action-button" onClick={classifyDrawing}>
              Classify Drawing
            </button>
            <button className="clear-button" onClick={clearCanvas}>
              Clear Canvas
            </button>
          </div>
          {prediction && (
            <div className="results">
              <p>
                <strong>Prediction:</strong> {prediction}
              </p>
              <p>
                <strong>Confidence:</strong> {confidence}%
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DoodleClassifier;
