import React, { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import Input from '@components/common/Input'
import Button from '@components/common/Button'
import Badge from '@components/common/Badge'
import GameGrid from '@components/game/GameGrid'
import { GAMES_CONFIG, getGamesByCategory } from '@config/games'
import { GAME_CATEGORIES } from '@utils/constants'

const Games = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredGames = GAMES_CONFIG.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: 'all', label: 'All Games' },
    { id: GAME_CATEGORIES.PUZZLE, label: 'Puzzle' },
    { id: GAME_CATEGORIES.STRATEGY, label: 'Strategy' },
    { id: GAME_CATEGORIES.ARCADE, label: 'Arcade' },
    { id: GAME_CATEGORIES.MULTIPLAYER, label: 'Multiplayer' },
  ]

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Browse <span className="gradient-text">Games</span>
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Discover and play amazing games. From puzzles to action-packed adventures!
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <Input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? 'primary' : 'default'}
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-white/60">
          Showing <span className="text-white font-semibold">{filteredGames.length}</span> games
        </p>
      </div>

      {/* Games Grid */}
      {filteredGames.length > 0 ? (
        <GameGrid games={filteredGames} />
      ) : (
        <div className="text-center py-20">
          <p className="text-2xl text-white/60 mb-4">No games found</p>
          <p className="text-white/40 mb-8">Try adjusting your search or filters</p>
          <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default Games