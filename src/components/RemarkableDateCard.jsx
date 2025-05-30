import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Toast, ToastContainer } from "react-bootstrap";
import { saveAs } from "file-saver";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RemarkableDateCard.css";

const RemarkableDateCard = () => {
  const [dates, setDates] = useState([]);
  const [newDate, setNewDate] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [emoji, setEmoji] = useState("");
  const [description, setDescription] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const categoryColors = {
    "🎉 Birthday": "#ffe0f0",
    "💍 Wedding": "#e6ffe0",
    "📅 Meeting": "#e0f0ff",
    "🎓 Graduation": "#fdfdd9",
    default: "#f2f2f2",
  };

  const addDate = () => {
    if (newDate && title && category) {
      const newEvent = {
        id: Date.now(),
        date: newDate,
        title,
        category,
        emoji,
        description,
        recurring,
      };
      setDates((prev) => [...prev, newEvent].sort((a, b) => new Date(a.date) - new Date(b.date)));
      setNewDate(null);
      setTitle("");
      setCategory("");
      setEmoji("");
      setDescription("");
      setRecurring(false);
      setShowToast(true);
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  const getCountdown = (date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const diff = eventDate - now;
    if (diff <= 0) return "Today or Past";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} day(s) left`;
  };

  const exportCSV = () => {
    const csvData = dates.map((d) =>
      [formatDate(d.date), d.title, d.category, d.emoji, d.description, d.recurring ? "Yes" : "No"].join(",")
    );
    const blob = new Blob([["Date,Title,Category,Emoji,Description,Recurring\n", ...csvData].join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, "remarkable-dates.csv");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dates.forEach((item) => {
        const now = new Date();
        const target = new Date(item.date);
        if (
          target.getDate() === now.getDate() &&
          target.getMonth() === now.getMonth() &&
          target.getFullYear() === now.getFullYear()
        ) {
          new Notification(`Reminder: ${item.title} (${item.category})`);
        }
      });
    }, 60000); // check every minute

    return () => clearInterval(interval);
  }, [dates]);

  const filteredDates = dates.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "" || d.category === filter)
  );

  const nearestEvent = [...dates]
    .filter((d) => new Date(d.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0]?.id;

  return (
    <div className={`rdc-container ${darkMode ? "dark" : ""}`}>
      <div className="rdc-header">
        <h2>📌 Add Your Remarkable Dates</h2>
        <label className="rdc-dark-toggle">
          🌗 <input type="checkbox" onChange={() => setDarkMode(!darkMode)} /> Dark Mode
        </label>
      </div>

      <div className="rdc-input-group">
        <DatePicker
          selected={newDate}
          onChange={(date) => setNewDate(date)}
          placeholderText="Pick a Date"
          dateFormat="dd/MM/yyyy"
          className="rdc-datepicker"
        />
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rdc-input"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rdc-select"
        >
          <option value="">Category</option>
          <option value="🎉 Birthday">🎉 Birthday</option>
          <option value="💍 Wedding">💍 Wedding</option>
          <option value="📅 Meeting">📅 Meeting</option>
          <option value="🎓 Graduation">🎓 Graduation</option>
        </select>
        <input
          type="text"
          placeholder="Custom Emoji"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          className="rdc-input"
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rdc-textarea"
        />
        <label>
          <input
            type="checkbox"
            checked={recurring}
            onChange={() => setRecurring(!recurring)}
          />{" "}
          Recurring Event
        </label>
        <button className="rdc-button" onClick={addDate}>
          ➕ Add
        </button>
        <button className="rdc-button export" onClick={exportCSV}>
          📤 Export CSV
        </button>
      </div>

      <div className="rdc-filter-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rdc-search"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rdc-select">
          <option value="">All Categories</option>
          <option value="🎉 Birthday">🎉 Birthday</option>
          <option value="💍 Wedding">💍 Wedding</option>
          <option value="📅 Meeting">📅 Meeting</option>
          <option value="🎓 Graduation">🎓 Graduation</option>
        </select>
      </div>

      <div className="rdc-list">
        {filteredDates.map((item) => (
          <div
            key={item.id}
            className={`rdc-card ${item.id === nearestEvent ? "nearest" : ""}`}
            style={{ backgroundColor: categoryColors[item.category] || categoryColors.default }}
          >
            <div>
              <strong>{formatDate(item.date)} {item.emoji}</strong><br />
              <span>{item.title}</span><br />
              <em>{item.category}</em>
              <p>{item.description}</p>
              <small>{getCountdown(item.date)}</small>
            </div>
            <button
              className="rdc-remove-btn"
              onClick={() => setDates(dates.filter((d) => d.id !== item.id))}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">New Event Added</strong>
          </Toast.Header>
          <Toast.Body>
            📅 <strong>{title}</strong> - <em>{category}</em> is marked!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default RemarkableDateCard;
