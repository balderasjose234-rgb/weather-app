import React, { useState } from 'react';
import './RegistrationModal.css';
import { saveUser } from '../utils/database';
import CityAutocomplete from './CityAutocomplete';

function RegistrationModal({ onSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [originCity, setOriginCity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = await saveUser({ name, email, originCity });
      console.log('User registered:', user);
      console.log('UUID:', user.uuid);
      onSuccess(user);
    } catch (err) {
      console.error('Error saving user:', err);
      setError('Error registering user. Email might already be in use.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Welcome! 👋</h2>
        <p className="modal-subtitle">Please register to use the Weather App</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@example.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="originCity">Origin City</label>
            <CityAutocomplete
              value={originCity}
              onChange={setOriginCity}
              placeholder="San Francisco"
            />
          </div>
          
          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationModal;
