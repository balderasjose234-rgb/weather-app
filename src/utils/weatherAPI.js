// API Configuration - Using Open-Meteo (No API key required!)
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

// Weather code descriptions (WMO Weather interpretation codes)
export const weatherDescriptions = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail'
};

// Weather icons mapping
export const weatherIcons = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌧️',
  61: '🌧️', 63: '🌧️', 65: '⛈️',
  71: '🌨️', 73: '🌨️', 75: '❄️', 77: '🌨️',
  80: '🌦️', 81: '🌧️', 82: '⛈️',
  85: '🌨️', 86: '❄️',
  95: '⛈️', 96: '⛈️', 99: '⛈️'
};

// Fetch city suggestions
export const fetchCitySuggestions = async (query) => {
  try {
    const response = await fetch(
      `${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    return [];
  }
};

// Fetch weather data by city name
export const fetchWeatherByCity = async (city) => {
  // Step 1: Get coordinates from city name
  const geoResponse = await fetch(
    `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  );
  
  if (!geoResponse.ok) {
    throw new Error('Failed to fetch location data');
  }
  
  const geoData = await geoResponse.json();
  
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error('City not found. Please try another city.');
  }
  
  const location = geoData.results[0];
  
  // Step 2: Get weather data using coordinates (current + 7-day forecast)
  const weatherResponse = await fetch(
    `${WEATHER_URL}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`
  );
  
  if (!weatherResponse.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  const weatherData = await weatherResponse.json();
  
  return {
    location,
    weather: weatherData
  };
};
