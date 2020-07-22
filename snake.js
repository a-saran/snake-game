import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5;
const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;

export function update() {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function onSnake(food, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, idx) => {
    if (ignoreHead && idx === 0) return false;
    return equalPositions(food, segment);
  });
}

export function equalPositions(foodposition, segmentPosition) {
  return (
    foodposition.x === segmentPosition.x && foodposition.y === segmentPosition.y
  );
}

export function snakeInterSection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegments = 0;
}
