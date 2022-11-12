import { update as updateSnake, draw as drawSnake, SNAKE_SPEED,
getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost. Press ok to restart.')) {
      window.location = '/'
    }
    return
  }

  window.requestAnimationFrame(main)
  //divided 1000 because original is in ms   
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  //if the delta is less than 0.5s, than we don't need to move the snake   
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

  //   console.log('Render')
  //set last to current to have every time a new render time
  lastRenderTime = currentTime

  update()
  draw()
}

// command line to initiate the loop at the beginnning
window.requestAnimationFrame(main)

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  //to delete the previous pieces of the snake behind it 
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  // getSnakeHead() checks if the head of the snake is outside
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}