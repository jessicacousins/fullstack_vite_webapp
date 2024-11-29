import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import trainSound from "../sounds/train.mp3";

function Soundboard() {
  const { user } = useAuth();
  const userEmail = user?.email;
  const [sounds, setSounds] = useState([
    { id: 1, name: "Train", url: trainSound },
  ]);

  const playSound = (sound) => {
    const audio = new Audio(sound.url);
    audio.play().catch((error) => {
      console.error("Error playing sound:", error);
    });

    if (userEmail) {
      axios
        .post("/api/soundboard/record", {
          email: userEmail,
          soundName: sound.name,
        })
        .then((response) => {
          console.log("Sound play recorded:", response.data.msg);
        })
        .catch((error) => {
          console.error("Error recording sound play:", error);
        });
    } else {
      console.warn("User not logged in. Sound play not recorded.");
    }
  };

  const addNewSoundButton = () => {
    const newId = sounds.length + 1;
    const newSound = {
      id: newId,
      name: `New Sound ${newId}`,
      url: "",
    };
    setSounds([...sounds, newSound]);
  };

  const updateSound = (id, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const updatedSounds = sounds.map((sound) =>
        sound.id === id
          ? {
              ...sound,
              name: file.name,
              url: e.target.result,
            }
          : sound
      );
      setSounds(updatedSounds);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      style={{
        fontFamily: "'Courier New', Courier, monospace",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        color: "#00ff99",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          textTransform: "uppercase",
          textShadow: "0 0 10px #00ff99, 0 0 20px #00ffcc",
        }}
      >
        Soundboard
      </h1>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button
          onClick={addNewSoundButton}
          style={{
            background: "#00ffaa",
            border: "none",
            color: "#000",
            fontSize: "1rem",
            padding: "8px 16px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Add New Sound Button
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "10px",
          padding: "20px",
        }}
      >
        {sounds.map((sound) => (
          <div
            key={sound.id}
            style={{
              background: "#1a1a2e",
              border: "2px solid #00ff99",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <button
              onClick={() => playSound(sound)}
              style={{
                background: "#00ff99",
                border: "none",
                color: "#000",
                fontSize: "0.9rem",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "5px",
                width: "100%",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {sound.name || "Unnamed Sound"}
            </button>
            <label
              style={{
                display: "block",
                background: "#ff0066",
                color: "white",
                padding: "5px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Replace Audio
              <input
                type="file"
                accept=".mp3, .wav"
                style={{ display: "none" }}
                onChange={(e) => updateSound(sound.id, e.target.files[0])}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Soundboard;
