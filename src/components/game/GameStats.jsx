import React from 'react'
import { Trophy, Clock, Target, Zap } from 'lucide-react'
import Card from '@components/common/Card'
import { formatTime, formatScore } from '@utils/helpers'

const GameStats = ({ score, time, moves, highScore }) => {
  const stats = [
    { icon: Trophy, label: 'Score', value: formatScore(score), color: 'text-yellow-500' },
    { icon: Clock, label: 'Time', value: formatTime(time), color: 'text-blue-500' },
    { icon: Target, label: 'Moves', value: moves, color: 'text-green-500' },
    { icon: Zap, label: 'Best', value: formatScore(highScore), color: 'text-purple-500' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="text-center">
          <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={24} />
          <p className="text-2xl font-bold mb-1">{stat.value}</p>
          <p className="text-sm text-white/60">{stat.label}</p>
        </Card>
      ))}
    </div>
  )
}

export default GameStats