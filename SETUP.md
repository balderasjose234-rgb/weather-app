# Quick Setup Guide

## Installation Steps

1. **Open Terminal and navigate to the project:**
   ```bash
   cd /Users/josebalderas/CascadeProjects/weather-app-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   This will install:
   - React 18.2.0
   - React DOM 18.2.0
   - React Scripts 5.0.1

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **The app will open automatically in your browser at:**
   ```
   http://localhost:3000
   ```

## What's Different from Vanilla JS Version?

### Architecture
- ✅ **Component-based** - Modular, reusable components
- ✅ **React Hooks** - useState, useEffect for state management
- ✅ **Better organization** - Separate files for components and utilities
- ✅ **Hot reloading** - Changes appear instantly without refresh

### Components Created
1. **App.js** - Main app container with theme and user management
2. **ThemeToggle** - Light/dark mode switch
3. **UserBadge** - User profile display
4. **RegistrationModal** - User registration form
5. **CityAutocomplete** - Reusable autocomplete input
6. **WeatherCard** - Main weather display with forecast

### State Management
- User data managed with React hooks
- Theme preference in localStorage
- Weather data in component state
- IndexedDB for persistent user storage

## Available Scripts

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it.

### `npm run build`
Builds the app for production to the `build` folder.
Optimizes the build for best performance.

### `npm test`
Launches the test runner in interactive watch mode.

## Troubleshooting

### Port 3000 already in use?
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm start
```

### Dependencies not installing?
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors?
```bash
# Make sure you're using Node 14+
node --version

# Update npm
npm install -g npm@latest
```

## Next Steps

1. ✅ Install dependencies
2. ✅ Run the app
3. ✅ Register as a user
4. ✅ Test all features
5. 🚀 Deploy to Netlify/Vercel/GitHub Pages

## Deployment

### Quick Deploy to Netlify
```bash
npm run build
# Drag the 'build' folder to netlify.com
```

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy:
npm run deploy
```

Enjoy your React weather app! 🎉
