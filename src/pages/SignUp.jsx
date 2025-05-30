import React, { useState } from 'react';
import { FaApple, FaGoogle } from 'react-icons/fa';
import './SignUp.css';
import API from '../api'; // Importing API

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await API.post('/auth/signup', { name, email, password });
      console.log('Signup success', response.data);

      // On successful signup, store token and user info
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Optional: use context signup method if available
      // login(user);

      // Redirect to dashboard or login
      window.location.href = '/login';
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <div className="form-container">
        <h2 className="title">Create Account</h2>
        <p className="sub-title">Start your 30-day free trial now</p>

        {error && <div className="error-message" role="alert">{error}</div>}

        <form className="form" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            className="input"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-label="Full Name"
          />
          <input
            name="email"
            type="email"
            className="input"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            aria-label="Email Address"
          />
          <input
            name="password"
            type="password"
            className="input"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            aria-label="Password"
          />
          <button type="submit" className="form-btn">Sign Up</button>
        </form>

        <p className="sign-up-label">
          Already have an account? <a className="sign-up-link" href="/login">Log in</a>
        </p>

        <div className="social-login-container">
          <button className="social-btn apple-btn" type="button">
            <FaApple size={20} />
            <span>Sign up with Apple</span>
          </button>
          <button className="social-btn google-btn" type="button">
            <FaGoogle size={20} />
            <span>Sign up with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
