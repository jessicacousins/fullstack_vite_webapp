import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PollCreator.css";

const PollCreator = () => {
  const [polls, setPolls] = useState([]);
  const [pollTitle, setPollTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const res = await axios.get("/api/polls");
      setPolls(res.data);
    } catch (err) {
      console.error("Error fetching polls:", err.message);
    }
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const createPoll = async () => {
    if (!pollTitle.trim() || options.some((option) => !option.trim())) return;

    try {
      setLoading(true);
      await axios.post("/api/polls/create", {
        title: pollTitle,
        options,
      });
      setPollTitle("");
      setOptions(["", ""]);
      fetchPolls();
    } catch (err) {
      console.error("Error creating poll:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const vote = async (pollId, optionIndex) => {
    try {
      await axios.post(`/api/polls/${pollId}/vote`, { optionIndex });
      fetchPolls();
    } catch (err) {
      console.error("Error voting on poll:", err.message);
    }
  };

  return (
    <div className="poll-creator">
      <h2>Create a Poll</h2>
      <input
        type="text"
        value={pollTitle}
        onChange={(e) => setPollTitle(e.target.value)}
        placeholder="Poll Title"
        className="poll-input"
      />
      <div className="poll-options">
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="poll-input"
          />
        ))}
      </div>
      <button onClick={addOption} className="poll-button">
        Add Option
      </button>
      <button onClick={createPoll} className="poll-button" disabled={loading}>
        {loading ? "Creating..." : "Create Poll"}
      </button>

      <h2>Available Polls</h2>
      {polls.map((poll) => (
        <div key={poll._id} className="poll">
          <h3>{poll.title}</h3>
          {poll.options.map((option, index) => (
            <div key={index} className="poll-option">
              <button
                onClick={() => vote(poll._id, index)}
                className="poll-button"
              >
                {option.text}
              </button>
              <span>{option.votes} votes</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PollCreator;
