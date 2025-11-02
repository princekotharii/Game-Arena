import { useState, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { LOCAL_STORAGE_KEYS } from '@utils/constants'

export const useLeaderboard = (gameId = null) => {
  const [scores, setScores] = useLocalStorage(LOCAL_STORAGE_KEYS.SCORES, {})
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    if (gameId) {
      const gameScores = scores[gameId] || []
      const sorted = [...gameScores].sort((a, b) => b.score - a.score).slice(0, 10)
      setLeaderboard(sorted)
    } else {
      // Global leaderboard
      const allScores = Object.values(scores).flat()
      const sorted = [...allScores].sort((a, b) => b.score - a.score).slice(0, 10)
      setLeaderboard(sorted)
    }
  }, [scores, gameId])

  const addScore = (scoreData) => {
    const gameScores = scores[scoreData.gameId] || []
    const newScores = {
      ...scores,
      [scoreData.gameId]: [...gameScores, scoreData]
    }
    setScores(newScores)
  }

  return { leaderboard, addScore }
}