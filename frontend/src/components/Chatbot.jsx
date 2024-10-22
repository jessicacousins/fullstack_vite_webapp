import React, { useState } from "react";
import axios from "axios";
import { FaComments, FaTimes } from "react-icons/fa";
const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleSendMessage = async () => {
    if (!userMessage) return;

    const newChatLog = [...chatLog, { sender: "user", message: userMessage }];
    setChatLog(newChatLog);

    try {
      const response = await axios.post("/api/chatbot/ask", {
        message: userMessage,
      });
      const botResponse = response.data.response;
      setChatLog([...newChatLog, { sender: "bot", message: botResponse }]);
    } catch (error) {
      setChatLog([
        ...newChatLog,
        { sender: "bot", message: "Error getting response from chatbot." },
      ]);
    }

    setUserMessage(""); // Clear the input field
  };

  return (
    <>
      {/* Button to toggle the chatbot */}
      <div className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </div>

      {/* Chatbot window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbox">
            {chatLog.map((log, index) => (
              <div key={index} className={`message ${log.sender}`}>
                {log.message}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
