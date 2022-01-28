class Bullets {
  constructor(
    ctx,
    playerPosX,
    playerPosY,
    playerSizeW,
    playerSizeH,
    baseLinePlayer
  ) {
    this.ctx = ctx;
    this.bulletPosX = playerPosX + playerSizeW / 2;
    this.bulletPosY = playerPosY - playerSizeH / 2;
    this.playerPosX = playerPosX;
    this.playerPosY = playerPosY;

    this.playerSizeH = playerSizeH;
    this.bulletVelY = 8;

    this.image = new Image();
    this.image.src = "assets/img/tile_0012.png";
  }
  draw(direction) {
    this.ctx.drawImage(this.image, this.bulletPosX, this.bulletPosY, 20, 20);

    this.move(direction);
  }
  makeSound() {
    this.audioShoot.play();
  }
  move(direction) {
    if (direction === "up") {
      this.bulletPosY -= this.bulletVelY;
    } else {
      this.bulletPosY += this.bulletVelY;
    }
  }
}
