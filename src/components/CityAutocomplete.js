import React, { useState, useEffect, useRef } from 'react';
import './CityAutocomplete.css';
import { fetchCitySuggestions } from '../utils/weatherAPI';

function CityAutocomplete({ value, onChange, placeholder }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const wrapperRef = useRef(null);

  // Handle input change
  const handleInputChange = (e) => {
    const query = e.target.value;
    onChange(query);

    // Clear previous timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (query.trim().length < 2) {
      setShowSuggestions(false);
      return;
    }

    // Debounce API calls
    const timer = setTimeout(async () => {
      const results = await fetchCitySuggestions(query);
      if (results.length > 0) {
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 300);

    setDebounceTimer(timer);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    const cityText = suggestion.country 
      ? `${suggestion.name}, ${suggestion.country}` 
      : suggestion.name;
    onChange(cityText);
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="city-autocomplete-wrapper" ref={wrapperRef}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        required
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="suggestion-item-name">{suggestion.name}</div>
              <div className="suggestion-item-details">
                {[suggestion.admin1, suggestion.country].filter(Boolean).join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CityAutocomplete;
