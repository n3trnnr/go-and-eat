class Element {
    constructor(){}
}

class Header {
    constructor(){
        this.header = document.createElement('div')
        this.header.classList.add('header')
    }


}

class ScoreBoard extends Header {
    constructor(){
        super()
        this.scoreBoard = document.createElement('div')
        this.scoreBoard.classList.add('scoreBoard')
    }
}

class PlayField{
    constructor(){
        this.playField = document.createElement('div')
        this.playField.classList.add('playField')
    }
}

class Cells {
    constructor(){}

    createCells(cells){
        for(let i = 0; i < 100; i++){
            const el = document.createElement('div')
            el.style.border = '1px solid white'
            el.style.width = '75px'
            el.style.height = '75px'
            el.style.background = 'blue'
            el.style.display = 'flex'
            el.style.justifyContent = 'center'
            el.style.alignItems = 'center'
            el.style.boxSizing = 'border-box'
            cells.push(el) //Добавление элементов в this.cellsArr
        }
    }   
}

class Food {
    constructor(){
        this.foodArr = []
        this.damageArr = []
    }

    addElements(cells, damage = [], food = []){
        

        for(let i = 0; i < 100; i++){
            const deltaRandom = Math.round (Math.random () * 100) 
            
            const el = cells[i]

            if((i + deltaRandom) % 3 === 0){
                const someEl = document.createElement('div')
                someEl.style.width = '50px'
                someEl.style.height = '50px'
                someEl.style.borderRadius = '50%'
                someEl.style.background = 'yellow'
                someEl.style.margin = '2px'
                el.appendChild(someEl)

                if((i + deltaRandom) % 4 === 0){
                    someEl.style.background = 'black'
                    food.push(someEl)
                }else{
                    someEl.style.background = 'yellow'
                    damage.push(someEl)
                }
            }
        }
    }
}

class Player {
    constructor(){
        this.lifes = 3
        this.x = 0
        this.y = 0
        this.player = document.createElement('div')
        this.player.classList.add('player')
        this.createAction()
    }

    createAction(){
        document.body.addEventListener('keyup', (event) => {
            if(event.code ==='ArrowDown' && this.y < 9 && this.lifes > 0){
                this.y++
                this.player.style.top = (75 - 60) / 2 + (75 * this.y) + 'px'                   
                // console.log(this.y)

            }else if(event.code === 'ArrowUp' && this.y > 0 && this.lifes > 0){
                this.y--
                this.player.style.top = (75 - 60) / 2 + (75 * this.y) + 'px'                   
                // console.log(this.y)
            }

            if(event.code ==='ArrowRight' && this.x < 9 && this.lifes > 0){
                this.x++
                this.player.style.left = (75 - 60) / 2 + (75 * this.x) + 'px'   
                // console.log(this.x)
            }
            else if(event.code === 'ArrowLeft' && this.x > 0 && this.lifes > 0){
                this.x--
                this.player.style.left = (75 - 60) / 2 + (75 * this.x) + 'px' 
                // console.log(this.x)   
            }
        })
    }

    mount(playField){
        playField.appendChild(this.player)
    }
}

class App {
    cellsArr = []
    foodArr = []
    damageArr = []

    constructor(app){
        this.app = app
        this.header = new Header()
        this.playField = new PlayField()
        this.cells = new Cells()
        this.food = new Food()
        this.player = new Player()

        this.addCellsFoodDamage() //Добавление ячеек в массив cellsArr
        this.renderCells() // Отрисовка ячеек
        this.createFood() //Отрисовка еды в ячейках
        this.renderPlayer() // Отрисовка игрока
        this.eatFood()

        this.mountHeader() // Отрисовка header
        this.mount() // Отрисовка приложения
    }



    createFood(){
        this.food.addElements(this.cellsArr, this.foodArr, this.damageArr)
    }

    addCellsFoodDamage(){
        this.cells.createCells(this.cellsArr)
    }
    
    renderCells(){
        for(let i of this.cellsArr){
        this.playField.playField.appendChild(i)
        }
    }

    renderPlayer(){
        this.player.mount(this.playField.playField)
    }

    eatFood(){
        // console.log(this.player.y)   
        const playerPosition = this.player.y * 10 + this.player.x
        

        // let x = 0
        // let y = 0
        // this.player.createAction(x, y)
        // const playerPosition = y * 10 + x
        // console.log(y,x)

            //Сравнение координаты (одного числа) и массива (множеста чисел) координат food невозможна без ЦИКЛА!!!
    for(let id in this.foodArr){
        //i = название элементов [индексы элементов]
        const i = this.foodArr[id]

        if(playerPosition === i){//Если позиция player (число) === номеру (числу) ячейки то ==>
            
            // Создание переменной для хранения div (ячейки поля-сетки), [i] - массив индексов food (располагающихся на поле из 100 ячеек) 
            const foodIndexEl = this.cellsArr[i]//все ячейки поля [индекс конкретных ячеек] 
            foodIndexEl.children[0].remove() //получение (удаление) доступа к ребенку (food) в div (ячейки - elements) / Путь: div ==> children ==> 0 (0 - индекс внутри div)
            // console.log(foodIndexEl)

            // score++ //Если съедается элемент то score + 1
            // scoreBoard.innerText = `${score} очков` // добавление значения score с учетом изменения score + 1
            // // console.log(score)

            //Удаление индекса в массиве. Метод splice удаляет (заменяет один элемент на другой. Можно заменить на пустоту) индекс еды. Используется вместе удаления child.
            this.foodArr.splice (id, 1)//id - цель, перебранные ключи из foodIndexArr, 1 - замена первого элемента в массиве.
            // console.log(foodIndexArr)
            }
        }
    }

    mountHeader(){
        this.app.appendChild(this.header.header)
    }

    mount(){
        this.app.appendChild(this.playField.playField)
    }
}

const app = new App(document.getElementById('app'))

// console.log('food:', app.foodArr, 'damage:', app.damageArr)