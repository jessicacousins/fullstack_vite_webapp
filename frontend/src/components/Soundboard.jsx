import React, { useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import trainSound from "../sounds/train.mp3";

//  tropical house tracks
import track1 from "../sounds/Untitled (1).mp3";
import track2 from "../sounds/Untitled (2).mp3";
import track3 from "../sounds/Untitled (3).mp3";
import track4 from "../sounds/Untitled (4).mp3";
import track5 from "../sounds/Untitled (5).mp3";
import track6 from "../sounds/Untitled (6).mp3";
import track7 from "../sounds/Untitled (7).mp3";
import track8 from "../sounds/Untitled (8).mp3";
import track9 from "../sounds/Untitled (9).mp3";
import track10 from "../sounds/Untitled (10).mp3";
import track11 from "../sounds/Untitled (11).mp3";
import track12 from "../sounds/Untitled (12).mp3";
import track13 from "../sounds/Untitled (13).mp3";
import track14 from "../sounds/Untitled (14).mp3";
import track15 from "../sounds/Untitled (15).mp3";
import track16 from "../sounds/Untitled (16).mp3";
import track17 from "../sounds/Untitled (17).mp3";
import track18 from "../sounds/Untitled (18).mp3";
import track19 from "../sounds/Untitled (19).mp3";
import track20 from "../sounds/Untitled (20).mp3";
import track21 from "../sounds/Untitled (21).mp3";

import "./Soundboard.css";

function Soundboard() {
  const { user } = useAuth();
  const userEmail = user?.email;

  const tropicalHouseTracks = [
    { id: 1, name: "Sunset Bliss", url: track1 },
    { id: 2, name: "Ocean Breeze", url: track2 },
    { id: 3, name: "Tropical Vibes", url: track3 },
    { id: 4, name: "Palm Paradise", url: track4 },
    { id: 5, name: "Island Glow", url: track5 },
    { id: 6, name: "Seafoam Dreams", url: track6 },
    { id: 7, name: "Hammock Haven", url: track7 },
    { id: 8, name: "Coconut Groove", url: track8 },
    { id: 9, name: "Lagoon Serenity", url: track9 },
    { id: 10, name: "Beach Bonfire", url: track10 },
    { id: 11, name: "Sandcastle Funk", url: track11 },
    { id: 12, name: "Wave Rider", url: track12 },
    { id: 13, name: "Coastal Chill", url: track13 },
    { id: 14, name: "Pineapple Jam", url: track14 },
    { id: 15, name: "Surfside Sunset", url: track15 },
    { id: 16, name: "Tiki Torch Dance", url: track16 },
    { id: 17, name: "Breeze & Beats", url: track17 },
    { id: 18, name: "Island Melody", url: track18 },
    { id: 19, name: "Tropical Escape", url: track19 },
    { id: 20, name: "Paradise Groove", url: track20 },
    { id: 21, name: "Aqua Rhythm", url: track21 },
  ];

  const [sounds, setSounds] = useState([
    { id: 0, name: "Train", url: trainSound },
    ...tropicalHouseTracks,
  ]);

  // store references to audio elements
  const audioRefs = useRef({});

  const playSound = (sound) => {
    const audio = audioRefs.current[sound.id];
    if (audio) {
      audio
        .play()
        .catch((error) => console.error("Error playing sound:", error));
    }

    if (userEmail) {
      axios
        .post("/api/soundboard/record", {
          email: userEmail,
          soundName: sound.name,
        })
        .then((response) =>
          console.log("Sound play recorded:", response.data.msg)
        )
        .catch((error) => console.error("Error recording sound play:", error));
    } else {
      console.warn("User not logged in. Sound play not recorded.");
    }
  };

  const pauseSound = (sound) => {
    const audio = audioRefs.current[sound.id];
    if (audio) {
      audio.pause();
    }
  };

  const stopSound = (sound) => {
    const audio = audioRefs.current[sound.id];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const replaySound = (sound) => {
    const audio = audioRefs.current[sound.id];
    if (audio) {
      audio.currentTime = 0;
      audio
        .play()
        .catch((error) => console.error("Error replaying sound:", error));
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
    <div className="soundboard-container">
      <h1 className="soundboard-title">Tropical Vibes Soundboard</h1>
      <div className="add-button-container">
        <button className="add-sound-button" onClick={addNewSoundButton}>
          Add New Sound
        </button>
      </div>
      <div className="soundboard-grid">
        {sounds.map((sound) => (
          <div className="sound-item" key={sound.id}>
            <audio
              ref={(el) => (audioRefs.current[sound.id] = el)}
              src={sound.url}
            />
            <button
              className="play-sound-button"
              onClick={() => playSound(sound)}
            >
              {sound.name || "Unnamed Sound"}
            </button>

            <button
              className="pause-sound-button"
              onClick={() => pauseSound(sound)}
            >
              Pause
            </button>
            <button
              className="stop-sound-button"
              onClick={() => stopSound(sound)}
            >
              Stop
            </button>
            <button
              className="replay-sound-button"
              onClick={() => replaySound(sound)}
            >
              Replay
            </button>

            <label className="replace-audio-label">
              Replace Audio
              <input
                type="file"
                accept=".mp3, .wav"
                className="replace-audio-input"
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
