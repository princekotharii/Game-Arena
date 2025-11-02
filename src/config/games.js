import { Gamepad2, Brain, Zap, Puzzle } from 'lucide-react'

export const GAMES_CONFIG = [
  {
    id: 'tic-tac-toe',
    name: 'Tic Tac Toe',
    description: 'Classic two-player strategy game',
    category: 'strategy',
    icon: Gamepad2,
    color: 'from-blue-500 to-cyan-500',
    players: { min: 2, max: 2 },
    difficulty: ['easy', 'medium', 'hard'],
    thumbnail: '/games/tictactoe.png',
    featured: true,
  },
  {
    id: 'snake',
    name: 'Snake Game',
    description: 'Eat food and grow your snake',
    category: 'arcade',
    icon: Zap,
    color: 'from-green-500 to-emerald-500',
    players: { min: 1, max: 1 },
    difficulty: ['easy', 'medium', 'hard'],
    thumbnail: '/games/snake.png',
    featured: true,
  },
  {
    id: 'memory',
    name: 'Memory Match',
    description: 'Match pairs of cards',
    category: 'puzzle',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    players: { min: 1, max: 2 },
    difficulty: ['easy', 'medium', 'hard'],
    thumbnail: '/games/memory.png',
    featured: true,
  },
  {
    id: 'puzzle',
    name: '2048 Puzzle',
    description: 'Combine tiles to reach 2048',
    category: 'puzzle',
    icon: Puzzle,
    color: 'from-orange-500 to-red-500',
    players: { min: 1, max: 1 },
    difficulty: ['easy', 'medium', 'hard'],
    thumbnail: '/games/puzzle.png',
    featured: false,
  },
]

export const getGameById = (id) => {
  return GAMES_CONFIG.find(game => game.id === id)
}

export const getGamesByCategory = (category) => {
  return GAMES_CONFIG.filter(game => game.category === category)
}

export const getFeaturedGames = () => {
  return GAMES_CONFIG.filter(game => game.featured)
}