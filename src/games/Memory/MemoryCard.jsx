import React from 'react'
import { cn } from '@utils/cn'

const MemoryCard = ({ card, onClick, disabled }) => {
  return (
    <button
      onClick={() => onClick(card)}
      disabled={disabled || card.isMatched || card.isFlipped}
      className={cn(
        'aspect-square rounded-xl transition-all duration-300',
        'glass-effect hover:scale-105 active:scale-95',
        'disabled:cursor-not-allowed disabled:hover:scale-100',
        'relative preserve-3d',
        card.isFlipped || card.isMatched ? 'flipped' : ''
      )}
      style={{
        transformStyle: 'preserve-3d',
        transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0)',
      }}
    >
      {/* Card Back */}
      <div
        className={cn(
          'absolute inset-0 rounded-xl flex items-center justify-center',
          'bg-gradient-to-br from-arena-accent to-primary-500',
          'backface-hidden'
        )}
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div className="text-4xl">❓</div>
      </div>

      {/* Card Front */}
      <div
        className={cn(
          'absolute inset-0 rounded-xl flex items-center justify-center',
          card.isMatched ? 'bg-green-600/20' : 'bg-arena-light',
          'backface-hidden'
        )}
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      >
        <div className="text-5xl">{card.emoji}</div>
      </div>
    </button>
  )
}

export default MemoryCard