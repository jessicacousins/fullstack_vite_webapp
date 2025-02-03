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
