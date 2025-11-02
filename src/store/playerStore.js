import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LOCAL_STORAGE_KEYS } from '@utils/constants'

const usePlayerStore = create(
  persist(
    (set, get) => ({
      player: {
        id: null,
        username: 'Guest',
        avatar: '👤',
        level: 1,
        xp: 0,
        totalScore: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        achievements: [],
        createdAt: Date.now(),
      },
      
      setPlayer: (playerData) => set({ player: { ...get().player, ...playerData } }),
      
      updatePlayer: (updates) => set((state) => ({
        player: { ...state.player, ...updates }
      })),
      
      addXP: (amount) => set((state) => {
        const newXP = state.player.xp + amount
        const newLevel = Math.floor(Math.sqrt(newXP / 100)) + 1
        return {
          player: {
            ...state.player,
            xp: newXP,
            level: newLevel,
          }
        }
      }),
      
      addScore: (score) => set((state) => ({
        player: {
          ...state.player,
          totalScore: state.player.totalScore + score,
        }
      })),
      
      incrementGamesPlayed: () => set((state) => ({
        player: {
          ...state.player,
          gamesPlayed: state.player.gamesPlayed + 1,
        }
      })),
      
      incrementGamesWon: () => set((state) => ({
        player: {
          ...state.player,
          gamesWon: state.player.gamesWon + 1,
        }
      })),
      
      addAchievement: (achievement) => set((state) => ({
        player: {
          ...state.player,
          achievements: [...state.player.achievements, achievement],
        }
      })),
      
      resetPlayer: () => set({
        player: {
          id: null,
          username: 'Guest',
          avatar: '👤',
          level: 1,
          xp: 0,
          totalScore: 0,
          gamesPlayed: 0,
          gamesWon: 0,
          achievements: [],
          createdAt: Date.now(),
        }
      }),
    }),
    {
      name: LOCAL_STORAGE_KEYS.PLAYER,
    }
  )
)

export default usePlayerStore