import React from 'react'
import { cn } from '@utils/cn'

const Board = ({ board, onCellClick, winningLine, disabled }) => {
  return (
    <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
      {board.map((cell, index) => {
        const isWinningCell = winningLine?.includes(index)
        
        return (
          <button
            key={index}
            onClick={() => onCellClick(index)}
            disabled={disabled || cell !== null}
            className={cn(
              'aspect-square rounded-xl glass-effect text-5xl font-bold',
              'transition-all duration-300 hover:scale-105 active:scale-95',
              'disabled:cursor-not-allowed disabled:hover:scale-100',
              isWinningCell && 'bg-arena-accent/20 ring-2 ring-arena-accent',
              cell === 'X' && 'text-blue-400',
              cell === 'O' && 'text-red-400'
            )}
          >
            {cell}
          </button>
        )
      })}
    </div>
  )
}

export default Board