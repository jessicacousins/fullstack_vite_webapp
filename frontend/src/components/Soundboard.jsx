import React from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; 
import trainSound from "../sounds/train.mp3"; 

function Soundboard() {
  const { user } = useAuth(); 
  const userEmail = user?.email; 

  const sounds = [
    { name: "Train", url: trainSound },

  ];

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

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Fun Soundboard</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {sounds.map((sound, index) => (
          <button
            key={index}
            onClick={() => playSound(sound)}
            style={{
              margin: "10px",
              padding: "20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {sound.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Soundboard;
