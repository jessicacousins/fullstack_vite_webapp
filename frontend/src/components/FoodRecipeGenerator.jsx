import React, { useState } from "react";
import axios from "axios";
import "./FoodRecipeGenerator.css";

const FoodRecipeGenerator = () => {
  const [recipe, setRecipe] = useState(
    "Click the button to get a unique food recipe and educational insight!"
  );
  const [loading, setLoading] = useState(false);

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
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(recipe);
    alert("Recipe copied to clipboard!");
  };

  return (
    <div className="recipe-container">
      <h1>🍽️ Food Recipe & Insight Generator</h1>
      <p className="recipe-text">{recipe}</p>
      <div className="buttons">
        <button onClick={generateRecipe} disabled={loading}>
          {loading ? "⏳ Generating..." : "🍳 Generate Recipe"}
        </button>
        <button onClick={copyToClipboard}>📋 Copy Recipe</button>
        <button onClick={() => speakRecipe(recipe)}>🔊 Read Recipe</button>
      </div>
    </div>
  );
};

export default FoodRecipeGenerator;
