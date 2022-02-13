import Snake from "./Snake.js";
import Apple from "./Apple.js";

const canvas = document.getElementById("gameCanvas");
canvas.width = 400;
canvas.height = 400;
const ctx = canvas.getContext("2d");

const tileCount = 20;
const tileSize = canvas.width / tileCount - 2;
const velocity = 1;
const target = 100;
const gameSpeed = 10;
const initTailLength = 0;

let score = 0;
let gameWin = false;
let gameOver = false;
const gameWinSound = new Audio("../sounds/gameWin.wav");
const gameOverSound = new Audio("../sounds/gameOver.wav");

const snake = new Snake(
  tileCount / 2,
  tileCount / 2,
  tileSize,
  tileCount,
  velocity,
  initTailLength
);

const apple = new Apple(
  Math.floor(Math.random() * tileCount),
  Math.floor(Math.random() * tileCount),
  tileSize,
  tileCount
);

clearScreen();
apple.draw(ctx, false);
snake.draw(ctx, false);

gameLoop();

function gameLoop() {
  document.getElementById("score").innerHTML = score;
  if (snake.checkMadeFirstMove()) {
    if (gameOver || gameWin) {
      drawGameEnd();
      return;
    }

    clearScreen();
    score = snake.eat(apple, score);
    checkGameWin();
    apple.draw(ctx, pause());
    snake.draw(ctx, pause());
    checkGameOver();
  }

  setTimeout(gameLoop, 1000 / gameSpeed);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();
    if (gameOver) {
      gameOverSound.play();
    }
  }
  return gameOver;
}

function checkGameWin() {
  if (!gameWin) {
    gameWin = isGameWin();
    if (gameWin) {
      gameWinSound.play();
    }
  }
  return gameWin;
}

function isGameOver() {
  return snake.hitWall() || snake.eatSelf();
}

function isGameWin() {
  return snake.reachTarget(target);
}

function pause() {
  return !snake.checkMadeFirstMove() || gameOver || gameWin;
}

function drawGameEnd() {
  clearScreen();
  let text = "";
  if (gameWin) {
    text = "  You Win!";
  } else if (gameOver) {
    text = "Game Over";
    apple.draw(ctx, false);
  }
  snake.draw(ctx, false);

  ctx.font = "50px Verdana";
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0", "magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "red");
  ctx.fillStyle = gradient;
  ctx.fillText(text, canvas.width / 6.5, canvas.height / 2);
}
