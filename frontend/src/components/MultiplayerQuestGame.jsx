import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ChatRoomsList from "./ChatRoomsList";
import "./MultiplayerQuestGame.css";

const MultiplayerQuestGame = ({ socket }) => {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [searchParams] = useSearchParams();
  const chatEndRef = useRef(null);

  useEffect(() => {
    const roomName = searchParams.get("roomName");
    const roomId = searchParams.get("roomId");

    if (roomName && roomId) {
      setRoom(roomName);
      fetchRoomMessages(roomId);
    }
  }, [searchParams]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      socket.on("update_active_users", (count) => {
        setActiveUsers(count);
      });
    }

    return () => {
      if (socket) {
        socket.off("message");
        socket.off("update_active_users");
      }
    };
  }, [socket]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchRoomMessages = async (roomId) => {
    try {
      const response = await axios.get(`/api/chatrooms/${roomId}`);
      const { messages: roomMessages } = response.data;
      const formattedMessages = roomMessages.map((msg) => ({
        user: msg.sender,
        text: msg.content,
        timestamp: msg.timestamp,
      }));
      setMessages(formattedMessages);
    } catch (err) {
      console.error("Error fetching room messages:", err);
    }
  };

  const handleJoinRoom = () => {
    if (room.trim() && username.trim()) {
      socket.emit("join_room", { room, username });
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = { room, user: username, message };
      socket.emit("send_message", newMessage);
      setMessage("");
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
          <h2 className="roomTitle1">Room: {room}</h2>
          <h3 className="usersTitle1">Active Users: {activeUsers}</h3>
          <h4>
            Interact with the NPC to solve a fun, one-of-a-kind mystery! Every
            case is fresh, unpredictable, and never repeats.
          </h4>
          <p>Use these commands to investigate and uncover the truth:</p>
          <ul>
            <li>
              <strong>/npc mystery</strong> – Start a brand new mystery
            </li>
            <li>
              <strong>/npc guess 1</strong> – Accuse suspect #1
            </li>
            <li>
              <strong>/npc guess 2</strong> – Accuse suspect #2
            </li>
            <li>
              <strong>/npc guess 3</strong> – Accuse suspect #3
            </li>
            <li>
              <strong>/npc answer</strong> – Reveal the true culprit
            </li>
          </ul>

          <div className="mqt-chatWindow">
            {messages.map((msg, index) => (
              <div key={index} className="mqt-message">
                <strong className="mqt-sender">{msg.user}:</strong>{" "}
                <span className="mqt-content">{msg.text}</span>
              </div>
            ))}
            <div ref={chatEndRef}></div>{" "}
          </div>
          <div className="mqt-inputContainer">
            <input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="mqt-inputField"
            />
            <button onClick={sendMessage} className="mqt-button">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiplayerQuestGame;
