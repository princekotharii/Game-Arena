import { useEffect, useCallback } from 'react'
import useGameStore from '@store/gameStore'
import usePlayerStore from '@store/playerStore'
import { GAME_STATUS } from '@utils/constants'

export const useGame = (gameId) => {
  const {
    gameState,
    score,
    time,
    moves,
    isPaused,
    setCurrentGame,
    startGame,
    endGame,
    resetGame,
    incrementTime,
    togglePause,
  } = useGameStore()
  
  const { incrementGamesPlayed, incrementGamesWon, addXP, addScore } = usePlayerStore()

  useEffect(() => {
    setCurrentGame(gameId)
    return () => resetGame()
  }, [gameId, setCurrentGame, resetGame])

  useEffect(() => {
    if (gameState === GAME_STATUS.PLAYING && !isPaused) {
      const timer = setInterval(() => {
        incrementTime()
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameState, isPaused, incrementTime])

  const handleStart = useCallback(() => {
    startGame()
    incrementGamesPlayed()
  }, [startGame, incrementGamesPlayed])

  const handleWin = useCallback(() => {
    endGame(true)
    incrementGamesWon()
    addXP(score)
    addScore(score)
  }, [endGame, incrementGamesWon, addXP, addScore, score])

  const handleLose = useCallback(() => {
    endGame(false)
  }, [endGame])

  return {
    gameState,
    score,
    time,
    moves,
    isPaused,
    handleStart,
    handleWin,
    handleLose,
    resetGame,
    togglePause,
  }
}