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

    addElements(cells){
        

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
                    this.damageArr.push(someEl)
                }else{
                    someEl.style.background = 'yellow'
                    this.foodArr.push(someEl)
                }
            }
        }
    }
}

class Player {
    constructor(){
        this.x = 0
        this.y = 0
        this.player = document.createElement('div')
        this.player.classList.add('player')
        this.createAction()
    }

    createAction(){
        document.body.addEventListener('keyup', (event) => {
            if(event.code ==='ArrowDown' && this.y < 9){
                this.y++
                this.player.style.top = (75 - 60) / 2 + (75 * this.y) + 'px'                   
                console.log(this.y)

            }else if(event.code === 'ArrowUp' && this.y > 0){
                this.y--
                this.player.style.top = (75 - 60) / 2 + (75 * this.y) + 'px'                   
                console.log(this.y)
            }

            if(event.code ==='ArrowRight' && this.x < 9){
                this.x++
                this.player.style.left = (75 - 60) / 2 + (75 * this.x) + 'px'   
                console.log(this.x)
            }
            else if(event.code === 'ArrowLeft' && this.x > 0){
                this.x--
                this.player.style.left = (75 - 60) / 2 + (75 * this.x) + 'px' 
                console.log(this.x)
            }
        })
    }

    mount(playField){
        playField.appendChild(this.player)
    }
}

class App {
    constructor(app){
        this.app = app
        this.playField = new PlayField()
        this.cells = new Cells()
        this.food = new Food()
        this.player = new Player()
        
        this.cellsArr = []
        this.pushCells()
        
        this.renderCells()

        this.createFood()

        this.renderPlayer()

        this.mount()
    }

    createFood(){
        this.food.addElements(this.cellsArr)
    }

    pushCells(){
        this.cells.createCells(this.cellsArr)
    }

    renderPlayer(){
        this.player.mount(this.playField.playField)
    }

    renderCells(){
        for(let i of this.cellsArr){
        this.playField.playField.appendChild(i)
        }
    }


    mount(){
        this.app.appendChild(this.playField.playField)
    }
}

const app = new App(document.getElementById('app'))

// console.log(app.cellsArr)