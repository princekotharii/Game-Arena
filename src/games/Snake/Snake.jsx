import React, { useState, useEffect, useCallback } from 'react'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import GameBoard from './GameBoard'
import useGameStore from '@store/gameStore'
import {
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  DIRECTIONS,
  generateFood,
  moveSnake,
  checkCollision,
  checkFoodCollision,
  getSpeed,
} from './gameLogic'

const Snake = ({ onGameEnd }) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [food, setFood] = useState(generateFood(INITIAL_SNAKE))
  const [isPlaying, setIsPlaying] = useState(true)
  
  const { difficulty, incrementScore, incrementMoves, score } = useGameStore()
  const speed = getSpeed(difficulty)

  const changeDirection = useCallback((newDirection) => {
    // Prevent reversing
    if (
      (direction.x === 1 && newDirection.x === -1) ||
      (direction.x === -1 && newDirection.x === 1) ||
      (direction.y === 1 && newDirection.y === -1) ||
      (direction.y === -1 && newDirection.y === 1)
    ) {
      return
    }
    setDirection(newDirection)
  }, [direction])

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          e.preventDefault()
          changeDirection(DIRECTIONS.UP)
          break
        case 'ArrowDown':
        case 's':
          e.preventDefault()
          changeDirection(DIRECTIONS.DOWN)
          break
        case 'ArrowLeft':
        case 'a':
          e.preventDefault()
          changeDirection(DIRECTIONS.LEFT)
          break
        case 'ArrowRight':
        case 'd':
          e.preventDefault()
          changeDirection(DIRECTIONS.RIGHT)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [changeDirection])

  useEffect(() => {
    if (!isPlaying) return

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = moveSnake(prevSnake, direction)

        if (checkCollision(newSnake)) {
          setIsPlaying(false)
          onGameEnd(false)
          return prevSnake
        }

        if (checkFoodCollision(newSnake, food)) {
          incrementScore(10)
          incrementMoves()
          setFood(generateFood(newSnake))
          return [...newSnake, prevSnake[prevSnake.length - 1]]
        }

        return newSnake
      })
    }, speed)

    return () => clearInterval(gameLoop)
  }, [direction, food, isPlaying, speed, onGameEnd, incrementScore, incrementMoves])

  return (
    <div className="py-8">
      <div className="mb-6 text-center">
        <p className="text-xl font-semibold mb-2">
          Length: <span className="text-arena-accent">{snake.length}</span>
        </p>
        <p className="text-white/60 text-sm">Use Arrow Keys or WASD to move</p>
      </div>

      <GameBoard snake={snake} food={food} />

      {/* Mobile Controls */}
      <div className="mt-8 grid grid-cols-3 gap-2 max-w-xs mx-auto md:hidden">
        <div />
        <button
          onClick={() => changeDirection(DIRECTIONS.UP)}
          className="glass-effect p-4 rounded-lg active:scale-95 transition-transform"
        >
          <ArrowUp className="mx-auto" />
        </button>
        <div />
        <button
          onClick={() => changeDirection(DIRECTIONS.LEFT)}
          className="glass-effect p-4 rounded-lg active:scale-95 transition-transform"
        >
          <ArrowLeft className="mx-auto" />
        </button>
        <button
          onClick={() => changeDirection(DIRECTIONS.DOWN)}
          className="glass-effect p-4 rounded-lg active:scale-95 transition-transform"
        >
          <ArrowDown className="mx-auto" />
        </button>
        <button
          onClick={() => changeDirection(DIRECTIONS.RIGHT)}
          className="glass-effect p-4 rounded-lg active:scale-95 transition-transform"
        >
          <ArrowRight className="mx-auto" />
        </button>
      </div>
    </div>
  )
}

export default Snake