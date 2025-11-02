# 🎮 Game Arena

A professional, full-featured game arena platform built with React, Tailwind CSS, and modern web technologies. Play multiple games, compete with friends, track your progress, and climb the leaderboards!

## ✨ Features

- 🎯 **Multiple Games**: Tic-Tac-Toe, Snake, Memory Match, 2048 Puzzle
- 👥 **Multiplayer Arena**: Create rooms and play with friends
- 🏆 **Leaderboards**: Compete globally and track rankings
- 📊 **Player Profiles**: Level system, XP tracking, and achievements
- 💾 **Local Storage**: Auto-save progress and game history
- 🎨 **Beautiful UI**: Modern glass-morphism design with smooth animations
- 📱 **Responsive**: Works perfectly on mobile, tablet, and desktop
- ⚙️ **Settings**: Customize sound, theme, and notifications
- 🎮 **Game Modes**: Single-player and multiplayer options
- 🏅 **Achievements**: Unlock badges as you play

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn installed

### Installation

1. **Create the project**:
```bash
npm create vite@latest game-arena -- --template react
cd game-arena
```

2. **Install dependencies**:
```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom zustand clsx tailwind-merge lucide-react framer-motion date-fns react-hot-toast react-hook-form zod @hookform/resolvers
```

3. **Copy all the source files** from this repository into your project following the folder structure provided.

4. **Start the development server**:
```bash
npm run dev
```

5. **Open your browser** and navigate to `http://localhost:5173`

## 📁 Project Structure

```
game-arena/
├── src/
│   ├── assets/          # Images and sounds
│   ├── components/      # Reusable React components
│   │   ├── common/      # Button, Card, Modal, etc.
│   │   ├── layout/      # Navbar, Footer, Layout
│   │   ├── game/        # Game-specific components
│   │   ├── player/      # Player-related components
│   │   └── arena/       # Arena components
│   ├── games/           # Game implementations
│   │   ├── TicTacToe/
│   │   ├── Snake/
│   │   ├── Memory/
│   │   └── Puzzle/
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand state management
│   ├── services/        # Business logic and API
│   ├── utils/           # Helper functions
│   ├── config/          # Configuration files
│   └── styles/          # Global styles
├── public/              # Static assets
└── package.json
```

## 🎮 Available Games

### 1. Tic-Tac-Toe
- Play against AI (Easy, Medium, Hard)
- 2-player local multiplayer
- Smart AI using Minimax algorithm

### 2. Snake
- Classic snake gameplay
- Adjustable difficulty
- Score tracking and high scores

### 3. Memory Match
- Find matching card pairs
- Multiple difficulty levels
- Timer and move counter

### 4. 2048 Puzzle
- Combine tiles to reach 2048
- Unlimited gameplay
- Score calculation

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **Lucide React** - Icons
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications

## 📝 Key Features Breakdown

### State Management
- **Zustand stores** for game state, player data, and arena management
- Persistent storage with localStorage
- Clean and simple API

### Routing
- React Router v6 for navigation
- Protected routes (can be extended)
- Dynamic game routes

### Responsive Design
- Mobile-first approach
- Touch controls for mobile devices
- Adaptive layouts for all screen sizes

### Performance
- Optimized rendering with React best practices
- Lazy loading for better initial load times
- Efficient state updates

## 🎨 Customization

### Adding New Games

1. Create a new folder in `src/games/YourGame/`
2. Implement game logic in `gameLogic.js`
3. Create game components
4. Add game config to `src/config/games.js`
5. Import in `src/pages/GamePlay.jsx`

### Styling

- Modify `tailwind.config.js` for theme colors
- Update `src/styles/globals.css` for global styles
- Use Tailwind utility classes throughout

## 🏗️ Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 📦 Deployment

Deploy to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist` folder
- **GitHub Pages**: Use `gh-pages` package

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

**Prince Kothari** ([@princekotharii](https://github.com/princekotharii))

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Inspired by classic arcade games
- Built with modern web technologies

---

**Enjoy playing! 🎮🏆**

For questions or support, please open an issue on GitHub.
