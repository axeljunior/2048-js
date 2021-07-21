let gameObjectsArray=[]

function start(){
    buildGameObjects()

    document.addEventListener('keydown', catchEvent);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function buildGameObjects(){
    const boxes = document.getElementsByClassName("box")
    let cont=0
    function gameObjectFactory(cont,i,j){
        let test = 0
        if(i===3 && j===0 || i==0 && j===1 || i==1 && j===3 || i==3 && j===3) //
            test=2;//
        else if (i==3 && j===2)
            test=4
        return {
        box: boxes[cont],
        innerValue: test,
        coordX: i,
        coordY: j
        }
    }

    for(let j=0;j<4;j++){
        for(let i=0;i<4;i++){
            gameObjectsArray.push(gameObjectFactory(cont,i,j))
            cont++;
        }
    }
    return gameObjectsArray
}
function catchEvent(event){
    const keyPressed = event.keyCode
    if(keyPressed === 87 )// W
        updateGameTable("ToUp")
    if(keyPressed === 83) //S
        updateGameTable("ToDown")
}
// 87 W 83 S 65 A 68 D
function updateGameTable(orientation){
    if(orientation === "ToUp"){
        for (const n of Array(4).keys()) {
            gameObjectsArray.forEach(element => {
                if((element.coordX == n && element.coordY != 0) && element.innerValue){
                    console.log(element.box,element.coordX,element.coordY,)
                    console.log("Minha posição", element.coordX,element.coordY,"Preciso percorrer: ")
                    for (let column=element.coordY-1; column>=0; column--)
                        console.log(element.coordX,column)
                }
            })
        }
    }else if(orientation === "ToDown"){
        for (const n of Array(4).keys()) {
            gameObjectsArray.slice().reverse().forEach(box => {
                if((box.coordX == n && box.coordY != 3) && box.innerValue){
                    console.log(box.box,box.coordX,box.coordY)
                    console.log("Minha posição", box.coordX,box.coordY,"Preciso percorrer: ")
                    for (let column=box.coordY+1; column<=3; column++){
                        console.log(box.coordX,column)
                        updateBoxStatus(box,column,n,3)
                    }
                }
            })
        }
    }
    function updateBoxStatus(box,positionInColumn,xBord,yBord){
        gameObjectsArray.forEach(element => {
            if(element.coordX == box.coordX && element.coordY == positionInColumn){
                if (box.innerValue === element.innerValue){
                    console.log("Merge as box")
                }else if(element.innerValue){
                    console.log("Move para a posição anterior a esta")
                }else if(element.coordX == xBord && positionInColumn == yBord){
                    console.log(box.coordX,box.coordY,"Foi para", xBord,yBord)
                }
            }
        })
    }
}

start()

for(let i=0;i<16;i++){
    console.log(gameObjectsArray[i].innerValue,gameObjectsArray[i].box,gameObjectsArray[i].coordX,gameObjectsArray[i].coordY)
}



/*
let cont=0
for(let i=0;i<4;i++){
    for(let j=0;j<4;j++){
        gameObjectArray.push(gameObjectFactory(cont,i,j))
        cont++;
    }
}

const boxes = document.getElementsByClassName("box")
for(let i=0;i<16;i++){
    console.log(boxes[i])
}
const elemento = getRandomInt(0,16)
boxes[elemento].classList.add("filled") M-- THIS HERE
*/


/*
if (index === 4)
(filho as HTMLElement).classList.add("selected")
else
(filho as HTMLElement).classList.remove("selected")
*/