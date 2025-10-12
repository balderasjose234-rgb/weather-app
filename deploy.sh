#!/bin/bash

# GitHub Pages Deployment Script for Weather App React

echo "🚀 Weather App - GitHub Pages Deployment"
echo "=========================================="
echo ""

# Check if GitHub username is set
if grep -q "YOUR_GITHUB_USERNAME" package.json; then
    echo "⚠️  Please update package.json first!"
    echo ""
    echo "Replace 'YOUR_GITHUB_USERNAME' with your actual GitHub username in:"
    echo "  package.json (line 5)"
    echo ""
    read -p "Enter your GitHub username: " username
    
    # Update package.json with actual username
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/YOUR_GITHUB_USERNAME/$username/g" package.json
    else
        # Linux
        sed -i "s/YOUR_GITHUB_USERNAME/$username/g" package.json
    fi
    
    echo "✅ Updated package.json with username: $username"
    echo ""
fi

# Check if gh-pages is installed
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "📦 Installing gh-pages..."
    npm install --save-dev gh-pages
    echo "✅ gh-pages installed"
    echo ""
fi

# Check if git is initialized
if [ ! -d .git ]; then
    echo "🔧 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - React weather app"
    echo "✅ Git initialized"
    echo ""
    
    echo "📝 Next steps:"
    echo "1. Create a new repository on GitHub: https://github.com/new"
    echo "   - Name it: weather-app-react"
    echo "   - Make it Public"
    echo "   - Don't initialize with README"
    echo ""
    echo "2. Run these commands (replace YOUR_GITHUB_USERNAME):"
    echo "   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/weather-app-react.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "3. Then run this script again to deploy!"
    exit 0
fi

# Check if remote is set
if ! git remote | grep -q origin; then
    echo "⚠️  No remote repository configured!"
    echo ""
    read -p "Enter your GitHub username: " username
    echo ""
    echo "Setting up remote repository..."
    git remote add origin "https://github.com/$username/weather-app-react.git"
    echo "✅ Remote added"
    echo ""
    echo "Pushing to GitHub..."
    git branch -M main
    git push -u origin main
    echo ""
fi

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
echo ""
npm run deploy

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your app will be live at:"
grep "homepage" package.json | cut -d'"' -f4
echo ""
echo "⏱️  It may take 1-2 minutes to go live."
echo ""
