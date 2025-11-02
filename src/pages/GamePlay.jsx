import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Play, RotateCcw, Pause, Settings as SettingsIcon } from 'lucide-react'
import Button from '@components/common/Button'
import Card from '@components/common/Card'
import GameStats from '@components/game/GameStats'
import Modal from '@components/common/Modal'
import { getGameById } from '@config/games'
import { useGame } from '@hooks/useGame'
import useGameStore from '@store/gameStore'
import { GAME_STATUS } from '@utils/constants'
import toast from 'react-hot-toast'

// Import game components
import TicTacToe from '@games/TicTacToe/TicTacToe'
import Snake from '@games/Snake/Snake'
import Memory from '@games/Memory/Memory'
import Puzzle from '@games/Puzzle/Puzzle'

const GamePlay = () => {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const game = getGameById(gameId)
  const [showModal, setShowModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  const { 
    gameState, 
    score, 
    time, 
    moves, 
    isPaused,
    handleStart, 
    handleWin, 
    handleLose,
    resetGame,
    togglePause 
  } = useGame(gameId)
  
  const { highScore, difficulty, setDifficulty } = useGameStore()

  useEffect(() => {
    if (!game) {
      toast.error('Game not found')
      navigate('/games')
    }
  }, [game, navigate])

  if (!game) return null

  const GameComponent = {
    'tic-tac-toe': TicTacToe,
    'snake': Snake,
    'memory': Memory,
    'puzzle': Puzzle,
  }[gameId]

  const handleGameEnd = (won) => {
    if (won) {
      handleWin()
      toast.success('Congratulations! You won! 🎉')
    } else {
      handleLose()
      toast.error('Game Over! Try again! 💪')
    }
    setShowModal(true)
  }

  const handleRestart = () => {
    resetGame()
    setShowModal(false)
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => navigate('/games')}>
          <ArrowLeft className="mr-2" />
          Back to Games
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => setShowSettings(true)}>
            <SettingsIcon size={20} />
          </Button>
        </div>
      </div>

      {/* Game Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{game.name}</h1>
        <p className="text-white/60">{game.description}</p>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <GameStats score={score} time={time} moves={moves} highScore={highScore} />
      </div>

      {/* Game Area */}
      <Card className="mb-8">
        {gameState === GAME_STATUS.IDLE ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Ready to Play?</h2>
            <p className="text-white/60 mb-8">Click the button below to start the game</p>
            <Button size="lg" onClick={handleStart}>
              <Play className="mr-2" />
              Start Game
            </Button>
          </div>
        ) : (
          <div className="relative">
            {isPaused && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
                <Card>
                  <h3 className="text-2xl font-bold mb-4">Game Paused</h3>
                  <Button onClick={togglePause}>Resume</Button>
                </Card>
              </div>
            )}
            {GameComponent && <GameComponent onGameEnd={handleGameEnd} />}
          </div>
        )}
      </Card>

      {/* Controls */}
      {gameState === GAME_STATUS.PLAYING && (
        <div className="flex justify-center gap-4">
          <Button variant="secondary" onClick={togglePause}>
            <Pause className="mr-2" />
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button variant="secondary" onClick={handleRestart}>
            <RotateCcw className="mr-2" />
            Restart
          </Button>
        </div>
      )}

      {/* Game Over Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={gameState === GAME_STATUS.WON ? '🎉 Victory!' : '💪 Game Over'}
      >
        <div className="text-center space-y-6">
          <div>
            <p className="text-white/60 mb-2">Your Score</p>
            <p className="text-4xl font-bold gradient-text">{score}</p>
          </div>
          
          {gameState === GAME_STATUS.WON && score > highScore && (
            <p className="text-yellow-500 font-semibold">🏆 New High Score!</p>
          )}

          <div className="flex gap-4">
            <Button className="flex-1" onClick={handleRestart}>
              <RotateCcw className="mr-2" />
              Play Again
            </Button>
            <Button className="flex-1" variant="secondary" onClick={() => navigate('/games')}>
              <ArrowLeft className="mr-2" />
              Back to Games
            </Button>
          </div>
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Game Settings"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Difficulty</label>
            <div className="flex gap-2">
              {['easy', 'medium', 'hard'].map((level) => (
                <Button
                  key={level}
                  variant={difficulty === level ? 'primary' : 'secondary'}
                  onClick={() => setDifficulty(level)}
                  className="flex-1 capitalize"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default GamePlay