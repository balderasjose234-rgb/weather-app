# Deploy to GitHub Pages - Step by Step Guide

## Prerequisites
- GitHub account (create one at github.com if you don't have one)
- Git installed on your computer

## Step 1: Install gh-pages package

```bash
cd /Users/josebalderas/CascadeProjects/weather-app-react
npm install --save-dev gh-pages
```

## Step 2: Update package.json

I'll do this for you automatically, but here's what needs to be added:

```json
{
  "homepage": "https://YOUR_GITHUB_USERNAME.github.io/weather-app-react",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

## Step 3: Initialize Git Repository

```bash
cd /Users/josebalderas/CascadeProjects/weather-app-react
git init
git add .
git commit -m "Initial commit - React weather app"
```

## Step 4: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `weather-app-react`
3. Description: "Weather app with 7-day forecast, dark mode, and user registration"
4. Choose Public
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

## Step 5: Connect Local Repository to GitHub

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/weather-app-react.git
git branch -M main
git push -u origin main
```

## Step 6: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build your app for production
2. Create a `gh-pages` branch
3. Push the build folder to that branch
4. GitHub Pages will automatically serve it

## Step 7: Enable GitHub Pages (if needed)

1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll to "Pages" in the left sidebar
4. Under "Source", select branch: `gh-pages`
5. Click "Save"

## Step 8: Access Your Live App

Your app will be live at:
```
https://YOUR_GITHUB_USERNAME.github.io/weather-app-react
```

It may take 1-2 minutes for the first deployment to go live.

## Future Updates

Whenever you make changes:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push origin main

# Deploy the updated version
npm run deploy
```

## Troubleshooting

### Blank page after deployment?
- Make sure `homepage` in package.json is correct
- Check browser console for errors
- Verify the gh-pages branch exists

### 404 Error?
- Wait 2-3 minutes after first deployment
- Check GitHub Pages settings are enabled
- Verify the repository is public

### Build errors?
```bash
# Clear cache and rebuild
rm -rf node_modules build
npm install
npm run build
```

## Quick Command Reference

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Connect to GitHub (replace YOUR_GITHUB_USERNAME)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/weather-app-react.git
git push -u origin main

# Deploy
npm run deploy
```

---

Need help? Check the terminal output for specific error messages!
