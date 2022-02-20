export default class Snake {
  constructor(x, y, tileSize, tileCount, velocity, initTailLength) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.tileCount = tileCount;
    this.velocity = velocity;
    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;
    this.madeFirstMove = false;

    document.addEventListener("keydown", this.#keyDown);

    this.appleEaten = 0;
    this.tailLength = initTailLength;
    this.snakeParts = [];

//     this.ice = new Image();
//     this.ice.src = "../images/ice.png";

    this.gulpSound = new Audio("sounds/gulp.mp3");

    this.MovingDirection = {
      up: 0,
      down: 1,
      left: 2,
      right: 3,
    };
  }

  draw(ctx, pause) {
    if (!pause) {
      // snake body
      ctx.fillStyle = "green";
      for (let i = 0; i < this.snakeParts.length; i++) {
        ctx.fillRect(
          this.snakeParts[i].x * this.tileCount,
          this.snakeParts[i].y * this.tileCount,
          this.tileSize,
          this.tileSize
        );
        // ctx.drawImage(
        //   this.ice,
        //   this.snakeParts[i].x * this.tileCount,
        //   this.snakeParts[i].y * this.tileCount,
        //   this.tileSize,
        //   this.tileSize
        // );
      }

      if (!this.hitWall()) {
        let snakePart = { x: 0, y: 0 };
        snakePart.x = this.x;
        snakePart.y = this.y;
        this.snakeParts.push(snakePart);
        if (this.snakeParts.length > this.tailLength) {
          this.snakeParts.shift();
        }
      }

      // snake head
      ctx.fillStyle = "orange";
      ctx.fillRect(
        this.x * this.tileCount,
        this.y * this.tileCount,
        this.tileSize,
        this.tileSize
      );
      //   ctx.drawImage(
      //     this.ice,
      //     this.x * this.tileCount,
      //     this.y * this.tileCount,
      //     this.tileSize,
      //     this.tileSize
      //   );

      this.#move();
    }
  }

  checkMadeFirstMove() {
    return this.madeFirstMove;
  }

  hitWall() {
    if (
      this.x < 0 ||
      this.x > this.tileCount - 1 ||
      this.y < 0 ||
      this.y > this.tileCount - 1
    ) {
      return true;
    }
  }

  eatSelf() {
    return this.snakeParts.some((part) => this.x == part.x && this.y == part.y);
  }

  reachTarget(target) {
    return this.appleEaten === target;
  }

  eat(apple, score) {
    if (this.x == apple.x && this.y == apple.y) {
      apple.x = Math.floor(Math.random() * this.tileCount);
      apple.y = Math.floor(Math.random() * this.tileCount);
      this.tailLength++;
      this.appleEaten++;
      score++;
      this.gulpSound.play();
    }
    return score;
  }

  #keyDown = (event) => {
    this.madeFirstMove = true;
    //up
    if (event.keyCode == 38) {
      if (this.currentMovingDirection != this.MovingDirection.down) {
        this.requestedMovingDirection = this.MovingDirection.up;
      }
    }
    //down
    if (event.keyCode == 40) {
      if (this.currentMovingDirection != this.MovingDirection.up) {
        this.requestedMovingDirection = this.MovingDirection.down;
      }
    }
    //left
    if (event.keyCode == 37) {
      if (this.currentMovingDirection != this.MovingDirection.right) {
        this.requestedMovingDirection = this.MovingDirection.left;
      }
    }
    //right
    if (event.keyCode == 39) {
      if (this.currentMovingDirection != this.MovingDirection.left) {
        this.requestedMovingDirection = this.MovingDirection.right;
      }
    }
  };

  #move() {
    this.currentMovingDirection = this.requestedMovingDirection;

    switch (this.currentMovingDirection) {
      case this.MovingDirection.up:
        this.y -= this.velocity;
        break;
      case this.MovingDirection.down:
        this.y += this.velocity;
        break;
      case this.MovingDirection.left:
        this.x -= this.velocity;
        break;
      case this.MovingDirection.right:
        this.x += this.velocity;
        break;
    }
  }
}
