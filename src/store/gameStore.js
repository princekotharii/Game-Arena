import { create } from 'zustand'
import { GAME_STATUS } from '@utils/constants'

const useGameStore = create((set, get) => ({
  currentGame: null,
  gameState: GAME_STATUS.IDLE,
  score: 0,
  highScore: 0,
  time: 0,
  moves: 0,
  difficulty: 'medium',
  isPaused: false,
  
  setCurrentGame: (gameId) => set({ currentGame: gameId }),
  
  setGameState: (state) => set({ gameState: state }),
  
  setScore: (score) => set((state) => {
    const newHighScore = Math.max(score, state.highScore)
    return { score, highScore: newHighScore }
  }),
  
  incrementScore: (points) => set((state) => {
    const newScore = state.score + points
    const newHighScore = Math.max(newScore, state.highScore)
    return { score: newScore, highScore: newHighScore }
  }),
  
  setTime: (time) => set({ time }),
  
  incrementTime: () => set((state) => ({ time: state.time + 1 })),
  
  setMoves: (moves) => set({ moves }),
  
  incrementMoves: () => set((state) => ({ moves: state.moves + 1 })),
  
  setDifficulty: (difficulty) => set({ difficulty }),
  
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  
  resetGame: () => set({
    gameState: GAME_STATUS.IDLE,
    score: 0,
    time: 0,
    moves: 0,
    isPaused: false,
  }),
  
  startGame: () => set({
    gameState: GAME_STATUS.PLAYING,
    score: 0,
    time: 0,
    moves: 0,
    isPaused: false,
  }),
  
  endGame: (won = false) => set({
    gameState: won ? GAME_STATUS.WON : GAME_STATUS.LOST,
    isPaused: false,
  }),
}))

export default useGameStore