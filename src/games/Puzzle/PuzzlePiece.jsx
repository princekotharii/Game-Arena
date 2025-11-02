import React from 'react'
import { cn } from '@utils/cn'
import { getTileColor } from './gameLogic'

const PuzzlePiece = ({ value }) => {
  return (
    <div
      className={cn(
        'rounded-lg flex items-center justify-center font-bold transition-all duration-200',
        'transform hover:scale-105',
        value === 0 ? 'bg-arena-light' : getTileColor(value),
        value >= 8 && 'text-white',
        value > 0 && 'animate-slide-up'
      )}
      style={{
        fontSize: value >= 1024 ? '1.5rem' : value >= 128 ? '1.75rem' : '2rem',
      }}
    >
      {value > 0 && value}
    </div>
  )
}

export default PuzzlePiece