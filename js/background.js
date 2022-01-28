class Background {
  constructor(ctx, backgroundW, backgroundH, imgSource) {
    this.ctx = ctx;
    this.backgroundW = backgroundW;
    this.backgroundH = backgroundH;
    this.backgroundX = 0;
    this.backgroundY = 0;
    this.image = new Image();
    this.image.src = imgSource;
    this.backgroundVelY = 1;
  }
  draw() {
    this.ctx.drawImage(
      this.image,
      this.backgroundX,
      this.backgroundY,
      this.backgroundW,
      this.backgroundH
    );
    this.ctx.drawImage(
      this.image,
      this.backgroundX,
      this.backgroundY - this.backgroundH,
      this.backgroundW,
      this.backgroundH
    );
    this.move();
  }

  move() {
    if (this.backgroundY >= this.backgroundH) {
      this.backgroundY = 0;
    }
    this.backgroundY += this.backgroundVelY;
  }
}
