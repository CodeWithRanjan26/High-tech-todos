import React, { useState } from 'react';
import './TodoCard.css';

function TodoCard() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [label, setLabel] = useState('Personal');
  const [screenshot, setScreenshot] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleAddTask = () => {
    if (!taskText.trim()) return;
    if (!screenshot) {
      alert('📸 Work screenshot is mandatory before adding a task.');
      return;
    }

    const now = new Date();

    const newTask = {
      id: Date.now(),
      text: taskText,
      description,
      label,
      deadline,
      isDone: false,
      screenshot: URL.createObjectURL(screenshot),
      createdAt: now,
      completedAt: null,
    };

    setTasks([...tasks, newTask]);
    resetForm();
  };

  const handleUpdate = () => {
    if (!screenshot) {
      alert('📸 Work screenshot is mandatory before updating a task.');
      return;
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingId
          ? {
            ...task,
            text: taskText,
            description,
            deadline,
            label,
            screenshot: URL.createObjectURL(screenshot),
          }
          : task
      )
    );
    resetForm();
  };

  const resetForm = () => {
    setTaskText('');
    setDescription('');
    setDeadline('');
    setLabel('Personal');
    setScreenshot(null);
    setEditingId(null);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleDone = (id) => {
    const now = new Date();
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
            ...task,
            isDone: !task.isDone,
            completedAt: task.isDone ? null : now,
          }
          : task
      )
    );
  };

  const handleEdit = (task) => {
    setTaskText(task.text);
    setDescription(task.description);
    setDeadline(task.deadline);
    setLabel(task.label);
    setScreenshot(null);
    setEditingId(task.id);
  };

  const getTaskDuration = (task) => {
    if (task.isDone && task.completedAt && task.createdAt) {
      const duration = new Date(task.completedAt) - new Date(task.createdAt);
      const mins = Math.round(duration / 60000);
      return `${mins} min${mins !== 1 ? 's' : ''}`;
    }
    return '-';
  };

  const getProgress = () => {
    if (tasks.length === 0) return 0;
    const doneCount = tasks.filter((t) => t.isDone).length;
    return Math.round((doneCount / tasks.length) * 100);
  };

  return (
    <div className="todo-card">
      <h3>📅 Today's Tasks</h3>

      <div className="task-input">
        <input
          type="text"
          placeholder="Task title"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={label} onChange={(e) => setLabel(e.target.value)}>
          <option>Personal</option>
          <option>Work</option>
          <option>Urgent</option>
          <option>Others</option>
        </select>
        <label htmlFor="deadline">Work Deadline</label>
        <input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          // style={{ backgroundColor: 'rgba(0, 123, 255, 0.1)' }}  // Optional: Add transparency effect
        />


<label htmlFor="deadline">Work ScreenShot</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setScreenshot(e.target.files[0])}
        />
        <button onClick={editingId ? handleUpdate : handleAddTask}>
          {editingId ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <div className="progress-bar">
        <div style={{ width: `${getProgress()}%` }}></div>
      </div>
      <small>{getProgress()}% completed</small>

      <div className="task-list">
        {tasks.length === 0 && <p>No tasks yet.</p>}
        {tasks.map((task) => (
          <div key={task.id} className={`task-item ${task.isDone ? 'done' : ''}`}>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={() => toggleDone(task.id)}
            />
            <div className="task-details">
              <strong>{task.text}</strong> <span>({task.label})</span>
              {task.description && <p>{task.description}</p>}
              {task.deadline && <p>📅 Deadline: {task.deadline}</p>}
              {task.screenshot && (
                <img
                  src={task.screenshot}
                  alt="screenshot"
                  width={80}
                  onClick={() => window.open(task.screenshot)}
                  style={{ cursor: 'pointer' }}
                />
              )}
              {task.isDone && (
                <p>✅ Completed in: {getTaskDuration(task)}</p>
              )}
            </div>
            <div className="task-actions">
              <button onClick={() => handleEdit(task)}>✏️</button>
              <button onClick={() => handleDeleteTask(task.id)}>❌</button>
            </div>
          </div>
        ))}
      </div>

      <div className="ai-tips">
        <h4>💡 Smart Tip</h4>
        <p>Break large tasks into subtasks to make progress faster.</p>
      </div>
    </div>
  );
}

export default TodoCard;
