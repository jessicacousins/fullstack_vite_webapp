import React, { useState } from "react";
import "./UnitConverter.css";

const UnitConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputUnit, setInputUnit] = useState("meters");
  const [outputUnit, setOutputUnit] = useState("kilometers");
  const [result, setResult] = useState("");

  const conversionRates = {
    length: {
      meters: {
        kilometers: 0.001,
        miles: 0.000621371,
        feet: 3.28084,
        inches: 39.3701,
        meters: 1,
      },
      kilometers: {
        meters: 1000,
        miles: 0.621371,
        feet: 3280.84,
        inches: 39370.1,
        kilometers: 1,
      },
      miles: {
        meters: 1609.34,
        kilometers: 1.60934,
        feet: 5280,
        inches: 63360,
        miles: 1,
      },
      feet: {
        meters: 0.3048,
        kilometers: 0.0003048,
        miles: 0.000189394,
        inches: 12,
        feet: 1,
      },
      inches: {
        meters: 0.0254,
        kilometers: 0.0000254,
        miles: 0.000015783,
        feet: 0.0833333,
        inches: 1,
      },
    },
    weight: {
      grams: {
        kilograms: 0.001,
        pounds: 0.00220462,
        ounces: 0.035274,
        grams: 1,
      },
      kilograms: { grams: 1000, pounds: 2.20462, ounces: 35.274, kilograms: 1 },
      pounds: { grams: 453.592, kilograms: 0.453592, ounces: 16, pounds: 1 },
      ounces: {
        grams: 28.3495,
        kilograms: 0.0283495,
        pounds: 0.0625,
        ounces: 1,
      },
    },
    temperature: {
      celsius: {
        fahrenheit: (value) => (value * 9) / 5 + 32,
        celsius: (value) => value,
      },
      fahrenheit: {
        celsius: (value) => ((value - 32) * 5) / 9,
        fahrenheit: (value) => value,
      },
    },
  };

  const getCategory = (unit) => {
    if (conversionRates.length[unit]) return "length";
    if (conversionRates.weight[unit]) return "weight";
    if (conversionRates.temperature[unit]) return "temperature";
    return null;
  };

  const handleConversion = () => {
    if (!inputValue || isNaN(inputValue)) {
      alert("Please enter a valid number.");
      return;
    }

    const inputCategory = getCategory(inputUnit);
    const outputCategory = getCategory(outputUnit);

    if (inputCategory !== outputCategory) {
      alert(
        "You can only convert within the same category (e.g., length, weight, or temperature)."
      );
      return;
    }

    let convertedValue = 0;
    if (inputCategory === "temperature") {
      const conversionFunc = conversionRates.temperature[inputUnit][outputUnit];
      convertedValue = conversionFunc(parseFloat(inputValue));
    } else {
      const rate = conversionRates[inputCategory][inputUnit][outputUnit];
      convertedValue = parseFloat(inputValue) * rate;
    }

    setResult(
      `${inputValue} ${inputUnit} = ${convertedValue.toFixed(2)} ${outputUnit}`
    );
  };

  return (
    <div className="unit-converter-container">
      <h2 className="unit-converter-header">Unit Converter Tool</h2>
      <div className="unit-directions-box">
        <h3 className="unit-directions-title">
          📏 How to Use the Unit Converter
        </h3>
        <p>
          This tool lets you convert between units of <strong>length</strong>,{" "}
          <strong>weight</strong>, and <strong>temperature</strong>. Follow
          these steps:
        </p>
        <ol className="unit-directions-list">
          <li>Enter a number into the input field.</li>
          <li>
            Select the unit you're converting <strong>from</strong>.
          </li>
          <li>
            Select the unit you're converting <strong>to</strong>.
          </li>
          <li>
            Click the <strong>Convert</strong> button to see the result below.
          </li>
        </ol>
        <p>
          ✅ Note: You can only convert between units in the{" "}
          <em>same category</em>. For example, you cannot convert kilometers to
          kilograms.
        </p>
      </div>

      <form
        className="unit-converter-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="number"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="unit-input"
        />

        <label htmlFor="input-unit">From:</label>
        <select
          id="input-unit"
          value={inputUnit}
          onChange={(e) => setInputUnit(e.target.value)}
          className="unit-select"
        >
          <optgroup label="Length">
            <option value="meters">Meters</option>
            <option value="kilometers">Kilometers</option>
            <option value="miles">Miles</option>
            <option value="feet">Feet</option>
            <option value="inches">Inches</option>
          </optgroup>
          <optgroup label="Weight">
            <option value="grams">Grams</option>
            <option value="kilograms">Kilograms</option>
            <option value="pounds">Pounds</option>
            <option value="ounces">Ounces</option>
          </optgroup>
          <optgroup label="Temperature">
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
          </optgroup>
        </select>

        <label htmlFor="output-unit">To:</label>
        <select
          id="output-unit"
          value={outputUnit}
          onChange={(e) => setOutputUnit(e.target.value)}
          className="unit-select"
        >
          <optgroup label="Length">
            <option value="meters">Meters</option>
            <option value="kilometers">Kilometers</option>
            <option value="miles">Miles</option>
            <option value="feet">Feet</option>
            <option value="inches">Inches</option>
          </optgroup>
          <optgroup label="Weight">
            <option value="grams">Grams</option>
            <option value="kilograms">Kilograms</option>
            <option value="pounds">Pounds</option>
            <option value="ounces">Ounces</option>
          </optgroup>
          <optgroup label="Temperature">
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
          </optgroup>
        </select>

        <button
          type="button"
          onClick={handleConversion}
          className="convert-button"
        >
          Convert
        </button>
      </form>

      {result && <p className="conversion-result">{result}</p>}
    </div>
  );
};

export default UnitConverter;
