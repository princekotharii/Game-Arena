export const CARD_EMOJIS = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎬', '🎤', '🎧', '🎸', '🎹', '🎺', '🎻', '🏀', '⚽', '🏈', '⚾', '🎾', '🏐', '🏓']

export const createDeck = (pairCount = 8) => {
  const selectedEmojis = CARD_EMOJIS.slice(0, pairCount)
  const pairs = [...selectedEmojis, ...selectedEmojis]
  
  // Shuffle the deck
  return pairs
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5)
}

export const getPairCount = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 6
    case 'medium':
      return 8
    case 'hard':
      return 12
    default:
      return 8
  }
}

export const checkMatch = (card1, card2) => {
  return card1.emoji === card2.emoji
}

export const calculateScore = (moves, timeInSeconds) => {
  const baseScore = 1000
  const movePenalty = moves * 5
  const timePenalty = Math.floor(timeInSeconds / 2)
  return Math.max(100, baseScore - movePenalty - timePenalty)
}