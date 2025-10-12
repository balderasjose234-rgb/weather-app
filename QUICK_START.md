# 🚀 Quick Start - Deploy to GitHub Pages

## Option 1: Automated Script (Easiest!)

```bash
cd /Users/josebalderas/CascadeProjects/weather-app-react
./deploy.sh
```

The script will guide you through everything!

---

## Option 2: Manual Steps

### Step 1: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 2: Update Your GitHub Username

Edit `package.json` line 5, replace `YOUR_GITHUB_USERNAME` with your actual GitHub username:

```json
"homepage": "https://yourusername.github.io/weather-app-react",
```

### Step 3: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `weather-app-react`
3. Make it **Public**
4. **Don't** check "Initialize with README"
5. Click **Create repository**

### Step 4: Push to GitHub

Replace `yourusername` with your GitHub username:

```bash
cd /Users/josebalderas/CascadeProjects/weather-app-react

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Connect to GitHub
git remote add origin https://github.com/yourusername/weather-app-react.git
git branch -M main
git push -u origin main
```

### Step 5: Deploy!

```bash
npm run deploy
```

### Step 6: Visit Your Live App

After 1-2 minutes, visit:
```
https://yourusername.github.io/weather-app-react
```

---

## Future Updates

When you make changes:

```bash
# Save your changes
git add .
git commit -m "Updated feature X"
git push

# Deploy the new version
npm run deploy
```

---

## Troubleshooting

**Blank page?**
- Check that `homepage` in package.json has your correct username
- Wait 2-3 minutes after first deployment

**404 Error?**
- Make sure repository is Public
- Check GitHub Pages is enabled in Settings → Pages

**Need help?**
- Check the full guide: `DEPLOY_GITHUB_PAGES.md`
- Or run the automated script: `./deploy.sh`

---

## What You Need

- ✅ GitHub account (free at github.com)
- ✅ Git installed (check with `git --version`)
- ✅ This project folder

That's it! 🎉
