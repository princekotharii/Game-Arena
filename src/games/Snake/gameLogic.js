export const GRID_SIZE = 20
export const CELL_SIZE = 20
export const INITIAL_SNAKE = [{ x: 10, y: 10 }]
export const INITIAL_DIRECTION = { x: 1, y: 0 }

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
}

export const generateFood = (snake) => {
  let food
  let isOnSnake

  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
    isOnSnake = snake.some((segment) => segment.x === food.x && segment.y === food.y)
  } while (isOnSnake)

  return food
}

export const moveSnake = (snake, direction) => {
  const head = { ...snake[0] }
  head.x += direction.x
  head.y += direction.y

  return [head, ...snake.slice(0, -1)]
}

export const checkCollision = (snake) => {
  const head = snake[0]

  // Wall collision
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    return true
  }

  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true
    }
  }

  return false
}

export const checkFoodCollision = (snake, food) => {
  const head = snake[0]
  return head.x === food.x && head.y === food.y
}

export const getSpeed = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 200
    case 'medium':
      return 150
    case 'hard':
      return 100
    default:
      return 150
  }
}