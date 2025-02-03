import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ChatRoomsList from "./ChatRoomsList";
import "./MultiplayerQuestGame.css";

const SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_SERVER_URL || "http://localhost:5000";

const MultiplayerQuestGame = () => {
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState("");
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    const rId = searchParams.get("roomId");
    const rName = searchParams.get("roomName");
    if (rId && rName) {
      setRoomId(rId);
      setRoom(rName);
      setJoined(true);

      axios
        .get(`/api/chatrooms/${rId}`)
        .then((response) => {
          setMessages(response.data.messages);
        })
        .catch((err) => console.error(err));
    }
  }, [searchParams]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        setMessages((prev) => [...prev, data]);
      });
    }
  }, [socket]);

  const handleJoinRoom = () => {
    if (room.trim() && username.trim()) {
      socket.emit("join_room", room);
      setJoined(true);

      axios
        .get(`/api/chatrooms?roomName=${room}`)
        .then((response) => {
          const chatRoom = response.data.find((cr) => cr.roomName === room);
          if (chatRoom) {
            setRoomId(chatRoom._id);
            setMessages(chatRoom.messages);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send_message", { room, user: username, message });
      setMessage("");
    }
  };

  const handleInvite = () => {
    if (roomId && inviteEmail.trim()) {
      axios
        .put(`/api/chatrooms/${roomId}/invite`, { email: inviteEmail })
        .then(() => {
          alert("User invited!");
          setInviteEmail("");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="mqt-container">
      {!joined ? (
        <div className="mqt-joinContainer">
          <h2>Join Multiplayer Quest</h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mqt-inputField"
          />
          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="mqt-inputField"
          />
          <button onClick={handleJoinRoom} className="mqt-button">
            Join Room
          </button>

          <ChatRoomsList />
        </div>
      ) : (
        <div className="mqt-chatContainer">
          <h2>Room: {room}</h2>
          <div className="mqt-inviteContainer">
            <input
              type="email"
              placeholder="Invite user by email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="mqt-inputField"
            />
            <button onClick={handleInvite} className="mqt-button">
              Invite
            </button>
          </div>
          <div className="mqt-chatWindow">
            {messages.map((msg, index) => {
              const msgContent = msg.content || msg.text || "";
              return (
                <div key={index} className="mqt-message">
                  <strong className="mqt-sender">
                    {msg.sender || msg.user}:
                  </strong>
                  <span className="mqt-content">
                    {msg.deactivated ? <i>{msgContent}</i> : msgContent}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mqt-inputContainer">
            <input
              type="text"
              placeholder="Type a message (use '/npc' for NPC hints)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              className="mqt-inputField"
            />
            <button onClick={sendMessage} className="mqt-button">
              Send
            </button>
          </div>

          <ChatRoomsList />
        </div>
      )}
    </div>
  );
};

export default MultiplayerQuestGame;
