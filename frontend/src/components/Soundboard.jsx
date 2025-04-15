import React, { useState, useRef, useEffect } from "react";

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

  const [playlist, setPlaylist] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  // store references to audio elements
  const audioRefs = useRef({});

  useEffect(() => {
    // Fetch playlists from backend
    if (userEmail) {
      axios
        .get(`/api/soundboard/get-playlists/${userEmail}`)
        .then((response) => setPlaylists(response.data.playlists))
        .catch((error) => console.error("Error fetching playlists:", error));
    }
  }, [userEmail]);

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

  const playPlaylist = (playlist) => {
    if (!playlist || playlist.sounds.length === 0) return;

    let currentIndex = 0;

    const playNext = () => {
      if (currentIndex >= playlist.sounds.length) return;

      const sound = playlist.sounds[currentIndex];
      const audio = audioRefs.current[sound.id];

      if (audio) {
        audio.play();
        audio.onended = () => {
          currentIndex++;
          playNext();
        };
      }
    };

    playNext();
  };

  const addToPlaylist = (sound) => {
    setPlaylist((prev) => [...prev, sound]);
  };
  const savePlaylist = (name) => {
    if (name && playlist.length > 0 && userEmail) {
      const newPlaylist = {
        name,
        sounds: playlist.map((sound) => ({ ...sound })),
      };

      // Save to backend
      axios
        .post("/api/soundboard/save-playlist", {
          email: userEmail,
          playlistName: name,
          sounds: newPlaylist.sounds,
        })
        .then((response) => {
          setPlaylists(response.data.playlists);
          setPlaylist([]);
        })
        .catch((error) => console.error("Error saving playlist:", error));
    }
  };

  const playPlaylistFromIndex = (playlist, startIndex) => {
    if (!playlist || playlist.sounds.length === 0) {
      console.error("Playlist is empty or not found");
      return;
    }

    let currentIndex = startIndex;

    const playNext = () => {
      if (currentIndex >= playlist.sounds.length) return;

      const sound = playlist.sounds[currentIndex];

      // Check if audio reference exists
      let audio = audioRefs.current[sound.id];

      // Fallback to find by name if ID is not defined
      if (!audio) {
        const matchedSound = sounds.find((s) => s.name === sound.name);
        audio = audioRefs.current[matchedSound?.id];
      }

      if (audio) {
        audio.play();
        audio.onended = () => {
          currentIndex++;
          playNext();
        };
      } else {
        console.error(
          `Audio not found for sound ID: ${sound.id} or name: ${sound.name}`
        );
      }
    };

    playNext();
  };

  const togglePlayPause = (sound) => {
    const audio = audioRefs.current[sound.id];

    if (!audio) return;

    // If the track is currently playing, pause it
    if (currentlyPlaying === sound.id) {
      audio.pause();
      setCurrentlyPlaying(null);
    } else {
      // Pause the currently playing track if any
      if (currentlyPlaying !== null) {
        const currentAudio = audioRefs.current[currentlyPlaying];
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0; // Reset the previous track
        }
      }

      // Play the selected track
      audio.play();
      setCurrentlyPlaying(sound.id);

      // Automatically clear the `currentlyPlaying` state when the track ends
      audio.onended = () => setCurrentlyPlaying(null);
    }
  };

  const togglePlayPauseFromPlaylist = (playlist, sound) => {
    const audio = audioRefs.current[sound.id];

    if (!audio) {
      console.error("Audio element not found for sound:", sound.name);
      return;
    }

    if (currentlyPlaying === sound.id) {
      // Pause the currently playing sound
      audio.pause();
      setCurrentlyPlaying(null);
    } else {
      // Pause any currently playing sound
      if (currentlyPlaying !== null) {
        const currentAudio = audioRefs.current[currentlyPlaying];
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0; // Reset the track
        }
      }

      // Play the selected sound
      audio.play();
      setCurrentlyPlaying(sound.id);

      // Automatically clear `currentlyPlaying` when the track ends
      audio.onended = () => setCurrentlyPlaying(null);
    }
  };

  return (
    <div className="soundboard-container">
      <h1 className="soundboard-title">Tropical Vibes Soundboard</h1>

      <div className="ai-soundboard-info">
        <h2 className="ai-soundboard-heading">How It Works</h2>
        <p className="ai-soundboard-paragraph">
          This interactive soundboard blends modern web tech with artificial
          intelligence and machine learning to deliver a unique listening
          experience. Many of the tracks—especially in the *Tropical Vibes*
          set—were composed using AI-powered music tools that leverage deep
          learning to generate professional-grade compositions.
        </p>
        <p className="ai-soundboard-paragraph">
          When you press a button, your browser plays a locally stored or
          AI-generated sound. Behind the scenes, every play is logged with your
          account to track favorites and usage trends. You can also build
          playlists, remix them live, and even replace individual tracks with
          your own.
        </p>
        <h3 className="ai-soundboard-subheading">How to Use:</h3>
        <ul className="ai-soundboard-list">
          <li>
            🎵 Click <strong>Play</strong> to listen to a sound or song.
          </li>
          <li>
            ➕ Use <strong>Add to Playlist</strong> to build your custom mix.
          </li>
          <li>
            💾 Name & <strong>Save Playlist</strong> to preserve your vibe.
          </li>
          <li>
            🔁 Use <strong>Replay, Pause, or Stop</strong> controls for
            precision.
          </li>
          <li>🎤 Replace any sound with your own uploaded audio (MP3/WAV).</li>
        </ul>
        <p className="ai-soundboard-paragraph">
          This fusion of AI-generated music, user interactivity, and real-time
          cloud syncing makes this soundboard a creative tool unlike any other.
        </p>
      </div>

      <div className="add-button-container">
        <button className="add-sound-button" onClick={addNewSoundButton}>
          Add New Sound
        </button>
      </div>

      {/* Playlist Controls */}
      <div className="playlist-controls">
        <input
          type="text"
          placeholder="Playlist Name"
          id="playlistName"
          className="playlist-input"
        />
        <button
          className="add-sound-button"
          onClick={() =>
            savePlaylist(document.getElementById("playlistName").value)
          }
        >
          Save Playlist
        </button>
        {playlist.length > 0 && (
          <div>
            <h3>Current Playlist:</h3>
            <ul>
              {playlist.map((sound, index) => (
                <li key={index}>{sound.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Saved Playlists */}
      <div className="saved-playlists">
        <h3>Saved Playlists:</h3>
        <ul>
          {playlists.map((pl, index) => (
            <li
              key={index}
              className={`playlist-item ${
                selectedPlaylist === pl.name ? "active" : ""
              }`}
            >
              <strong
                className="saved-titled"
                onClick={() => {
                  setSelectedPlaylist(pl.name);
                  playPlaylistFromIndex(pl, 0);
                }}
              >
                {pl.name}
              </strong>
              <ul>
                {pl.sounds.map((sound, idx) => (
                  <li
                    key={idx}
                    className="playlist-sound-item"
                    onClick={() => playPlaylistFromIndex(pl, idx)}
                  >
                    {sound.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* <div className="soundboard-grid">
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
              {sound.name}
            </button>
            <button
              className="add-to-playlist-button"
              onClick={() => addToPlaylist(sound)}
            >
              Add to Playlist
            </button>
          </div>
        ))}
      </div> */}
      <h2 className="addToPlaylistTitle">Add To Playlist</h2>
      <div className="soundboard-grid">
        {sounds.map((sound) => (
          <div className="sound-item" key={sound.id}>
            <audio
              ref={(el) => (audioRefs.current[sound.id] = el)}
              src={sound.url}
            />
            <button
              className="play-sound-button"
              onClick={() => togglePlayPause(sound)}
            >
              {currentlyPlaying === sound.id ? "Pause" : "Play"} {sound.name}
            </button>
            <button
              className="add-to-playlist-button"
              onClick={() => addToPlaylist(sound)}
            >
              Add to Playlist
            </button>
          </div>
        ))}
      </div>

      <h2 className="musicControlSolo">Solo Track Vibes</h2>
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
