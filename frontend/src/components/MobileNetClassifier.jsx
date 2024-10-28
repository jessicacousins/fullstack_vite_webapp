import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "./MobileNetClassifier.css";

const MobileNetClassifier = ({ selectedProduct }) => {
  const [prediction, setPrediction] = useState("Loading model...");
  const [predictionClass, setPredictionClass] = useState("");
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
      setPrediction("Model is ready for predictions");
    };
    loadModel();
  }, []);

  useEffect(() => {
    if (model && selectedProduct) {
      classifyImage(selectedProduct.image);
    }
  }, [model, selectedProduct]);

  const classifyImage = async (imagePath) => {
    const img = new Image();
    img.src = imagePath;
    img.onload = async () => {
      const predictions = await model.classify(img);
      if (predictions && predictions.length > 0) {
        setPrediction(predictions[0].className);
        setPredictionClass("prediction-success");
      } else {
        setPrediction("Unable to classify image");
        setPredictionClass("prediction-fail");
      }
    };
  };

  return (
    <div className="mobilenet-classifier">
      <h2>MobileNet Classifier</h2>
      <p className={`prediction ${predictionClass}`}>{prediction}</p>
    </div>
  );
};

export default MobileNetClassifier;
