import './LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function LandingPage() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState('');

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const quotes = [
      "Start your day with a task plan.",
      "Small steps lead to big results.",
      "Stay productive, stay happy.",
      "Let AI help you stay ahead."
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="landing">
      

      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to HighTech To-Do</h1>
          <p className="quote">"{quote}"</p>
          <p className="sub-text">The smartest way to manage your tasks with built-in AI support.</p>
          <button className="cta-button" onClick={() => handleNavigate('/signup')}>Get Started Free</button>
        </div>
        <div className="hero-image">
          <img src="/images/task-dashboard.png" alt="Task Dashboard" />
        </div>
      </section>

      <section className="features" id="features">
        <h2>Key Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>AI-Powered Tasks</h3>
            <p>Automatically prioritize tasks and get reminders based on behavior.</p>
          </div>
          <div className="feature-card">
            <h3>Smart Calendar</h3>
            <p>View events, routines, and important deadlines all in one place.</p>
          </div>
          <div className="feature-card">
            <h3>Personal Dashboard</h3>
            <p>Custom dashboard tailored to your productivity goals.</p>
          </div>
          <div className="feature-card">
            <h3>Dark Mode</h3>
            <p>Switch themes to reduce eye strain and work in comfort.</p>
          </div>
        </div>
      </section>

      <section className="testimonial" id="testimonial">
        <h2>User Love</h2>
        <div className="testimonial-slider">
          <p>"I stay on top of work and personal tasks with this tool!" - Alex M.</p>
          <p>"This app changed the way I manage my day. AI suggestions are a game changer." - Priya K.</p>
        </div>
      </section>

      <section className="video-demo" id="video">
        <h2>See It In Action</h2>
        <video controls>
          <source src="/videos/demo-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section className="cta-section">
        <h2>Join thousands using HighTech To-Do</h2>
        <p>Start improving your productivity today with the power of AI.</p>
        <button className="cta-button" onClick={() => handleNavigate('/signup')}>Create Free Account</button>
      </section>

      <footer className="bg-gray-800 text-white py-8 px-4 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
      <div className="social-media-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </div>
        <div>
          <h3 className="font-bold mb-2">Company</h3>
          <ul>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Resources</h3>
          <ul>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Help Center</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Legal</h3>
          <ul>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Contact</h3>
          <ul>
            <li>Email: support@myapp.com</li>
            <li>Phone: +1 234 567 890</li>
          </ul>
        </div>
        <p>&copy; 2025 Student Registration System | Designed by <a href="https://yourportfolio.com">...</a></p>
      </footer>
    </div>
  );
}

export default LandingPage;