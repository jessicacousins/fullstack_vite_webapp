import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else if (value === "C") {
      setInput("");
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className="calculator-container">
      <h2 className="calculatorApp">Calculator App</h2>
      <div className="calculator-display">{input || "0"}</div>
      <div className="calculator-buttons">
        {[
          "7",
          "8",
          "9",
          "/",
          "C",
          "4",
          "5",
          "6",
          "*",
          "%",
          "1",
          "2",
          "3",
          "-",
          "√",
          "0",
          ".",
          "=",
          "+",
        ].map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn === "√" ? "Math.sqrt(" : btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
