import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // 🆕 For user greeting
import TodoCard from '../components/TodoCard';
import RoutineCard from '../components/RoutineCard';
import RemarkableDateCard from '../components/RemarkableDateCard';
import AIAssistant from '../components/AIAssistant';
import ProgressTracker from '../components/ProgressTracker';
import ProjectIdeasSection from '../components/ProjectIdeasSection';
import './Dashboard.css';

function Dashboard() {
  const { currentUser } = useAuth(); // 🆕 Get logged-in user
  const [activeComponent, setActiveComponent] = useState(null);

  const handleCardClick = (componentName) => {
    setActiveComponent(prev => (prev === componentName ? null : componentName));
  };

  const components = {
    TodoCard: <TodoCard />,
    RoutineCard: <RoutineCard />,
    RemarkableDateCard: <RemarkableDateCard />,
    ProgressTracker: <ProgressTracker />,
    ProjectIdeasSection: <ProjectIdeasSection />,
    AIAssistant: <AIAssistant />
  };

  const titles = {
    TodoCard: 'To-Do List',
    RoutineCard: 'Daily Routine',
    RemarkableDateCard: 'Remarkable Dates',
    ProgressTracker: 'Progress Tracker',
    ProjectIdeasSection: 'Project Ideas',
    AIAssistant: 'AI Assistant'
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome Back{currentUser ? `, ${currentUser.email.split('@')[0]}` : ''} 🚀</h1>
        <p>Select a section to get started!</p>
      </header>

      {activeComponent ? (
        <section className="active-component">
          <button onClick={() => setActiveComponent(null)} className="back-button">
            ← Back to Dashboard
          </button>
          <div className="component-wrapper">
            {components[activeComponent]}
          </div>
        </section>
      ) : (
        <section className="dashboard-grid">
          {Object.keys(components).map((key) => (
            <div
              key={key}
              className="dashboard-section clickable"
              onClick={() => handleCardClick(key)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleCardClick(key)}
            >
              <h2>{titles[key]}</h2>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default Dashboard;
