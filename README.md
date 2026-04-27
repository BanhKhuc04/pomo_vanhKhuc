# 🍅 POMO TIME

A cozy pixel-art Pomodoro Timer web app for students. Built with React 18 + Vite + TailwindCSS, inspired by Stardew Valley aesthetics.

![Made with React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwindcss)

## ✨ Features

- 🍅 **Pomodoro Timer** — Focus / Short Break / Long Break with auto-cycle
- 🏠 **Animated Pixel Scene** — Cozy room with character, pet cat, candle, bookshelf
- 🌅 **Day/Night Window** — Sky changes based on real time of day
- 🌙 **Dark Mode** — Manual toggle + auto switch (after 6 PM)
- 🌱 **Garden Growth** — Plant grows for each completed Pomodoro (19 plots/day)
- 🔥 **Daily Streak** — Track consecutive study days
- 🏆 **6 Achievements** — First Bloom, Night Owl, Early Bird, Week Warrior, Study Master, Garden Keeper
- 🎵 **Lo-fi Music + SFX** — Background music during focus, click sounds, bell on session end
- 📊 **Stats Panel** — Today's pomos, focus time, all-time totals
- ⚙️ **Settings** — Customize durations, volumes, toggles
- 🔔 **Browser Notifications** — Alerts when sessions end
- ⌨️ **Keyboard Shortcuts** — `Space` (start/pause), `R` (reset)
- 📱 **Responsive** — Works on mobile and desktop
- 💾 **localStorage Persistence** — All progress saved locally

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:5173`.

## 🔊 Adding Sound Files (Optional)

The app works silently out of the box. To enable sounds, add MP3 files to `public/sounds/`:

- `lofi-bg.mp3` — Background music (loops during focus)
- `tick.mp3` — Tick-tock (toggle in Settings)
- `bell.mp3` — Session-end chime
- `click.mp3` — UI click feedback
- `achievement.mp3` — Achievement unlock fanfare
- `meow.mp3` — Cat meow

See `public/sounds/README.md` for free sound sources.

## 🎨 Design System

### Colors
**Light Mode (Cozy):** cream `#FFF5E1`, wood `#C9A57B`, pink `#F8D7DA`, mint `#B8E0D2`, orange `#F4A261`, lavender `#D4C5E2`

**Dark Mode (Night):** night `#2D2B4E`, purple `#4A3F6B`, blue `#5C6BC0`, star `#FFE082`

### Typography
- **Headings & Timer:** `Press Start 2P` (pixel font)
- **Body & UI:** `VT323` (retro monospace)

### Style Principles
- 4px hard borders (no rounded corners)
- Pixel offset shadows (`4px 4px 0 0`)
- `image-rendering: pixelated`
- Animations: bounce, float, blink, flicker, twinkle

## 📂 Project Structure

```
pomo-time/
├── public/
│   ├── sounds/            # MP3 audio files (optional)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Timer/         # TimerDisplay, Controls, Tabs, Counter
│   │   ├── Scene/         # PixelRoom, Window, Furniture, Character, Pet, Candle
│   │   ├── Stats/         # Garden, StreakBadge, StatsPanel, AchievementsModal
│   │   ├── Settings/      # SettingsModal
│   │   └── UI/            # PixelButton, PixelCard, PixelModal, etc.
│   ├── hooks/             # useTimer, useTheme, useSound, useStreak, etc.
│   ├── context/           # PomoContext (global state)
│   ├── data/              # constants, achievements, sounds
│   ├── utils/             # helpers
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🎮 How to Use

1. **Choose a mode** — Focus (25min), Short Break (5min), or Long Break (15min)
2. **Press Start** (or `Space`) — Timer counts down with cozy animations
3. **Stay focused** — The character studies, candle flickers, lo-fi plays
4. **Session ends** — Bell rings, garden grows a plant 🌱, mode auto-switches
5. **Complete 4 focus sessions** — Auto Long Break unlocks
6. **Build streaks** — Study daily to keep your 🔥 streak alive
7. **Unlock achievements** — 6 to collect!

## 🛠️ Tech Stack

- **React 18** + **Vite 5** — Fast dev experience
- **TailwindCSS 3** — Utility-first styling with custom palette
- **Framer Motion** — Smooth animations
- **Howler.js** — Audio management
- **lucide-react** — Icon library
- **clsx** — Conditional classnames
- **localStorage** — Client-side persistence (no backend)

## 📝 License

MIT — Build cozy things with this. 💕
