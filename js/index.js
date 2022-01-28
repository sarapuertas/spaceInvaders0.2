window.onload = () => {
    document.querySelector('#play').onclick = () => {
        startGame('start')
    }
    document.querySelector('#play-again').onclick = () => {
        startGame('gameover')
    }

}

function startGame(idButton) {
    const playGame = document.querySelector(`#${idButton}`)
    playGame.style.display = "none"
    game.init()
    document.querySelector('#game-data').style.display = 'flex'
}


