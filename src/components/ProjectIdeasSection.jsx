import React, { useState } from "react";
import "./ProjectIdeasSection.css";

const mockCategories = ["Web Dev", "AI/ML", "Open Source", "Real-world Problems"];
const mockTags = ["Beginner", "Intermediate", "Advanced", "Clone", "SaaS"];

const ProjectIdeasSection = () => {
  const [ideas, setIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedRating, setSelectedRating] = useState(3);

  const generateIdea = () => {
    if (!selectedCategory) return;
    const idea = {
      title: `AI Suggested Project in ${selectedCategory}`,
      description: `A smart ${selectedCategory} project for tracking, automating, or visualizing something.`,
      tags: selectedTags,
      category: selectedCategory,
      rating: selectedRating,
      status: "Not Started",
    };
    setIdeas([...ideas, idea]);
    setNewIdea("");
    setSelectedTags([]);
    setSelectedRating(3);
  };

  const convertToTasks = (idea) => {
    alert(`Convert "${idea.title}" to a task list! (Simulated)`);
  };

  return (
    <div className="project-ideas-container">
      <h2>🚀 Project Ideas</h2>
      <div className="idea-input-section">
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">Select Category</option>
          {mockCategories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <div className="tags">
          {mockTags.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() =>
                  setSelectedTags((prev) =>
                    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                  )
                }
              />
              {tag}
            </label>
          ))}
        </div>

        <label>
          Feasibility Rating:
          <input
            type="range"
            min="1"
            max="5"
            value={selectedRating}
            onChange={(e) => setSelectedRating(Number(e.target.value))}
          />
          {selectedRating}
        </label>

        <button onClick={generateIdea}>✨ Generate AI Idea</button>
      </div>

      <div className="idea-list">
        {ideas.map((idea, idx) => (
          <div className="idea-card" key={idx}>
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
            <p><strong>Category:</strong> {idea.category}</p>
            <p><strong>Tags:</strong> {idea.tags.join(", ")}</p>
            <p><strong>Feasibility:</strong> {idea.rating}/5</p>
            <p><strong>Status:</strong> {idea.status}</p>
            <button onClick={() => convertToTasks(idea)}>📋 Convert to Task</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectIdeasSection;
