class Grid {
  constructor(
    ctx,
    gameSize,
    gridPos,
    gridSize,
    gridVelocity,
    baseLinePlayer,
    framesCounter
  ) {
    this.ctx = ctx;
    this.gridPos = {
      x: gridPos,
      y: gridPos,
    };
    this.gridSize = {
      rows: gridSize.rows,
      columns: gridSize.columns,
    };
    this.gridVelocity = {
      x: gridVelocity.x,
      y: gridVelocity.y,
    };
    this.gameSize = gameSize;
    this.baseLinePlayer = baseLinePlayer;
    this.framesCounter = framesCounter;
    this.enemies = [];

    this.direction = "right";

    // Creamos la matriz
    // Primer bucle define el número de columnas
    for (let i = 0; i < this.gridSize.columns; i++) {
      // Primer bucle define el número de filas
      for (let j = 0; j < this.gridSize.rows; j++) {
        //   Voy intanciando y metiendo en el array
        this.enemies.push(
          new Enemies(
            this.ctx,
            this.gameSize.w,
            this.gameSize.h,
            50,
            50,
            i * 60,
            j * 60,
            1,
            1
          )
        );
      }
    }
  }
  draw() {
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
  }

  move(speed) {
    this.enemies.forEach((enemy) => enemy.move(this.direction, speed));
    if (this.direction === "right") {
      this.gridPos.x += speed;
      this.gridPos.y += speed / 30;
    } else {
      this.gridPos.x -= speed;
      this.gridPos.y += speed / 30;
    }
    this.checkLimitDisplay();
  }
  checkLimitDisplay() {
    if (
      this.gridPos.x >=
      this.gameSize.w - this.gridSize.columns * 60
    ) {
      this.turn("left");
    } else if (
      this.gridPos.x <=
      this.gridSize.columns + 50
    ) {
      this.turn("right");
    }
  }
  turn(direction) {
    this.direction = direction;
  }
}
