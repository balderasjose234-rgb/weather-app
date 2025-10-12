import React, { useState, useEffect } from 'react';
import './WeatherCard.css';
import { fetchWeatherByCity, weatherDescriptions, weatherIcons } from '../utils/weatherAPI';
import CityAutocomplete from './CityAutocomplete';

function WeatherCard({ defaultCity }) {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load default city weather on mount
  useEffect(() => {
    if (defaultCity) {
      loadWeather(defaultCity);
    }
  }, [defaultCity]);

  const loadWeather = async (city) => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      loadWeather(cityInput.trim());
    }
  };

  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatLocalTime = (date, timezone) => {
    try {
      return date.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  const getDayName = (dateString, index) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="container">
      <div className="weather-card">
        <h1 className="app-title">Weather Today</h1>
        
        <form onSubmit={handleSearch} className="search-box">
          <div className="search-input-wrapper">
            <CityAutocomplete
              value={cityInput}
              onChange={setCityInput}
              placeholder="Enter city name..."
            />
          </div>
          <button type="submit" className="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}
        
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}
        
        {weatherData && !loading && (
          <div className="weather-info">
            <div className="location">
              <h2>
                {weatherData.location.name}
                {weatherData.location.country && `, ${weatherData.location.country}`}
              </h2>
              <p>{formatDate(new Date())}</p>
              <p className="local-time">
                {formatLocalTime(new Date(), weatherData.weather.timezone)}
              </p>
            </div>
            
            <div className="weather-main">
              <div className="weather-icon">
                {weatherIcons[weatherData.weather.current.weather_code] || '🌡️'}
              </div>
              <div className="temperature">
                <span className="temp-value">
                  {Math.round(weatherData.weather.current.temperature_2m)}
                </span>
                <span className="temp-unit">°F</span>
              </div>
              <p className="weather-description">
                {weatherDescriptions[weatherData.weather.current.weather_code] || 'Unknown'}
              </p>
            </div>
            
            <div className="weather-details">
              <div className="detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
                <div>
                  <p className="detail-label">Feels Like</p>
                  <p className="detail-value">
                    {Math.round(weatherData.weather.current.apparent_temperature)}°F
                  </p>
                </div>
              </div>
              
              <div className="detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
                <div>
                  <p className="detail-label">Humidity</p>
                  <p className="detail-value">
                    {weatherData.weather.current.relative_humidity_2m}%
                  </p>
                </div>
              </div>
              
              <div className="detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
                </svg>
                <div>
                  <p className="detail-label">Wind Speed</p>
                  <p className="detail-value">
                    {Math.round(weatherData.weather.current.wind_speed_10m)} mph
                  </p>
                </div>
              </div>
            </div>
            
            <div className="forecast-section">
              <h3 className="forecast-title">7-Day Forecast</h3>
              <div className="forecast-container">
                {weatherData.weather.daily.time.slice(0, 7).map((day, index) => (
                  <div key={index} className="forecast-day">
                    <div className="forecast-day-name">{getDayName(day, index)}</div>
                    <div className="forecast-icon">
                      {weatherIcons[weatherData.weather.daily.weather_code[index]] || '🌡️'}
                    </div>
                    <div className="forecast-temps">
                      <span className="forecast-high">
                        {Math.round(weatherData.weather.daily.temperature_2m_max[index])}°
                      </span>
                      <span className="forecast-low">
                        {Math.round(weatherData.weather.daily.temperature_2m_min[index])}°
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherCard;
