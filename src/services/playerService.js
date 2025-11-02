import { LOCAL_STORAGE_KEYS } from '@utils/constants'
import { generateId } from '@utils/helpers'

class PlayerService {
  // Create a new player
  createPlayer(username, avatar = '👤') {
    const player = {
      id: generateId(),
      username,
      avatar,
      level: 1,
      xp: 0,
      totalScore: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      achievements: [],
      createdAt: Date.now(),
    }

    this.savePlayer(player)
    return player
  }

  // Save player data
  savePlayer(player) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.PLAYER, JSON.stringify(player))
      return true
    } catch (error) {
      console.error('Error saving player:', error)
      return false
    }
  }

  // Get player data
  getPlayer() {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEYS.PLAYER)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Error getting player:', error)
      return null
    }
  }

  // Update player stats
  updateStats(updates) {
    const player = this.getPlayer()
    if (!player) return null

    const updatedPlayer = { ...player, ...updates }
    this.savePlayer(updatedPlayer)
    return updatedPlayer
  }

  // Add XP and calculate level
  addXP(amount) {
    const player = this.getPlayer()
    if (!player) return null

    const newXP = player.xp + amount
    const newLevel = Math.floor(Math.sqrt(newXP / 100)) + 1

    return this.updateStats({
      xp: newXP,
      level: newLevel,
    })
  }

  // Unlock achievement
  unlockAchievement(achievementId) {
    const player = this.getPlayer()
    if (!player) return null

    if (!player.achievements.includes(achievementId)) {
      const achievements = [...player.achievements, achievementId]
      return this.updateStats({ achievements })
    }

    return player
  }

  // Check and unlock achievements based on stats
  checkAchievements(player) {
    const newAchievements = []

    // First Win
    if (player.gamesWon >= 1 && !player.achievements.includes('first_win')) {
      newAchievements.push('first_win')
    }

    // Dedicated Player
    if (player.gamesPlayed >= 10 && !player.achievements.includes('dedicated')) {
      newAchievements.push('dedicated')
    }

    // Winning Streak
    if (player.gamesWon >= 5 && !player.achievements.includes('streak')) {
      newAchievements.push('streak')
    }

    // Level Master
    if (player.level >= 10 && !player.achievements.includes('level_master')) {
      newAchievements.push('level_master')
    }

    // Champion
    if (player.gamesWon >= 50 && !player.achievements.includes('champion')) {
      newAchievements.push('champion')
    }

    // Perfectionist
    if (
      player.gamesPlayed >= 5 &&
      player.gamesWon === player.gamesPlayed &&
      !player.achievements.includes('perfect')
    ) {
      newAchievements.push('perfect')
    }

    // Unlock new achievements
    newAchievements.forEach(achievement => {
      this.unlockAchievement(achievement)
    })

    return newAchievements
  }

  // Get player rank (mock implementation)
  getPlayerRank() {
    const player = this.getPlayer()
    if (!player) return null

    // This would normally fetch from a backend
    // For now, we'll calculate based on total score
    return Math.max(1, Math.floor(100 - (player.totalScore / 1000)))
  }

  // Reset player data
  resetPlayer() {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.PLAYER)
      return true
    } catch (error) {
      console.error('Error resetting player:', error)
      return false
    }
  }
}

export default new PlayerService()