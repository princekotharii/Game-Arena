import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, Trophy, Users, Zap, ArrowRight } from 'lucide-react'
import Button from '@components/common/Button'
import Card from '@components/common/Card'
import GameGrid from '@components/game/GameGrid'
import { getFeaturedGames } from '@config/games'
import usePlayerStore from '@store/playerStore'

const Home = () => {
  const navigate = useNavigate()
  const { player } = usePlayerStore()
  const featuredGames = getFeaturedGames()

  const features = [
    {
      icon: Play,
      title: 'Multiple Games',
      description: 'Choose from a variety of exciting games to play',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Trophy,
      title: 'Compete & Win',
      description: 'Climb the leaderboard and become the champion',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Multiplayer Arena',
      description: 'Challenge players from around the world',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Real-time Gaming',
      description: 'Fast-paced action with instant matchmaking',
      color: 'from-green-500 to-emerald-500'
    },
  ]

  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <div className="inline-block animate-float mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-arena-accent to-primary-500 rounded-2xl flex items-center justify-center">
            <Play size={40} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Welcome to <span className="gradient-text">Game Arena</span>
        </h1>
        
        <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
          The ultimate gaming platform where you can play, compete, and connect with players worldwide.
          Start your journey to become the champion!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" onClick={() => navigate('/games')}>
            <Play className="mr-2" />
            Play Now
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/arena')}>
            <Trophy className="mr-2" />
            Enter Arena
          </Button>
        </div>

        {/* Player Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12">
          <Card>
            <p className="text-3xl font-bold gradient-text">{player.gamesPlayed}</p>
            <p className="text-sm text-white/60">Games Played</p>
          </Card>
          <Card>
            <p className="text-3xl font-bold gradient-text">{player.gamesWon}</p>
            <p className="text-sm text-white/60">Wins</p>
          </Card>
          <Card>
            <p className="text-3xl font-bold gradient-text">{player.level}</p>
            <p className="text-sm text-white/60">Level</p>
          </Card>
          <Card>
            <p className="text-3xl font-bold gradient-text">{player.xp}</p>
            <p className="text-sm text-white/60">Total XP</p>
          </Card>
        </div>
      </div>

      {/* Features */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Game Arena?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} hover>
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Games */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Games</h2>
          <Button variant="ghost" onClick={() => navigate('/games')}>
            View All <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
        <GameGrid games={featuredGames} />
      </div>
    </div>
  )
}

export default Home