class Player {
  constructor(
    ctx,
    gameSizeW,
    gameSizeH,
    playerSizeW,
    playerSizeH,
    baseLinePlayer,
    keyPressed
  ) {
    this.ctx = ctx;
    this.gameSize = { w: gameSizeW, h: gameSizeH };
    this.playerPos = { x: gameSizeW / 2, y: gameSizeH - baseLinePlayer };
    this.playerSize = { w: playerSizeW, h: playerSizeH };

    this.baseLinePlayer = baseLinePlayer;
    this.keyPressed = keyPressed;

    this.image = new Image();
    this.image.src = "assets/img/ship_0004.png";
    this.bullets = [];
    this.setListeners();
  }
  draw() {
    this.ctx.drawImage(
      this.image,
      this.playerPos.x,
      this.playerPos.y,
      this.playerSize.w,
      this.playerSize.h
    );
    this.bullets.forEach((bullet) => bullet.draw("up"));
    this.clearBullets();
  }
  moveLeft() {
    this.playerPos.x - this.playerSize.h / 2 > 0
      ? (this.playerPos.x -= 20)
      : null;
  }
  moveRight() {
    this.playerPos.x + this.playerSize.h + 20 < this.gameSize.w
      ? (this.playerPos.x += 20)
      : null;
  }
  setListeners() {
    document.addEventListener("keydown", ({ key }) => {
      switch (key) {
        case this.keyPressed.LEFT:
          this.moveLeft();
          break;
        case this.keyPressed.RIGHT:
          this.moveRight();
          break;
      }
    });
    document.addEventListener("keyup", ({ code }) => {
      if (code === this.keyPressed.SHOOT) {
        this.shoot();
      }
    });
  }
  shoot() {
    this.bullets.push(
      new Bullets(
        this.ctx,
        this.playerPos.x,
        this.playerPos.y,
        this.playerSize.w,
        this.playerSize.h,
        this.baseLinePlayer
      )
    );
  }
  clearBullets() {
    this.bullets = this.bullets.filter((bullet) => bullet.bulletPosY >= 0);
  }
}
