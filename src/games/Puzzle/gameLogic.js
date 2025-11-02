export const GRID_SIZE = 4

export const createEmptyGrid = () => {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0))
}

export const initializeGrid = () => {
  const grid = createEmptyGrid()
  addRandomTile(grid)
  addRandomTile(grid)
  return grid
}

export const addRandomTile = (grid) => {
  const emptyCells = []
  
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === 0) {
        emptyCells.push({ row: i, col: j })
      }
    }
  }

  if (emptyCells.length > 0) {
    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    grid[row][col] = Math.random() < 0.9 ? 2 : 4
  }
}

const slideRow = (row) => {
  // Remove zeros
  let arr = row.filter(val => val !== 0)
  
  // Merge adjacent equal numbers
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2
      arr[i + 1] = 0
    }
  }
  
  // Remove zeros again
  arr = arr.filter(val => val !== 0)
  
  // Add zeros at the end
  while (arr.length < GRID_SIZE) {
    arr.push(0)
  }
  
  return arr
}

export const moveLeft = (grid) => {
  const newGrid = grid.map(row => slideRow([...row]))
  return newGrid
}

export const moveRight = (grid) => {
  const newGrid = grid.map(row => {
    const reversed = [...row].reverse()
    const slid = slideRow(reversed)
    return slid.reverse()
  })
  return newGrid
}

export const moveUp = (grid) => {
  const newGrid = createEmptyGrid()
  
  for (let col = 0; col < GRID_SIZE; col++) {
    const column = grid.map(row => row[col])
    const slid = slideRow(column)
    
    for (let row = 0; row < GRID_SIZE; row++) {
      newGrid[row][col] = slid[row]
    }
  }
  
  return newGrid
}

export const moveDown = (grid) => {
  const newGrid = createEmptyGrid()
  
  for (let col = 0; col < GRID_SIZE; col++) {
    const column = grid.map(row => row[col]).reverse()
    const slid = slideRow(column).reverse()
    
    for (let row = 0; row < GRID_SIZE; row++) {
      newGrid[row][col] = slid[row]
    }
  }
  
  return newGrid
}

export const hasGridChanged = (oldGrid, newGrid) => {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (oldGrid[i][j] !== newGrid[i][j]) {
        return true
      }
    }
  }
  return false
}

export const hasWon = (grid) => {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === 2048) {
        return true
      }
    }
  }
  return false
}

export const canMove = (grid) => {
  // Check for empty cells
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === 0) {
        return true
      }
    }
  }

  // Check for possible merges
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const current = grid[i][j]
      
      // Check right
      if (j < GRID_SIZE - 1 && grid[i][j + 1] === current) {
        return true
      }
      
      // Check down
      if (i < GRID_SIZE - 1 && grid[i + 1][j] === current) {
        return true
      }
    }
  }

  return false
}

export const calculateScore = (grid) => {
  let score = 0
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      score += grid[i][j]
    }
  }
  return score
}

export const getTileColor = (value) => {
  const colors = {
    2: 'bg-slate-700',
    4: 'bg-slate-600',
    8: 'bg-orange-600',
    16: 'bg-orange-500',
    32: 'bg-red-600',
    64: 'bg-red-500',
    128: 'bg-yellow-600',
    256: 'bg-yellow-500',
    512: 'bg-yellow-400',
    1024: 'bg-emerald-600',
    2048: 'bg-emerald-500',
  }
  return colors[value] || 'bg-purple-600'
}