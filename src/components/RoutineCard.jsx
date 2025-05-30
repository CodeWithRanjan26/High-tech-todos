import React, { useState, useEffect } from "react";
import "./RoutineCard.css";

const quotes = [
  "Stay consistent and strong!",
  "One step at a time.",
  "Small habits make big changes.",
  "Discipline beats motivation.",
  "Keep going, you're doing great!"
];

function RoutineCard() {
  const [steps, setSteps] = useState([
    { text: "Morning workout", done: false },
    { text: "Read 10 pages", done: false },
    { text: "Drink 2L water", done: false },
    { text: "Meditate 5 min", done: false },
    { text: "Journal entry", done: false },
  ]);
  const [deadline, setDeadline] = useState("");
  const [themeColor, setThemeColor] = useState("#00aaff");
  const [emoji, setEmoji] = useState("💪");
  const [dark, setDark] = useState(false);
  const [note, setNote] = useState("");
  const [quote, setQuote] = useState(""); // ✅ New state for quote

  useEffect(() => {
    // ✅ Select quote only once when component mounts
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  }, []);

  const toggleStep = (index) => {
    const updated = [...steps];
    updated[index].done = !updated[index].done;
    setSteps(updated);
  };

  const shareRoutine = () => {
    const doneSteps = steps.filter(s => s.done).length;
    const shareText = `${emoji} My Daily Routine - ${doneSteps}/${steps.length} steps done. Note: ${note}`;
    if (navigator.share) {
      navigator.share({ title: "My Routine", text: shareText, url: window.location.href });
    } else {
      alert("Sharing not supported.");
    }
  };

  const syncToCalendar = () => {
    alert("🗓️ Sync feature coming soon.");
  };

  return (
    <div className={`routine-card ${dark ? "dark" : ""}`} style={{ borderColor: themeColor }}>
      <h2 style={{ color: themeColor }}>{emoji} My Daily Routine</h2>
      <p className="subtitle">Organize. Track. Conquer.</p>

      <label>Deadline for today:</label>
      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      {deadline && new Date(deadline) < new Date() && <p className="warning">⚠️ Deadline passed!</p>}

      <div className="steps-section">
        {steps.map((step, i) => (
          <div key={i} className={`step ${step.done ? "done" : ""}`} onClick={() => toggleStep(i)}>
            <input type="checkbox" checked={step.done} readOnly />
            <span>{step.text}</span>
          </div>
        ))}
      </div>

      <progress value={steps.filter(s => s.done).length} max={steps.length}></progress>
      <p className="progress-text">
        {Math.floor((steps.filter(s => s.done).length / steps.length) * 100)}% Complete
      </p>

      <div className="customize">
        <label>Pick Theme Color:</label>
        <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} />

        <label>Pick Emoji:</label>
        <input type="text" maxLength={2} value={emoji} onChange={(e) => setEmoji(e.target.value)} />
      </div>

      {/* ✅ Use the state-based quote */}
      <p className="quote">💡 {quote}</p>

      <label>Notes / Reminders:</label>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="E.g. Add protein shake..." />

      <div className="actions">
        <button onClick={shareRoutine}>🔗 Share</button>
        <button onClick={syncToCalendar}>📅 Sync</button>
        <button onClick={() => setDark(!dark)}>🌓 Theme</button>
      </div>

      <p className="footer">✅ Completed {steps.filter(s => s.done).length} of {steps.length} tasks today</p>
    </div>
  );
}

export default RoutineCard;
