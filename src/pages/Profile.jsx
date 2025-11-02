import React, { useState } from 'react'
import { User, Trophy, Star, Award, Edit2, Check, X } from 'lucide-react'
import Card from '@components/common/Card'
import Button from '@components/common/Button'
import Avatar from '@components/common/Avatar'
import Badge from '@components/common/Badge'
import Input from '@components/common/Input'
import usePlayerStore from '@store/playerStore'
import { formatNumber, getXPForNextLevel } from '@utils/helpers'
import toast from 'react-hot-toast'

const Profile = () => {
  const { player, updatePlayer } = usePlayerStore()
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState(player.username)
  const [selectedAvatar, setSelectedAvatar] = useState(player.avatar)

  const avatars = ['👤', '😎', '🎮', '🚀', '⚡', '🔥', '💎', '🦸', '🤖', '🎯', '🏆', '👑']

  const xpForNext = getXPForNextLevel(player.level)
  const xpProgress = (player.xp / xpForNext) * 100

  const stats = [
    { icon: Trophy, label: 'Games Played', value: formatNumber(player.gamesPlayed), color: 'from-blue-500 to-cyan-500' },
    { icon: Star, label: 'Games Won', value: formatNumber(player.gamesWon), color: 'from-yellow-500 to-orange-500' },
    { icon: Award, label: 'Win Rate', value: player.gamesPlayed > 0 ? `${Math.round((player.gamesWon / player.gamesPlayed) * 100)}%` : '0%', color: 'from-green-500 to-emerald-500' },
    { icon: Trophy, label: 'Total Score', value: formatNumber(player.totalScore), color: 'from-purple-500 to-pink-500' },
  ]

  const achievements = [
    { id: 1, name: 'First Win', description: 'Win your first game', icon: '🏆', unlocked: player.gamesWon >= 1 },
    { id: 2, name: 'Dedicated Player', description: 'Play 10 games', icon: '🎮', unlocked: player.gamesPlayed >= 10 },
    { id: 3, name: 'Winning Streak', description: 'Win 5 games', icon: '🔥', unlocked: player.gamesWon >= 5 },
    { id: 4, name: 'Level Master', description: 'Reach level 10', icon: '⭐', unlocked: player.level >= 10 },
    { id: 5, name: 'Champion', description: 'Win 50 games', icon: '👑', unlocked: player.gamesWon >= 50 },
    { id: 6, name: 'Perfectionist', description: '100% win rate (min 5 games)', icon: '💎', unlocked: player.gamesPlayed >= 5 && player.gamesWon === player.gamesPlayed },
  ]

  const handleSave = () => {
    if (username.trim().length < 3) {
      toast.error('Username must be at least 3 characters')
      return
    }

    updatePlayer({
      username: username.trim(),
      avatar: selectedAvatar,
    })

    setIsEditing(false)
    toast.success('Profile updated successfully!')
  }

  const handleCancel = () => {
    setUsername(player.username)
    setSelectedAvatar(player.avatar)
    setIsEditing(false)
  }

  return (
    <div className="container-custom py-12">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar alt={player.username} size="xl" />
              <div className="absolute -bottom-2 -right-2 bg-arena-accent rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {player.level}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                  <div>
                    <p className="text-sm text-white/60 mb-2">Choose Avatar</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {avatars.map((avatar) => (
                        <button
                          key={avatar}
                          onClick={() => setSelectedAvatar(avatar)}
                          className={`text-3xl p-2 rounded-lg transition-all ${
                            selectedAvatar === avatar
                              ? 'bg-arena-accent scale-110'
                              : 'bg-arena-light hover:bg-arena-light/80'
                          }`}
                        >
                          {avatar}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSave}>
                      <Check size={16} className="mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="secondary" onClick={handleCancel}>
                      <X size={16} className="mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                    <h1 className="text-3xl font-bold">{player.username}</h1>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
                      <Edit2 size={16} />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 justify-center md:justify-start mb-4">
                    <Badge variant="primary">Level {player.level}</Badge>
                    <Badge variant="default">{player.xp} XP</Badge>
                  </div>
                  <div className="max-w-md mx-auto md:mx-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/60">Level Progress</span>
                      <span className="text-white/60">{player.xp} / {xpForNext} XP</span>
                    </div>
                    <div className="h-3 bg-arena-light rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-arena-accent to-primary-500 transition-all duration-500"
                        style={{ width: `${xpProgress}%` }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={achievement.unlocked ? 'bg-gradient-to-br from-arena-accent/10 to-primary-500/10 border-arena-accent/30' : 'opacity-50'}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold">{achievement.name}</h3>
                      {achievement.unlocked && (
                        <Check size={16} className="text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-white/60">{achievement.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile