import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPosition() // { x: 10, y: 1 }
//how much the snake grows when he eats the food
//gains 1 segment for each piece of food
const EXPANSION_RATE = 1 

export function update() {
  //can eat the food only if he's on the top of it
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE)
    food = getRandomFoodPosition() // { x: 20, y: 10} //reposition the food
  }

}
  
export function draw(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

// place the food in a new position, but not on top of the snake
function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}