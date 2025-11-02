import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, Users, Trophy } from 'lucide-react'
import Card from '@components/common/Card'
import Badge from '@components/common/Badge'
import Button from '@components/common/Button'
import { cn } from '@utils/cn'

const GameCard = ({ game }) => {
  const navigate = useNavigate()
  const Icon = game.icon

  return (
    <Card hover className="group overflow-hidden">
      {/* Game Header with Gradient */}
      <div className={cn(
        'relative h-40 -m-6 mb-4 flex items-center justify-center',
        `bg-gradient-to-br ${game.color}`
      )}>
        <Icon size={64} className="text-white/90 group-hover:scale-110 transition-transform" />
        {game.featured && (
          <Badge variant="warning" className="absolute top-4 right-4">
            Featured
          </Badge>
        )}
      </div>

      {/* Game Info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold mb-1">{game.name}</h3>
          <p className="text-white/60 text-sm">{game.description}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-white/60">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{game.players.min}-{game.players.max} Players</span>
          </div>
          <Badge variant="default" className="capitalize">
            {game.category}
          </Badge>
        </div>

        <Button 
          className="w-full"
          onClick={() => navigate(`/games/${game.id}`)}
        >
          <Play size={18} className="mr-2" />
          Play Now
        </Button>
      </div>
    </Card>
  )
}

export default GameCard