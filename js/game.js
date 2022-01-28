const game = {
  appName: "Space Invaders",
  author: "Sara Puertas y Diego Valdelvira",
  version: "1.0.0",
  license: undefined,
  gameSize: { w: undefined, h: undefined },
  enemy: {
    pos: { x: undefined, y: undefined },
    vel: { x: undefined, y: undefined },
  },
  ctx: undefined,
  canvas: undefined,

  //   Nivel suelo del jugador
  baseLinePlayer: 100,

  numberEnemies: 90,
  shootsVelocity: 30,
  FPS: 60,
  framesCounter: 0,
  //   Teclas para manejo
  keys: { SHOOT: "Space", LEFT: "ArrowLeft", RIGHT: "ArrowRight" },
  grids: undefined,
  background: undefined,
  player: undefined,
  playerPoints: undefined,
  framesCounter: 0,
  level: 1,
  gridSize: { rows: 3, columns: 15 },
  gridVelocity: { x: 10, y: 10 },
  gridSpeed: 3,
  obstacles: [],
  // AUDIOS
  audio: undefined,
  // Inicializo los métodos
  init() {
    this.audio = new Audio("./assets/sounds/music.mp3");
    //   Selecciono la etiqueta html
    this.canvas = document.querySelector("#canvas");
    // Defino el tipo de conexto
    this.ctx = this.canvas.getContext("2d");

    this.setSize();
    this.start(this.level);
  },

  // Definimos el tamaño del el objeto canvas al tamaño de la pantalla
  setSize() {
    this.gameSize = {
      w: window.innerWidth - 25,
      h: window.innerHeight - 50,
    };

    document.querySelector("#canvas").setAttribute("width", this.gameSize.w);
    document.querySelector("#canvas").setAttribute("height", this.gameSize.h);
  },

  // Metodo para inicio del juego
  start(level) {
    if (level < "4") {
      if (document.querySelector("#level span").innerText === "1")
        document.querySelector("#score span").innerText = "0";

      this.obstacles = [];
      this.reset();
      this.createEnemies();
      this.createObstacles();

      // Corazón del juego. Limpio pantalla, pinto y refresco
      this.interval = setInterval(() => {
        this.framesCounter > 5000
          ? (this.framesCounter = 0)
          : this.framesCounter++;

        this.cleanWindow();
        this.drawAll();

        if (this.grids.enemies.length > 0) {
          this.enemiesShoot();
        } else {
          null;
        }
        this.checkCollisionPlayerBullets();
        this.checkCollisionEnemiesBullets();
        this.checkArrayEnemies();
        this.checkCollisionObstacles();
        this.checkCollisionObstaclesEnemies();
      }, 10);
    } else {
      document.querySelector("#winner").style.display = "flex";
      document.querySelector("#winner").style.opacity = "1";
    }
  },

  //   Defino los valores iniciales del juego
  reset() {
    this.background = new Background(
      this.ctx,
      this.gameSize.w,
      this.gameSize.h,
      "assets/img/good_glouds.png"
    );
    this.player = new Player(
      this.ctx,
      this.gameSize.w,
      this.gameSize.h,
      50,
      50,
      this.baseLinePlayer,
      this.keys
    );
  },

  createEnemies() {
    // Instanciamos en el array un nuevo grid

    this.grids = new Grid(
      this.ctx,
      this.gameSize,
      50,
      this.gridSize,
      this.gridVelocity,
      this.baseLinePlayer,
      this.framesCounter
    );
  },

  //   Pintamos todo
  drawAll() {
    this.audio.play();
    this.audio.loop = true;
    this.background.draw();
    // Pintamos al jugador
    this.player.draw();
    this.grids.draw();
    this.grids.enemies.forEach((element) => {
      element.draw();
    });

    this.obstacles.forEach((elm) => {
      elm.draw();
    });
    this.grids.move(this.gridSpeed);
  },

  //   Método encargado de limpiar la pantalla
  cleanWindow() {
    this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h);
  },
  checkArrayEnemies() {
    if (this.grids.enemies.length === 0) {
      this.level++;
      document.querySelector("#level span").innerText++;
      this.gridSize.rows += 2;
      this.shootsVelocity -= 5;
      this.gridSpeed *= 1.2;
      this.gridSize.columns * (this.level * 0.3);
      clearInterval(this.interval);
      this.start(this.level);
    }
  },
  checkCollisionObstacles() {
    this.obstacles.forEach((obstacle, i, arrObstacle) => {
      this.player.bullets.forEach((bullet, j, arrBullets) => {
        if (
          bullet.bulletPosX <
          obstacle.obstaclesPos.x + obstacle.obstaclesSize.w &&
          bullet.bulletPosX > obstacle.obstaclesPos.x &&
          bullet.bulletPosY <
          obstacle.obstaclesPos.y + obstacle.obstaclesSize.h &&
          bullet.bulletPosY > obstacle.obstaclesPos.y
        ) {
          arrBullets.splice(j, 1);
          if (obstacle.damage === 0) {
            arrObstacle.splice(i, 1);
          } else {
            obstacle.damage--;
          }
        }
      });
    });
    this.obstacles.forEach((obstacle, i, arrObstacle) => {
      this.grids.enemies.forEach((enemy) => {
        enemy.bullets.forEach((bullet, j, arrBullets) => {
          if (
            bullet.bulletPosX <
            obstacle.obstaclesPos.x + obstacle.obstaclesSize.w &&
            bullet.bulletPosX > obstacle.obstaclesPos.x &&
            bullet.bulletPosY <
            obstacle.obstaclesPos.y + obstacle.obstaclesSize.h &&
            bullet.bulletPosY > obstacle.obstaclesPos.y
          ) {
            arrBullets.splice(j, 1);
            if (obstacle.damage === 0) {
              arrObstacle.splice(i, 1);
            } else {
              obstacle.damage--;
            }
          }
        });
      });
    });
  },
  checkCollisionEnemiesBullets() {
    this.grids.enemies.forEach((enemy) => {
      enemy.bullets.forEach((bullet, i, arrBullets) => {
        if (
          bullet.bulletPosX <
          this.player.playerPos.x + this.player.playerSize.w &&
          bullet.bulletPosX > this.player.playerPos.x &&
          bullet.bulletPosY <
          this.player.playerPos.y + this.player.playerSize.h &&
          bullet.bulletPosY + 30 > this.player.playerPos.y
        ) {
          this.looseLive();
          arrBullets.splice(i, 1);
        }
      });
    });
  },
  checkCollisionObstaclesEnemies() {
    this.obstacles.forEach((obstacle, i, arrObstacle) => {
      this.grids.enemies.forEach((enemy) => {
        if (
          enemy.enemyPos.x <
          obstacle.obstaclesPos.x + obstacle.obstaclesSize.w &&
          enemy.enemyPos.x + enemy.enemySize.w > obstacle.obstaclesPos.x &&
          enemy.enemyPos.y <
          obstacle.obstaclesPos.y + obstacle.obstaclesSize.h &&
          enemy.enemyPos.y + enemy.enemySize.h > obstacle.obstaclesPos.y
        ) {
          arrObstacle.splice(i, 1);
        }
      });
    });
  },
  checkCollisionPlayerBullets() {
    this.grids.enemies.forEach((elm, i, arrEnemies) => {
      this.player.bullets.forEach((bullet, j, arrBullets) => {
        if (
          bullet.bulletPosX < elm.enemyPos.x + elm.enemySize.w &&
          bullet.bulletPosX > elm.enemyPos.x &&
          bullet.bulletPosY < elm.enemyPos.y + elm.enemySize.h &&
          bullet.bulletPosY > elm.enemyPos.y
        ) {
          // PROBLEMA LOS MUERTOS NO SE VAN Y SIGUEN DISPARANDO
          arrBullets.splice(j, 1);
          elm.image.attributes[0].value = "assets/img/tile_0007.png";
          elm.dead = true;
          setTimeout(() => {
            arrEnemies.splice(i, 1);
            this.playerPoints();
          }, 120);
        }
      });

      if (elm.enemyPos.y >= this.gameSize.h - this.baseLinePlayer - 50) {
        this.gameOver();
      }
    });
  },
  playerPoints() {
    document.querySelector("#score span").innerText++;
  },
  looseLive() {
    const livesPlayer = document.querySelector("#lives span");
    if (livesPlayer.innerText === "1") {
      livesPlayer.innerText--;
      this.gameOver();
    } else {
      livesPlayer.innerText--;
    }
  },
  enemiesShoot() {
    let rndEnemy = Math.floor(Math.random() * this.grids.enemies.length);
    if (this.framesCounter % this.shootsVelocity === 0) {
      this.grids.enemies[rndEnemy].shoot();
    }
  },
  gameOver() {
    clearInterval(this.interval);
    this.obstacles = [];
    this.audio.pause();

    const popUp = document.querySelector("#gameover");
    const finalLevel = document.querySelector("#final-level");
    const finalScore = document.querySelector("#final-score");
    popUp.style.opacity = "1";
    finalLevel.innerText = `YOU HAVE REACH THE LEVEL ${this.level}`;
    finalScore.innerText = `YOUR SCORE IS ${document.querySelector("#score span").innerText
      }`;
    document.querySelector("#game-data").style.display = "none";
    document.querySelector("#gameover").style.display = "flex";

    document.querySelector("#lives span").innerText = "10";
    document.querySelector("#level span").innerText = "1";
  },
  createObstacles() {
    this.obstacles.push(
      new Obstacles(
        this.ctx,
        0,
        this.baseLinePlayer * 3.5,
        50,
        50,
        this.gameSize.w,
        this.gameSize.h
      ),
      new Obstacles(
        this.ctx,
        100,
        this.baseLinePlayer * 3.5,
        50,
        50,
        this.gameSize.w,
        this.gameSize.h
      ),
      new Obstacles(
        this.ctx,
        200,
        this.baseLinePlayer * 3.5,
        50,
        50,
        this.gameSize.w,
        this.gameSize.h
      ),
      new Obstacles(
        this.ctx,
        300,
        this.baseLinePlayer * 3.5,
        50,
        50,
        this.gameSize.w,
        this.gameSize.h
      )
    );
  },
};
