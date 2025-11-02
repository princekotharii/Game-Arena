import { GAMES_CONFIG } from '@config/games'
import { LOCAL_STORAGE_KEYS } from '@utils/constants'

class GameService {
  // Get all games
  getAllGames() {
    return GAMES_CONFIG
  }

  // Get game by ID
  getGameById(id) {
    return GAMES_CONFIG.find(game => game.id === id)
  }

  // Save game progress
  saveProgress(gameId, data) {
    try {
      const key = `${LOCAL_STORAGE_KEYS.SCORES}_${gameId}`
      const existing = JSON.parse(localStorage.getItem(key) || '[]')
      existing.push({
        ...data,
        timestamp: Date.now(),
      })
      localStorage.setItem(key, JSON.stringify(existing))
      return true
    } catch (error) {
      console.error('Error saving game progress:', error)
      return false
    }
  }

  // Get game history
  getGameHistory(gameId) {
    try {
      const key = `${LOCAL_STORAGE_KEYS.SCORES}_${gameId}`
      return JSON.parse(localStorage.getItem(key) || '[]')
    } catch (error) {
      console.error('Error getting game history:', error)
      return []
    }
  }

  // Get high score for a game
  getHighScore(gameId) {
    const history = this.getGameHistory(gameId)
    if (history.length === 0) return 0
    return Math.max(...history.map(entry => entry.score))
  }

  // Get player statistics for a game
  getGameStats(gameId) {
    const history = this.getGameHistory(gameId)
    
    if (history.length === 0) {
      return {
        gamesPlayed: 0,
        highScore: 0,
        averageScore: 0,
        totalTime: 0,
      }
    }

    const highScore = Math.max(...history.map(entry => entry.score))
    const totalScore = history.reduce((sum, entry) => sum + entry.score, 0)
    const averageScore = Math.round(totalScore / history.length)
    const totalTime = history.reduce((sum, entry) => sum + (entry.time || 0), 0)

    return {
      gamesPlayed: history.length,
      highScore,
      averageScore,
      totalTime,
    }
  }

  // Clear game data
  clearGameData(gameId) {
    try {
      const key = `${LOCAL_STORAGE_KEYS.SCORES}_${gameId}`
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error clearing game data:', error)
      return false
    }
  }

  // Get recommended games based on player preferences
  getRecommendedGames(playedGames = []) {
    // Simple recommendation: return games not played yet or featured games
    const unplayedGames = GAMES_CONFIG.filter(
      game => !playedGames.includes(game.id)
    )
    
    if (unplayedGames.length > 0) {
      return unplayedGames.slice(0, 3)
    }
    
    return GAMES_CONFIG.filter(game => game.featured).slice(0, 3)
  }
}

export default new GameService()