import React, { useState, useRef } from "react";
import axios from "axios";
import "./PatternDesigner.css";

const PatternDesigner = () => {
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState("circle");
  const [color, setColor] = useState("#ff0000");
  const [background, setBackground] = useState("#ffffff");
  const [draggingShapeId, setDraggingShapeId] = useState(null);
  const canvasRef = useRef();
  const contextRef = useRef(null);

  React.useEffect(() => {
    const fetchShapes = async () => {
      try {
        const response = await axios.get("/api/patterns");
        if (response.data.shapes) {
          setShapes(response.data.shapes);
          setBackground(response.data.background || "#ffffff");
        }
      } catch (error) {
        console.error("Error fetching shapes:", error);
      }
    };

    fetchShapes();
  }, []);

  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      contextRef.current = context;
    }
  }, [canvasRef]);

  const addShape = async () => {
    const newShape = {
      id: shapes.length + 1,
      type: currentShape,
      color,
      x: 100,
      y: 100,
      size: 50,
    };

    try {
      const response = await axios.post("/api/patterns/addShape", newShape);
      setShapes([...shapes, response.data]);
    } catch (error) {
      console.error("Error adding shape:", error);
    }
  };

  const savePattern = async () => {
    const canvas = canvasRef.current;

    const context = contextRef.current;
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);

    shapes.forEach((shape) => {
      context.fillStyle = shape.color;
      if (shape.type === "circle") {
        context.beginPath();
        context.arc(
          shape.x + shape.size / 2,
          shape.y + shape.size / 2,
          shape.size / 2,
          0,
          2 * Math.PI
        );
        context.fill();
      } else if (shape.type === "square") {
        context.fillRect(shape.x, shape.y, shape.size, shape.size);
      } else if (shape.type === "triangle") {
        context.beginPath();
        context.moveTo(shape.x + shape.size / 2, shape.y);
        context.lineTo(shape.x, shape.y + shape.size);
        context.lineTo(shape.x + shape.size, shape.y + shape.size);
        context.closePath();
        context.fill();
      }
    });

    const dataUrl = canvas.toDataURL("image/png");

    try {
      await axios.post("/api/patterns", {
        image: dataUrl,
        shapes,
        background,
      });
      alert("Pattern saved successfully!");
    } catch (error) {
      console.error("Error saving pattern:", error);
      alert("Failed to save pattern. Try again later.");
    }
  };

  const updateShapePosition = async (updatedShape) => {
    try {
      await axios.put(
        `/api/patterns/updateShape/${updatedShape.id}`,
        updatedShape
      );
    } catch (error) {
      console.error("Error updating shape position:", error);
    }
  };

  const handleMouseDown = (id) => {
    setDraggingShapeId(id);
  };

  const handleMouseMove = (e) => {
    if (draggingShapeId) {
      const canvasBounds = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - canvasBounds.left;
      const mouseY = e.clientY - canvasBounds.top;

      setShapes((prevShapes) =>
        prevShapes.map((shape) => {
          if (shape.id === draggingShapeId) {
            const updatedShape = {
              ...shape,
              x: mouseX - shape.size / -2,
              y: mouseY - shape.size / -40,
            };

            updateShapePosition(updatedShape);
            return updatedShape;
          }
          return shape;
        })
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingShapeId(null);
  };

  return (
    <div className="pattern-designer">
      <h2>Pattern Designer</h2>

      <div className="controls">
        <label>
          Shape:
          <select
            value={currentShape}
            onChange={(e) => setCurrentShape(e.target.value)}
          >
            <option value="circle">Circle</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
          </select>
        </label>

        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>

        <label>
          Background:
          <input
            type="color"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />
        </label>

        <button onClick={addShape}>Add Shape</button>
        <button onClick={savePattern}>Save Pattern</button>
      </div>

      <div
        className="canvas-container"
        style={{ backgroundColor: background }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <canvas ref={canvasRef} width={500} height={500} />
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className={`shape ${shape.type}`}
            style={{
              backgroundColor: shape.color,
              top: `${shape.y}px`,
              left: `${shape.x}px`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
            onMouseDown={() => handleMouseDown(shape.id)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PatternDesigner;
