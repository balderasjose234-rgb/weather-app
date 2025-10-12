# Weather App - React Version 🌤️

A beautiful, modern weather application built with React that displays current weather conditions and 7-day forecasts for any city worldwide.

## Features

- 🌡️ Real-time weather data
- 🔍 City search with autocomplete suggestions
- 📅 7-Day forecast starting on Sundays
- 🕐 Local time display for searched cities
- 👤 User registration with IndexedDB
- 🌓 Light/Dark mode toggle
- 📱 Fully responsive design
- ⚡ **No API key required!** Uses Open-Meteo free API
- 💾 Persistent user data and theme preferences

## Tech Stack

- **React 18** - UI framework
- **IndexedDB** - Local database for user data
- **Open-Meteo API** - Free weather data
- **CSS3** - Modern styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd weather-app-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   The app will automatically open at [http://localhost:3000](http://localhost:3000)

## Usage

### First Time
1. Registration modal appears
2. Enter your name, email, and origin city
3. City autocomplete helps you select the right location
4. Weather loads automatically for your origin city

### Returning User
- App remembers you via IndexedDB
- Automatically loads your origin city's weather
- Theme preference is saved

### Features
- **Search Cities**: Type and get autocomplete suggestions
- **Toggle Theme**: Click the sun/moon toggle in top-left
- **View Forecast**: Scroll down to see 7-day forecast
- **Logout**: Click logout button to clear your data

## Project Structure

```
weather-app-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CityAutocomplete.js
│   │   ├── CityAutocomplete.css
│   │   ├── RegistrationModal.js
│   │   ├── RegistrationModal.css
│   │   ├── ThemeToggle.js
│   │   ├── ThemeToggle.css
│   │   ├── UserBadge.js
│   │   ├── UserBadge.css
│   │   ├── WeatherCard.js
│   │   └── WeatherCard.css
│   ├── utils/
│   │   ├── database.js
│   │   └── weatherAPI.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── .gitignore
└── README.md
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Deployment Options

### 1. Netlify (Recommended)
```bash
npm run build
# Drag the build folder to netlify.com
```

### 2. GitHub Pages
```bash
npm install --save-dev gh-pages

# Add to package.json:
"homepage": "https://yourusername.github.io/weather-app-react",
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy:
npm run deploy
```

### 3. Vercel
```bash
npm install -g vercel
vercel
```

## Database Schema

User data is stored locally in IndexedDB:

```javascript
{
  uuid: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  name: "John Doe",
  email: "john@example.com",
  originCity: "San Francisco",
  createdAt: "2025-10-12T05:38:20.123Z"
}
```

## API Information

- **Weather API**: Open-Meteo (free, no key required)
- **Geocoding**: Open-Meteo Geocoding API
- **Rate Limits**: None for personal use
- **Data**: Current weather + 7-day forecast

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Free to use and modify for personal and commercial projects.

---

Built with ❤️ using React and Open-Meteo API
