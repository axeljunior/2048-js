let gameObjectsArray=[]

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function buildGameObjects(){
    let cont=0
    const boxes = document.getElementsByClassName("box")

    function gameObjectFactory(cont,i,j){
        return {
        box: boxes[cont],
        coordX: i,
        coordY: j
        }
    }

    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            gameObjectsArray.push(gameObjectFactory(cont,i,j))
            cont++;
        }
    }

    return gameObjectsArray
}

buildGameObjects()
for(let i=0;i<16;i++){
    console.log(gameObjectsArray[i].box,gameObjectsArray[i].coordX,gameObjectsArray[i].coordY)
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
boxes[elemento].classList.add("filled")
*/


/*
if (index === 4)
(filho as HTMLElement).classList.add("selected")
else
(filho as HTMLElement).classList.remove("selected")
*/