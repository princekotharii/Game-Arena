import React from 'react'
import { Trophy, Medal, Award } from 'lucide-react'
import Card from '@components/common/Card'
import Avatar from '@components/common/Avatar'
import { formatScore } from '@utils/helpers'

const Leaderboard = ({ players, highlightId }) => {
  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Trophy className="text-yellow-500" size={24} />
      case 2: return <Medal className="text-gray-400" size={24} />
      case 3: return <Award className="text-orange-600" size={24} />
      default: return <span className="text-white/60 font-bold">{rank}</span>
    }
  }

  const getRankColor = (rank) => {
    switch(rank) {
      case 1: return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30'
      case 2: return 'from-gray-400/20 to-gray-500/20 border-gray-400/30'
      case 3: return 'from-orange-500/20 to-orange-600/20 border-orange-500/30'
      default: return ''
    }
  }

  return (
    <div className="space-y-3">
      {players.map((player, index) => {
        const rank = index + 1
        const isHighlighted = player.id === highlightId

        return (
          <Card 
            key={player.id} 
            className={`
              ${rank <= 3 ? `bg-gradient-to-r ${getRankColor(rank)}` : ''}
              ${isHighlighted ? 'ring-2 ring-arena-accent' : ''}
            `}
          >
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className="w-12 flex items-center justify-center">
                {getRankIcon(rank)}
              </div>

              {/* Player Info */}
              <Avatar alt={player.username} size="md" />
              <div className="flex-1">
                <p className="font-bold">{player.username}</p>
                <p className="text-sm text-white/60">Level {player.level}</p>
              </div>

              {/* Score */}
              <div className="text-right">
                <p className="text-2xl font-bold">{formatScore(player.score)}</p>
                <p className="text-xs text-white/60">{player.gamesPlayed} games</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default Leaderboard