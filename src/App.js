import React, { useState, useEffect } from 'react';
import './App.css';
import { initDB, getCurrentUser, deleteUser } from './utils/database';
import ThemeToggle from './components/ThemeToggle';
import UserBadge from './components/UserBadge';
import RegistrationModal from './components/RegistrationModal';
import WeatherCard from './components/WeatherCard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize app
  useEffect(() => {
    const initialize = async () => {
      try {
        await initDB();
        const user = await getCurrentUser();
        
        if (user) {
          setCurrentUser(user);
          setShowModal(false);
        } else {
          setShowModal(true);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Handle logout
  const handleLogout = async () => {
    if (currentUser && window.confirm('Are you sure you want to logout?')) {
      try {
        await deleteUser(currentUser.uuid);
        setCurrentUser(null);
        setShowModal(true);
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  };

  // Handle registration success
  const handleRegistrationSuccess = (user) => {
    setCurrentUser(user);
    setShowModal(false);
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  if (loading) {
    return (
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />
      
      {currentUser && (
        <UserBadge user={currentUser} onLogout={handleLogout} />
      )}

      {showModal && (
        <RegistrationModal onSuccess={handleRegistrationSuccess} />
      )}

      {currentUser && !showModal && (
        <WeatherCard defaultCity={currentUser.originCity} />
      )}
    </div>
  );
}

export default App;
