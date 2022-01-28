class Enemies {
  constructor(
    ctx,
    gameSizeW,
    gameSizeH,
    enemySizeW,
    enemySizeH,
    enemyPosX,
    enemyPosY,
    enemyVelX,
    enemyVelY
  ) {
    this.ctx = ctx;
    this.gameSize = { w: gameSizeW, h: gameSizeH };
    this.enemySize = { w: enemySizeW, h: enemySizeH };
    this.enemyPos = { x: enemyPosX, y: enemyPosY };
    this.enemyVel = { x: enemyVelX, y: enemyVelY };

    this.image = new Image();
    this.image.src = "assets/img/ship_0002.png";
    this.bullets = [];
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.enemyPos.x,
      this.enemyPos.y,
      this.enemySize.w,
      this.enemySize.h
    );
    this.bullets.forEach((bullet) => bullet.draw("down"));
    this.clearBullets();
  }
  shoot() {
    this.bullets.push(
      new Bullets(
        this.ctx,
        this.enemyPos.x,
        this.enemyPos.y + 50,
        this.enemySize.w,
        this.enemySize.h,
        50
      )
    );
  }
  clearBullets() {
    this.bullets = this.bullets.filter((bullet) => bullet.bulletPosY >= 0);
  }
  move(direction, speed = 3) {
    if (direction == "left") {
      this.enemyPos.x -= speed;
    } else {
      this.enemyPos.x += speed;
    }
    this.enemyPos.y += speed / 30;
  }
}
