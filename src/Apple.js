export default class Apple {
  constructor(x, y, tileSize, tileCount) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.tileCount = tileCount;
    this.snow = new Image();
    this.snow.src = "../images/snow.png";
  }

  draw(ctx, pause) {
    if (!pause) {
      ctx.fillStyle = "red";
      ctx.fillRect(
        this.x * this.tileCount,
        this.y * this.tileCount,
        this.tileSize,
        this.tileSize
      );
      // ctx.drawImage(
      //   this.snow,
      //   this.x * this.tileCount,
      //   this.y * this.tileCount,
      //   this.tileSize,
      //   this.tileSize
      // );
    }
  }
}
