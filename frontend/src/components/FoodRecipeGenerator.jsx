import React, { useState } from "react";
import axios from "axios";
import "./FoodRecipeGenerator.css";

const FoodRecipeGenerator = () => {
  const [recipe, setRecipe] = useState(
    "Click the button to get a unique food recipe and educational insight!"
  );
  const [loading, setLoading] = useState(false);
  const [speechInstance, setSpeechInstance] = useState(null);

  const generateRecipe = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/food-recipe");
      setRecipe(response.data.recipe);
      speakRecipe(response.data.recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setRecipe("Oops! Something went wrong. Try again.");
    }
    setLoading(false);
  };

  const speakRecipe = (text) => {
    stopSpeech();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    setSpeechInstance(speech);
    window.speechSynthesis.speak(speech);
  };

  const stopSpeech = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setSpeechInstance(null);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(recipe);
    alert("Recipe copied to clipboard!");
  };

  return (
    <div className="recipe-container">
      <h1>🍽️ Food Recipe & Insight Generator</h1>
      <div className="food-ai-info-box">
        <h3 className="food-ai-info-heading">How It Works</h3>
        <p className="food-ai-info-text">
          This generator uses an AI-powered backend to deliver unique food
          recipes with educational insights. Each click sends a live request to
          OpenAI to create a brand new response.
        </p>
        <p className="food-ai-info-text">
          You can listen to the result using text-to-speech or copy it to your
          clipboard for later. It's ideal for creative cooking ideas and
          learning something new.
        </p>
      </div>

      <p className="recipe-text">{recipe}</p>
      <div className="buttons">
        <button onClick={generateRecipe} disabled={loading}>
          {loading ? "⏳ Generating..." : "🍳 Generate Recipe"}
        </button>
        <button onClick={copyToClipboard}>📋 Copy Recipe</button>
        <button onClick={() => speakRecipe(recipe)}>🔊 Read Recipe</button>
        <button onClick={stopSpeech}>🛑 Stop</button>
      </div>
    </div>
  );
};

export default FoodRecipeGenerator;
