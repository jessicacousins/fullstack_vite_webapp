import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { TRAINING_DATA } from "../data/fashion-mnist";
import "./FashionClassifier.css";

const LOOKUP = [
  "T-shirt",
  "Trouser",
  "Pullover",
  "Dress",
  "Coat",
  "Sandal",
  "Shirt",
  "Sneaker",
  "Bag",
  "Ankle boot",
];

const FashionClassifier = ({ selectedProduct }) => {
  const [prediction, setPrediction] = useState("Loading model...");
  const [predictionClass, setPredictionClass] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadAndTrainModel = async () => {
      try {
        const model = tf.sequential();
        model.add(
          tf.layers.conv2d({
            inputShape: [28, 28, 1],
            filters: 16,
            kernelSize: 3,
            activation: "relu",
          })
        );
        model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));
        model.add(tf.layers.flatten());
        model.add(tf.layers.dense({ units: 128, activation: "relu" }));
        model.add(tf.layers.dense({ units: 10, activation: "softmax" }));

        model.compile({
          optimizer: "adam",
          loss: "categoricalCrossentropy",
          metrics: ["accuracy"],
        });

        const numSamples = TRAINING_DATA.inputs.length;
        const inputSize = 784;
        const inputsTensor = tf
          .tensor2d(TRAINING_DATA.inputs, [numSamples, inputSize])
          .reshape([numSamples, 28, 28, 1])
          .div(tf.scalar(255));
        const outputsTensor = tf.oneHot(
          tf.tensor1d(TRAINING_DATA.outputs, "int32"),
          10
        );

        await model.fit(inputsTensor, outputsTensor, {
          epochs: 10,
          validationSplit: 0.2,
          batchSize: 256,
          shuffle: true,
          callbacks: {
            onEpochEnd: (epoch, logs) => {
              setPrediction(
                `Training Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}`
              );
              setLoadingProgress(((epoch + 1) / 10) * 100);
            },
            onTrainEnd: () => {
              setIsLoading(false);
              setPrediction("Model is ready for predictions");
              setModel(model);
            },
          },
        });

        inputsTensor.dispose();
        outputsTensor.dispose();
      } catch (error) {
        console.error("Error loading or training the model:", error);
        setPrediction("Failed to load model.");
        setIsLoading(false);
      }
    };

    loadAndTrainModel();
  }, []);

  useEffect(() => {
    if (model && selectedProduct) {
      evaluate(model, selectedProduct);
    }
  }, [model, selectedProduct]);

  const evaluate = async (model, product) => {
    if (!product) return;

    const inputTensor = await preprocessImage(product.image);
    const predictionResult = model.predict(inputTensor).argMax(-1);
    const predIndex = await predictionResult.array();

    const expectedLabelIndex = LOOKUP.indexOf(product.label);
    setPrediction(LOOKUP[predIndex[0]]);
    setPredictionClass(
      predIndex[0] === expectedLabelIndex ? "correct" : "wrong"
    );

    inputTensor.dispose();
    predictionResult.dispose();
  };

  const preprocessImage = (imagePath) => {
    const img = new Image();
    img.src = imagePath;

    return new Promise((resolve) => {
      img.onload = () => {
        let imageTensor = tf.browser.fromPixels(img);

        // Convert RGB to grayscale by averaging the color channels
        if (imageTensor.shape[2] === 3) {
          imageTensor = imageTensor.mean(2).expandDims(-1);
        }

        imageTensor = imageTensor
          .resizeBilinear([28, 28])
          .expandDims(0)
          .toFloat()
          .div(tf.scalar(255));

        resolve(imageTensor);
      };
    });
  };

  return (
    <div className="fashion-classifier">
      <h2>Fashion MNIST Classifier</h2>
      <p className={`prediction ${predictionClass}`}>{prediction}</p>
      {isLoading && (
        <div className="loading-bar">
          <div
            className="loading-progress"
            style={{ width: `${loadingProgress}%` }}
          ></div>
          <span>Loading: {loadingProgress.toFixed(0)}%</span>
        </div>
      )}
    </div>
  );
};

export default FashionClassifier;
