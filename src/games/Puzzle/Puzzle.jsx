import React, { useState, useEffect, useCallback } from 'react'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import PuzzlePiece from './PuzzlePiece'
import useGameStore from '@store/gameStore'
import {
  initializeGrid,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  hasGridChanged,
  hasWon,
  canMove,
  addRandomTile,
  calculateScore,
} from './gameLogic'
import toast from 'react-hot-toast'

const Puzzle = ({ onGameEnd }) => {
  const [grid, setGrid] = useState(initializeGrid())
  const [hasWonGame, setHasWonGame] = useState(false)
  const { incrementMoves, setScore } = useGameStore()

  const handleMove = useCallback((moveFunction) => {
    setGrid((prevGrid) => {
      const newGrid = moveFunction(prevGrid)
      
      if (hasGridChanged(prevGrid, newGrid)) {
        addRandomTile(newGrid)
        incrementMoves()
        
        const currentScore = calculateScore(newGrid)
        setScore(currentScore)

        if (!hasWonGame && hasWon(newGrid)) {
          setHasWonGame(true)
          toast.success('You reached 2048! 🎉')
          setTimeout(() => {
            onGameEnd(true)
          }, 1500)
        } else if (!canMove(newGrid)) {
          toast.error('Game Over! No more moves!')
          setTimeout(() => {
            onGameEnd(false)
          }, 1000)
        }
      }
      
      return newGrid
    })
  }, [incrementMoves, setScore, hasWonGame, onGameEnd])

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          e.preventDefault()
          handleMove(moveUp)
          break
        case 'ArrowDown':
        case 's':
          e.preventDefault()
          handleMove(moveDown)
          break
        case 'ArrowLeft':
        case 'a':
          e.preventDefault()
          handleMove(moveLeft)
          break
        case 'ArrowRight':
        case 'd':
          e.preventDefault()
          handleMove(moveRight)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleMove])

  return (
    <div className="py-8">
      <div className="mb-6 text-center">
        <p className="text-xl font-semibold mb-2">
          Goal: Reach <span className="text-arena-accent">2048</span>!
        </p>
        <p className="text-white/60 text-sm">Use Arrow Keys or WASD to move tiles</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="glass-effect p-4 rounded-xl">
          <div className="grid grid-cols-4 gap-3">
            {grid.map((row, rowIndex) =>
              row.map((value, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} className="aspect-square">
                  <PuzzlePiece value={value} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="mt-8 grid grid-cols-3 gap-2 max-w-xs mx-auto md:hidden">
        <div />
        <button
          onClick={() => handleMove(moveUp)}
          className="glass-effect p-4 rounded-lg active:scale-95 transition-transform"
        >
          <ArrowUp className="mx-auto" />
        </button>
        <div />
        <button
          onClick={() => handleMove(moveLeft)}
          className="glass-effect p-4 rounded-lg active:scale-95 transition-transform"
        >
          <ArrowLeft className="mx-auto" />
        </button>
        <button
          onClick={() => handleMove(moveDown)}
          className="glass-effect p-4 rounded-lg active:scale-95 transition-transform"
        >
          <ArrowDown className="mx-auto" />
        </button>
        <button
          onClick={() => handleMove(moveRight)}
          className="glass-effect p-4 rounded-lg active:scale-95 transition-transform"
        >
          <ArrowRight className="mx-auto" />
        </button>
      </div>

      {/* How to Play */}
      <div className="mt-8 max-w-md mx-auto glass-effect p-4 rounded-xl">
        <h3 className="font-bold mb-2">How to Play:</h3>
        <ul className="text-sm text-white/60 space-y-1">
          <li>• Use arrow keys to move tiles</li>
          <li>• Tiles with the same number merge into one</li>
          <li>• Create a tile with the number 2048 to win</li>
          <li>• Keep playing to reach higher numbers!</li>
        </ul>
      </div>
    </div>
  )
}

export default Puzzle