import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChatRoomsList.css";

const ChatRoomsList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/chatrooms")
      .then((response) => setChatRooms(response.data))
      .catch((err) => console.error(err));
  }, []);

  const joinRoom = (roomId, roomName) => {
    navigate(`/multiplayer-quest?roomId=${roomId}&roomName=${roomName}`);
  };

  return (
    <div className="crl-container">
      <h2>Public Chat Rooms</h2>
      <div className="mqt-directions-box">
        <h3 className="mqt-directions-title">How Multiplayer Chatrooms Work</h3>
        <p className="mqt-directions-text">
          Join a public or private room with your username and collaborate in
          real time with others. Messages are stored and retrieved from MongoDB,
          ensuring continuity between sessions.
        </p>
        <p className="mqt-directions-text">
          The chat system is powered by Socket.IO for low-latency communication
          and synchronized experiences. All users in a room see updates
          instantly, and room state is tracked live.
        </p>
        <p className="mqt-directions-text">
          Play interactive games with an AI-driven NPC by entering special
          commands. Each mystery is uniquely generated using OpenAI, meaning no
          two games are ever the same.
        </p>
      </div>

      <ul className="crl-roomList">
        {chatRooms.map((room) => (
          <li key={room._id} className="crl-roomItem">
            <strong>{room.roomName}</strong>
            <button
              onClick={() => joinRoom(room._id, room.roomName)}
              className="crl-button"
            >
              Join
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomsList;
