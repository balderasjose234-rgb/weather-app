import React from 'react';
import './ThemeToggle.css';

function ThemeToggle({ darkMode, onToggle }) {
  return (
    <div className="theme-toggle-container">
      <label className="theme-toggle">
        <input 
          type="checkbox" 
          checked={darkMode}
          onChange={onToggle}
        />
        <span className="toggle-slider">
          <span className="toggle-icon sun">☀️</span>
          <span className="toggle-icon moon">🌙</span>
        </span>
      </label>
    </div>
  );
}

export default ThemeToggle;
