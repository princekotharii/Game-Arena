import React from 'react'
import { GRID_SIZE, CELL_SIZE } from './gameLogic'

const GameBoard = ({ snake, food }) => {
  return (
    <div
      className="relative mx-auto border-2 border-arena-accent rounded-lg overflow-hidden"
      style={{
        width: GRID_SIZE * CELL_SIZE,
        height: GRID_SIZE * CELL_SIZE,
        background: 'linear-gradient(45deg, #0f0f23 25%, #1a1a35 25%, #1a1a35 50%, #0f0f23 50%, #0f0f23 75%, #1a1a35 75%)',
        backgroundSize: '40px 40px',
      }}
    >
      {/* Snake */}
      {snake.map((segment, index) => (
        <div
          key={index}
          className="absolute transition-all duration-100"
          style={{
            left: segment.x * CELL_SIZE,
            top: segment.y * CELL_SIZE,
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
            backgroundColor: index === 0 ? '#6366f1' : '#818cf8',
            borderRadius: index === 0 ? '6px' : '4px',
            border: index === 0 ? '2px solid #a5b4fc' : 'none',
          }}
        />
      ))}

      {/* Food */}
      <div
        className="absolute animate-pulse"
        style={{
          left: food.x * CELL_SIZE,
          top: food.y * CELL_SIZE,
          width: CELL_SIZE - 2,
          height: CELL_SIZE - 2,
          backgroundColor: '#ef4444',
          borderRadius: '50%',
          boxShadow: '0 0 10px #ef4444',
        }}
      />
    </div>
  )
}

export default GameBoard