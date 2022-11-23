class Header {
    constructor() {
        this.header = document.createElement('div')
        this.header.classList.add('header')
    }
}

class ScoreBoard {
    constructor() {
        this.level = 1
        this.levelEl = document.createElement('div')
        this.levelEl.classList.add('level')
        this.levelEl.innerText = `Уровень : ${this.level}`

        this.score = 0
        this.scoreBoard = document.createElement('div')
        this.scoreBoard.classList.add('scoreBoard')
        this.scoreBoard.innerText = `Очков : ${this.score}`
    }
}

class PlayField {
    constructor() {
        this.playField = document.createElement('div')
        this.playField.classList.add('playField')
    }
}

class Cells {
    constructor() { }

    createCells(cells) {
        for (let i = 0; i < 100; i++) {
            const el = document.createElement('div')
            el.style.border = '1px solid white'
            el.style.width = '75px'
            el.style.height = '75px'
            el.style.borderRadius = '5px'
            el.style.background = 'rgba(125, 125, 125, .9)'
            el.style.display = 'flex'
            el.style.justifyContent = 'center'
            el.style.alignItems = 'center'
            el.style.boxSizing = 'border-box'
            cells.push(el)
        }
    }
}

class Food {
    constructor() { }

    addElements(emptyCell, cells, food, damage) {


        for (let i = 0; i < 100; i++) {
            const deltaRandom = Math.round(Math.random() * 100)

            const el = cells[i]

            if (i !== emptyCell && (i + deltaRandom) % 3 === 0) {
                const someEl = document.createElement('div')
                someEl.style.width = '35px'
                someEl.style.height = '35px'
                someEl.style.borderRadius = '50%'
                someEl.style.background = 'yellow'
                someEl.style.margin = '2px'
                el.appendChild(someEl)

                if ((i + deltaRandom) % 4 === 0) {
                    someEl.style.background = 'black'
                    damage.push(i)
                } else {
                    someEl.style.background = 'yellow'
                    food.push(i)
                }
            }
        }
    }
}

class Player {
    constructor() {
        this.lifes = 3
        this.lifesEl = document.createElement('div')
        this.lifesEl.classList.add('lifes')
        this.lifesEl.innerText = `Жизней : ${this.lifes}`

        this.x = 0
        this.y = 0
        this.player = document.createElement('div')
        this.player.classList.add('player')
    }

    mount(playField) {
        playField.appendChild(this.player)
    }
}

class App {
    cellsArr = []
    foodArr = []
    damageArr = []

    constructor(app) {
        this.app = app
        this.header = new Header()
        this.scoreBoard = new ScoreBoard()
        this.playField = new PlayField()
        this.cells = new Cells()
        this.food = new Food()
        this.player = new Player()

        this.addCells() //Добавление ячеек в массив cellsArr
        this.renderCells() // Отрисовка ячеек
        this.createFood() //Отрисовка еды в ячейках
        this.renderPlayer() // Отрисовка игрока
        this.eatFood() // Действие поедания еды

        this.mountHeader() // Отрисовка header
        this.mount() // Отрисовка приложения
    }

    createFood() {
        this.food.addElements(0, this.cellsArr, this.foodArr, this.damageArr)
    }

    addCells() {
        this.cells.createCells(this.cellsArr)
    }

    renderCells() {
        for (let i of this.cellsArr) {
            this.playField.playField.appendChild(i)
        }
    }

    renderPlayer() {
        this.player.mount(this.playField.playField)
    }

    eatFood() {
        document.body.addEventListener('keyup', (event) => {
            if (event.code === 'ArrowDown' && this.player.y < 9 && this.player.lifes > 0) {
                this.player.y++
                this.player.player.style.top = (75 - 60) / 2 + (75 * this.player.y) + 'px'

            } else if (event.code === 'ArrowUp' && this.player.y > 0 && this.player.lifes > 0) {
                this.player.y--
                this.player.player.style.top = (75 - 60) / 2 + (75 * this.player.y) + 'px'
            }

            if (event.code === 'ArrowRight' && this.player.x < 9 && this.player.lifes > 0) {
                this.player.x++
                this.player.player.style.left = (75 - 60) / 2 + (75 * this.player.x) + 'px'
            }
            else if (event.code === 'ArrowLeft' && this.player.x > 0 && this.player.lifes > 0) {
                this.player.x--
                this.player.player.style.left = (75 - 60) / 2 + (75 * this.player.x) + 'px'
            }

            const playerPosition = this.player.y * 10 + this.player.x

            for (let id in this.foodArr) {
                const i = this.foodArr[id]

                if (playerPosition === i) {
                    const foodEl = this.cellsArr[i]
                    foodEl.children[0].remove()
                    this.foodArr.splice(id, 1)

                    this.scoreBoard.score++
                    this.scoreBoard.scoreBoard.innerText = `Очков : ${this.scoreBoard.score}`
                }
            }

            for (let id in this.damageArr) {
                const i = this.damageArr[id]

                if (playerPosition === i) {
                    const damageEl = this.cellsArr[i]
                    damageEl.children[0].remove()
                    this.damageArr.splice(id, 1)

                    this.player.lifes--
                    this.player.lifesEl.innerText = `Жизней : ${this.player.lifes}`
                }
            }

            if (this.foodArr.length === 0) {

                while (this.damageArr.length > 0) {
                    const damageEl = this.cellsArr[this.damageArr.shift()]
                    damageEl.children[0].remove()
                }

                this.scoreBoard.level++
                this.scoreBoard.levelEl.innerText = `Уровень : ${this.scoreBoard.level}`

                this.food.addElements(playerPosition, this.cellsArr, this.foodArr, this.damageArr)
            }

            if (this.player.lifes === 0) {
                const popup = document.getElementById('popup')
                popup.style.display = 'flex'
                this.playField.playField.appendChild(popup)
            }

            const button = document.getElementById('new-game')
            button.addEventListener('click', () => {
                this.newGame()
            })
        })
    }

    newGame() {
        this.player.x = 0
        this.player.y = 0
        this.player.player.style.top = '7.5px'
        this.player.player.style.left = '7.5px'

        while (this.foodArr.length > 0) {
            const foodEl = this.cellsArr[this.foodArr.shift()]
            foodEl.children[0].remove()
        }

        while (this.damageArr.length > 0) {
            const damageEl = this.cellsArr[this.damageArr.shift()]
            damageEl.children[0].remove()
        }

        this.food.addElements(0, this.cellsArr, this.foodArr, this.damageArr)

        this.player.lifes = 3
        this.scoreBoard.score = 0
        this.scoreBoard.level = 1

        this.player.lifesEl.innerText = `Жизней : ${this.player.lifes}`
        this.scoreBoard.scoreBoard.innerText = `Очков : ${this.scoreBoard.score}`
        this.scoreBoard.levelEl.innerText = `Уровень : ${this.scoreBoard.level}`

        const popup = document.getElementById('popup')
        popup.style.display = 'none'
        this.playField.playField.appendChild(popup)
    }

    mountHeader() {
        this.header.header.appendChild(this.scoreBoard.scoreBoard)
        this.header.header.appendChild(this.scoreBoard.levelEl)
        this.header.header.appendChild(this.player.lifesEl)
        this.app.appendChild(this.header.header)
    }

    mount() {
        this.app.appendChild(this.playField.playField)
    }
}

const app = new App(document.getElementById('app'))