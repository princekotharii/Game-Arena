import React, { useState } from 'react'
import { Trophy, TrendingUp, Users, Filter } from 'lucide-react'
import Card from '@components/common/Card'
import Badge from '@components/common/Badge'
import Button from '@components/common/Button'
import LeaderboardComponent from '@components/player/Leaderboard'
import usePlayerStore from '@store/playerStore'
import { GAMES_CONFIG } from '@config/games'

const LeaderboardPage = () => {
  const { player } = usePlayerStore()
  const [selectedGame, setSelectedGame] = useState('all')
  const [timeFilter, setTimeFilter] = useState('all-time')

  // Mock leaderboard data
  const mockPlayers = [
    { id: '1', username: 'ProGamer123', level: 25, score: 125000, gamesPlayed: 150, avatar: '🎮' },
    { id: '2', username: 'MasterChief', level: 23, score: 118000, gamesPlayed: 140, avatar: '👑' },
    { id: '3', username: 'GameKing', level: 22, score: 112000, gamesPlayed: 135, avatar: '⚡' },
    { id: '4', username: 'PixelWarrior', level: 20, score: 105000, gamesPlayed: 125, avatar: '🔥' },
    { id: '5', username: 'ArcadeAce', level: 19, score: 98000, gamesPlayed: 120, avatar: '💎' },
    { id: player.id || '6', username: player.username, level: player.level, score: player.totalScore, gamesPlayed: player.gamesPlayed, avatar: player.avatar },
    { id: '7', username: 'SpeedRunner', level: 17, score: 85000, gamesPlayed: 100, avatar: '🚀' },
    { id: '8', username: 'RetroGamer', level: 16, score: 78000, gamesPlayed: 95, avatar: '🎯' },
  ].sort((a, b) => b.score - a.score)

  const stats = [
    { icon: Trophy, label: 'Your Rank', value: `#${mockPlayers.findIndex(p => p.id === player.id) + 1}`, color: 'from-yellow-500 to-orange-500' },
    { icon: TrendingUp, label: 'Your Score', value: player.totalScore.toLocaleString(), color: 'from-blue-500 to-cyan-500' },
    { icon: Users, label: 'Total Players', value: mockPlayers.length.toLocaleString(), color: 'from-purple-500 to-pink-500' },
  ]

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl mb-6 animate-float">
          <Trophy size={40} className="text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Leaderboard</span>
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Compete with the best players and climb to the top!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <p className="text-sm text-white/60 mb-2">Filter by Game</p>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedGame === 'all' ? 'primary' : 'default'}
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedGame('all')}
            >
              All Games
            </Badge>
            {GAMES_CONFIG.map((game) => (
              <Badge
                key={game.id}
                variant={selectedGame === game.id ? 'primary' : 'default'}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedGame(game.id)}
              >
                {game.name}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-white/60 mb-2">Time Period</p>
          <div className="flex gap-2">
            {['today', 'week', 'month', 'all-time'].map((filter) => (
              <Button
                key={filter}
                size="sm"
                variant={timeFilter === filter ? 'primary' : 'secondary'}
                onClick={() => setTimeFilter(filter)}
                className="capitalize"
              >
                {filter.replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <LeaderboardComponent players={mockPlayers} highlightId={player.id} />
    </div>
  )
}

export default LeaderboardPage