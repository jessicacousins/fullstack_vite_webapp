import React, { useState } from "react";
import axios from "axios";
import "./ResumeBuilder.css";

const ResumeBuilder = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills((prev) => [...prev, newSkill]);
      setNewSkill("");
    }
  };

  // openAI-generated resume summary based on keywords
  const generateSummary = async () => {
    if (!keywords.trim()) return;
    setLoading(true);

    try {
      const response = await axios.post("/api/blogs/generate", {
        prompt: `Create a professional resume summary for a person skilled in: ${keywords}.`,
      });
      setSummary(response.data.content || "Error: No summary generated.");
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummary("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-builder-container">
      <h2>Create Your Resume</h2>
      <div className="resume-instructions">
        <h3>How to Use the Resume Maker</h3>
        <p>
          This tool allows you to build a professional resume quickly. Follow
          these steps:
        </p>
        <ol>
          <li>
            Enter your name, email, and phone number in the provided fields.
          </li>
          <li>
            Write a brief professional summary or generate one using AI by
            entering relevant keywords.
          </li>
          <li>
            Add your skills individually by typing them and pressing enter or
            clicking "Add Skill".
          </li>
          <li>
            Once all information is filled in, your formatted resume will appear
            in the preview section.
          </li>
          <li>
            Ensure all details are correct, then copy or export your resume as
            needed.
          </li>
        </ol>
        <p>
          <strong>Tip:</strong> Use relevant industry keywords for the
          AI-generated summary to improve resume visibility.
        </p>
      </div>

      <div className="resume-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="form-group">
          <label>Summary:</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Write a brief summary about yourself"
          />
        </div>
        <div className="form-group">
          <label>Skills:</label>
          <div className="skills-input">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
              onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
            />
            <button onClick={handleAddSkill}>Add Skill</button>
          </div>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>AI-Generated Summary (Enter Keywords):</label>
          <textarea
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="E.g., 'React, leadership, communication'"
          />
          <button onClick={generateSummary} disabled={loading}>
            {loading ? "Generating..." : "Generate AI Summary"}
          </button>
        </div>
      </div>

      <div className="resume-preview">
        <h3>{name || "Your Name"}</h3>
        <p>Email: {email || "Your Email"}</p>
        <p>Phone: {phone || "Your Phone Number"}</p>
        <h4>Summary</h4>
        <p>{summary || "Write a brief summary about yourself"}</p>
        <h4>Skills</h4>
        <ul>
          {skills.length > 0 ? (
            skills.map((skill, index) => <li key={index}>{skill}</li>)
          ) : (
            <li>No skills added yet</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ResumeBuilder;
