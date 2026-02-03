# 💛 Valentine's Day App

A cute web app to ask that special someone to be your Valentine!

## Features

- 🌷 Beautiful yellow/floral theme
- 📸 Photo gallery of your memories together
- 🎮 Fun mini-games (Catch the Kinder, Love Trivia)
- 💕 The big question with an escaping "No" button!
- 🎉 Celebration page with confetti

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Add your photos

Put your photos in `public/photos/`:

- photo1.jpg
- photo2.jpg
- photo3.jpg
- photo4.jpg
- photo5.jpg

### 3. Customize

Edit these files to personalize:

**Her name** - Update `HER_NAME` in:

- `src/components/IntroPage.tsx`
- `src/components/TheQuestion.tsx`
- `src/components/Celebration.tsx`

**Photo captions** - Edit `src/components/PhotoGallery.tsx`

**Trivia questions** - Edit `src/components/MiniGames.tsx`

**Your signature** - Edit `src/components/Celebration.tsx`

### 4. Run locally

```bash
npm start
```

### 5. Deploy to GitHub Pages

1. Create a new repo on GitHub
2. Update `package.json` with your repo name:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
   ```
3. Push your code:
   ```bash
   git init
   git add .
   git commit -m "💕 Initial commit"
   git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```

## Made with 💛

For someone special!

# Made with OpenClaw
