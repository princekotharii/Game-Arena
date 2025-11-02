import React, { useState, useEffect } from 'react'
import { Users, Cpu } from 'lucide-react'
import Button from '@components/common/Button'
import Badge from '@components/common/Badge'
import Board from './Board'
import useGameStore from '@store/gameStore'
import { 
  createEmptyBoard, 
  checkWinner, 
  checkDraw, 
  getComputerMove,
  PLAYER_X,
  PLAYER_O 
} from './gameLogic'
import toast from 'react-hot-toast'

const TicTacToe = ({ onGameEnd }) => {
  const [board, setBoard] = useState(createEmptyBoard())
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_X)
  const [gameMode, setGameMode] = useState(null) // 'ai' or 'multiplayer'
  const [winningLine, setWinningLine] = useState(null)
  const { difficulty, incrementMoves, incrementScore } = useGameStore()

  useEffect(() => {
    if (gameMode === 'ai' && currentPlayer === PLAYER_O && !winningLine) {
      const timer = setTimeout(() => {
        makeComputerMove()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [currentPlayer, gameMode, winningLine])

  const handleCellClick = (index) => {
    if (board[index] || winningLine) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)
    incrementMoves()

    const result = checkWinner(newBoard)
    if (result) {
      setWinningLine(result.line)
      const score = difficulty === 'easy' ? 100 : difficulty === 'medium' ? 200 : 300
      incrementScore(score)
      
      setTimeout(() => {
        onGameEnd(currentPlayer === PLAYER_X)
      }, 1000)
      return
    }

    if (checkDraw(newBoard)) {
      toast.info("It's a draw!")
      setTimeout(() => {
        onGameEnd(false)
      }, 1000)
      return
    }

    setCurrentPlayer(currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X)
  }

  const makeComputerMove = () => {
    const move = getComputerMove(board, difficulty)
    if (move !== null) {
      handleCellClick(move)
    }
  }

  const handleModeSelect = (mode) => {
    setGameMode(mode)
    setBoard(createEmptyBoard())
    setCurrentPlayer(PLAYER_X)
    setWinningLine(null)
  }

  if (!gameMode) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-8">Choose Game Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <button
            onClick={() => handleModeSelect('ai')}
            className="glass-effect p-8 rounded-xl hover:scale-105 transition-all"
          >
            <Cpu size={48} className="mx-auto mb-4 text-arena-accent" />
            <h3 className="text-xl font-bold mb-2">Play vs AI</h3>
            <p className="text-white/60">Challenge the computer</p>
          </button>
          <button
            onClick={() => handleModeSelect('multiplayer')}
            className="glass-effect p-8 rounded-xl hover:scale-105 transition-all"
          >
            <Users size={48} className="mx-auto mb-4 text-arena-accent" />
            <h3 className="text-xl font-bold mb-2">2 Player</h3>
            <p className="text-white/60">Play with a friend</p>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Badge variant={currentPlayer === PLAYER_X ? 'primary' : 'default'}>
            Player X {gameMode === 'multiplayer' && '(You)'}
          </Badge>
          <span className="text-white/60">VS</span>
          <Badge variant={currentPlayer === PLAYER_O ? 'primary' : 'default'}>
            Player O {gameMode === 'ai' && '(AI)'}
          </Badge>
        </div>
        <Button variant="secondary" onClick={() => setGameMode(null)}>
          Change Mode
        </Button>
      </div>

      <div className="mb-6 text-center">
        <p className="text-xl font-semibold">
          {winningLine ? (
            <span className="text-green-500">
              {currentPlayer} Wins! 🎉
            </span>
          ) : (
            <>
              Current Turn: <span className="text-arena-accent">{currentPlayer}</span>
            </>
          )}
        </p>
      </div>

      <Board
        board={board}
        onCellClick={handleCellClick}
        winningLine={winningLine}
        disabled={gameMode === 'ai' && currentPlayer === PLAYER_O}
      />
    </div>
  )
}

export default TicTacToe