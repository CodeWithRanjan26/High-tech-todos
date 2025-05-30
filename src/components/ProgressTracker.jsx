import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './ProgressTracker.css';

function ProgressTracker() {
  const [tasks, setTasks] = useState([
    { title: 'Workout', completed: true, timeSpent: 45 },
    { title: 'Study React', completed: false, timeSpent: 0 },
    { title: 'Read Book', completed: true, timeSpent: 30 },
  ]);

  const [showDetails, setShowDetails] = useState(false);

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.length - completedTasks.length;
  const totalTimeSpent = tasks.reduce((acc, t) => acc + t.timeSpent, 0);

  const pieData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completedTasks.length, pendingTasks],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  const barData = {
    labels: tasks.map(task => task.title),
    datasets: [
      {
        label: 'Time Spent (min)',
        data: tasks.map(task => task.timeSpent),
        backgroundColor: '#2196f3',
      },
    ],
  };

  return (
    <div className="tracker-container">
      <h2>📈 Progress Tracker</h2>
      <p>Track your daily progress, time, and achievements!</p>

      <div className="charts">
        <div className="chart-box">
          <h4>Task Completion</h4>
          <Pie data={pieData} />
        </div>
        <div className="chart-box">
          <h4>Time Spent on Tasks</h4>
          <Bar data={barData} />
        </div>
      </div>

      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'Show Task Details'}
      </button>

      {showDetails && (
        <ul className="task-list">
          {tasks.map((task, idx) => (
            <li key={idx}>
              <strong>{task.title}</strong> - {task.completed ? '✅ Done' : '❌ Pending'} - ⏱ {task.timeSpent} min
            </li>
          ))}
        </ul>
      )}

      <div className="summary">
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed: {completedTasks.length}</p>
        <p>Pending: {pendingTasks}</p>
        <p>Total Time Spent: {totalTimeSpent} min</p>
      </div>
    </div>
  );
}

export default ProgressTracker;
