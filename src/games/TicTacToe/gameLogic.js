export const PLAYER_X = 'X'
export const PLAYER_O = 'O'

export const createEmptyBoard = () => Array(9).fill(null)

export const checkWinner = (board) => {
  const lines = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Col 1
    [1, 4, 7], // Col 2
    [2, 5, 8], // Col 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6], // Diagonal 2
  ]

  for (let line of lines) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line }
    }
  }

  return null
}

export const checkDraw = (board) => {
  return board.every((cell) => cell !== null)
}

export const getComputerMove = (board, difficulty = 'medium') => {
  const emptyCells = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((val) => val !== null)

  if (emptyCells.length === 0) return null

  if (difficulty === 'easy') {
    // Random move
    return emptyCells[Math.floor(Math.random() * emptyCells.length)]
  }

  if (difficulty === 'medium') {
    // 50% chance of smart move
    if (Math.random() > 0.5) {
      return emptyCells[Math.floor(Math.random() * emptyCells.length)]
    }
  }

  // Hard mode - Minimax algorithm
  return findBestMove(board)
}

const minimax = (board, depth, isMaximizing) => {
  const result = checkWinner(board)
  
  if (result) {
    return result.winner === PLAYER_O ? 10 - depth : depth - 10
  }
  
  if (checkDraw(board)) {
    return 0
  }

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = PLAYER_O
        const score = minimax(board, depth + 1, false)
        board[i] = null
        bestScore = Math.max(score, bestScore)
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = PLAYER_X
        const score = minimax(board, depth + 1, true)
        board[i] = null
        bestScore = Math.min(score, bestScore)
      }
    }
    return bestScore
  }
}

const findBestMove = (board) => {
  let bestScore = -Infinity
  let bestMove = null

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = PLAYER_O
      const score = minimax(board, 0, false)
      board[i] = null
      
      if (score > bestScore) {
        bestScore = score
        bestMove = i
      }
    }
  }

  return bestMove
}