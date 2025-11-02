import React, { useState, useEffect } from 'react'
import MemoryCard from './MemoryCard'
import useGameStore from '@store/gameStore'
import { createDeck, getPairCount, checkMatch, calculateScore } from './gameLogic'
import toast from 'react-hot-toast'

const Memory = ({ onGameEnd }) => {
  const { difficulty, incrementMoves, incrementScore, moves, time } = useGameStore()
  const pairCount = getPairCount(difficulty)
  
  const [cards, setCards] = useState(() => createDeck(pairCount))
  const [flippedCards, setFlippedCards] = useState([])
  const [canFlip, setCanFlip] = useState(true)

  useEffect(() => {
    if (flippedCards.length === 2) {
      setCanFlip(false)
      const [first, second] = flippedCards

      if (checkMatch(first, second)) {
        // Match found
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, isMatched: true, isFlipped: false }
                : card
            )
          )
          setFlippedCards([])
          setCanFlip(true)
          incrementScore(50)
          toast.success('Match found! 🎉')
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, isFlipped: false }
                : card
            )
          )
          setFlippedCards([])
          setCanFlip(true)
        }, 1000)
      }
      incrementMoves()
    }
  }, [flippedCards, incrementMoves, incrementScore])

  useEffect(() => {
    const matchedCount = cards.filter((card) => card.isMatched).length
    if (matchedCount === cards.length && cards.length > 0) {
      const finalScore = calculateScore(moves, time)
      incrementScore(finalScore)
      setTimeout(() => {
        onGameEnd(true)
      }, 500)
    }
  }, [cards, moves, time, onGameEnd, incrementScore])

  const handleCardClick = (clickedCard) => {
    if (!canFlip || clickedCard.isFlipped || clickedCard.isMatched) return

    const newCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    )
    setCards(newCards)
    setFlippedCards([...flippedCards, clickedCard])
  }

  const gridCols = pairCount <= 6 ? 'grid-cols-3' : pairCount <= 8 ? 'grid-cols-4' : 'grid-cols-6'

  return (
    <div className="py-8">
      <div className="mb-6 text-center">
        <p className="text-xl font-semibold mb-2">
          Matches Found: <span className="text-arena-accent">{cards.filter(c => c.isMatched).length / 2} / {pairCount}</span>
        </p>
        <p className="text-white/60 text-sm">Click cards to find matching pairs</p>
      </div>

      <div className={`grid ${gridCols} gap-4 max-w-4xl mx-auto`}>
        {cards.map((card) => (
          <MemoryCard
            key={card.id}
            card={card}
            onClick={handleCardClick}
            disabled={!canFlip}
          />
        ))}
      </div>
    </div>
  )
}

export default Memory