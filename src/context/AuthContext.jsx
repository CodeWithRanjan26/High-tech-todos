import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api'; // ✅ Use shared API instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setUser({ token });
    }
  }, []);

  const signup = async (email, password, name = '') => {
    try {
      const response = await API.post('/auth/signup', { email, password, name });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      setUser({ email, token });
    } catch (error) {
      throw error.response?.data || { message: 'Signup failed' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      setUser({ email, token });
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
