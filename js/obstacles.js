class Obstacles {
    constructor(ctx, obstaclesPosX, obstaclesPosY, obtaclesSizeW, osbstaclesSizeH, gameSizeX, gameSizeY, damage = 5) {
        this.ctx = ctx
        this.obstaclesPos = { x: obstaclesPosX, y: obstaclesPosY }
        this.obstaclesSize = { w: obtaclesSizeW, h: osbstaclesSizeH }
        this.obstaclesVel = 5
        this.gameSize = { w: gameSizeX, h: gameSizeY }
        this.damage = damage
        this.init()
    }
    init() {
        this.image = new Image()
        this.image.src = 'assets/img/obstaclePlane.png'
    }
    move() {
        this.obstaclesPos.x += this.obstaclesVel
        this.checkLimitDisplay()
    }
    checkLimitDisplay() {
        if (this.obstaclesPos.x >= this.gameSize.w - this.obstaclesSize.w || this.obstaclesPos.x <= 0) {
            this.turn()
        }
    }

    turn() {
        this.obstaclesVel *= -1
    }
    draw() {
        this.ctx.drawImage(
            this.image,
            this.obstaclesPos.x,
            this.obstaclesPos.y,
            this.obstaclesSize.w,
            this.obstaclesSize.h
        )
        this.move()
    }
}