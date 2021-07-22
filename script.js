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
        calculateGameTable("ToUp")
    else if(keyPressed === 65) //A
            calculateGameTable("ToLeft")
    else if(keyPressed === 83) //S
        calculateGameTable("ToDown")
    else if(keyPressed === 68) //D
        calculateGameTable("ToRight")
}
// 87 W 83 S 65 A 68 D
function calculateGameTable(orientation){
    const boxColumnList = []
    const staticBordVal = (orientation == "ToUp" || orientation == "ToLeft" ? 0 : 3)
    if(orientation === "ToUp" || orientation === "ToDown"){
        //bordVal = (orientation == "ToUp" ? 0 : 3)
        for (const column of Array(4).keys()) {
            boxColumnList[column] = gameObjectsArray.filter(item => (item.coordX == column && item.coordY != staticBordVal))
        }
    }else if(orientation === "ToLeft" || orientation === "ToRight"){
        //bordVal = (orientation == "ToLeft" ? 0 : 3)
        for (const row of Array(4).keys()) {
            boxColumnList[row] = gameObjectsArray.filter(item => (item.coordX != staticBordVal && item.coordY == row ))
        }
    }
    moveTable()
    function moveTable(){
        //let boxDirectionRef = 0
        for (const variableBordVal of Array(4).keys()) {
            if (orientation === "ToDown" || orientation === "ToRight"){
                const reverseBoxColumnList = boxColumnList[variableBordVal].slice().reverse()
                //console.log(reverseBoxColumnList) // ====================
                reverseBoxColumnList.forEach(box => {
                    const boxDirectionRef = (orientation === "ToDown"  ? box.coordY+1 : box.coordX+1)
                    if (box.innerValue){
                        // console.log(box.coordX,box.coordY, "A borda esta em",variableBordVal,staticBordVal) // ====================
                        for (let i=boxDirectionRef; i<=3; i++){
                            //console.log("Minha posição",box.coordX,box.coordY,"Posições obeservada",box.coordX,i) // ====================
                            // orientation === "ToDown"  ? console.log("Minha posição",box.coordX,box.coordY,"Posições obeservada",box.coordX,i) : console.log("Minha posição",box.coordX,box.coordY,"Posições obeservada",i,box.coordY)  // ====================
                            orientation === "ToDown"  ? 
                            updateBoxStatus(box,box.coordX,i,variableBordVal,staticBordVal) : 
                            updateBoxStatus(box,i,box.coordY,staticBordVal,variableBordVal)
                            //updateBoxStatus(box,box.coordX,i,xBord,yBord)
                        }
                    }   
                })
            }else if (orientation === "ToUp" || orientation === "ToLeft"){
                //console.log(reverseBoxColumnList) // ====================
                boxColumnList[variableBordVal].forEach(box => {
                    const boxDirectionRef = (orientation === "ToUp" ? box.coordY-1 : box.coordX-1)
                    if (box.innerValue){
                        // console.log(box.coordX,box.coordY, "A borda esta em",variableBordVal,staticBordVal) // ====================
                        for (let i=boxDirectionRef; i>=0; i--){
                            //console.log("Minha posição",box.coordX,box.coordY,"Posições obeservada",box.coordX,i) // ====================
                            // orientation == "ToUp"  ? console.log("Minha posição",box.coordX,box.coordY,"Posições obeservada",box.coordX,i) : console.log("Minha posição",box.coordX,box.coordY,"Posições obeservada",i,box.coordY)  // ====================
                            orientation == "ToUp"   ? 
                            updateBoxStatus(box,box.coordX,i,variableBordVal,staticBordVal) : 
                            updateBoxStatus(box,i,box.coordY,staticBordVal,variableBordVal)
                            //updateBoxStatus(box,box.coordX,i,xBord,yBord)
                        }
                    }   
                })
            } 
        }
    }
    function updateBoxStatus(box,xTarget,yTarget,xBord,yBord){
        gameObjectsArray.forEach((cell,index) => {
            if(cell.coordX == xTarget && cell.coordY == yTarget)
                if (box.innerValue === cell.innerValue)
                    console.log("Merge as duas box")
                    // Limpa os dados de Box e soma com os de cell
                else if(cell.innerValue)
                    console.log("Move para a posição anterior a",cell.coordX,cell.coordY)
                else if(cell.coordX == xBord && cell.coordY == yBord){
                    console.log(box.coordX,box.coordY,"Foi para", xBord,yBord)
                    // Copia os dados de Box para Cell e limpa Box
            }
        })
    }
}

start()

for(let i=0;i<16;i++){
    console.log(gameObjectsArray[i].innerValue,gameObjectsArray[i].box,gameObjectsArray[i].coordX,gameObjectsArray[i].coordY)
}


/*
// ===================== Segunda ideia funcional ======================= //
function calculateGameTable(orientation){
    const boxColumnList = []
    let bordVal = 0
    if(orientation === "ToUp" || orientation === "ToDown"){
        bordVal = (orientation == "ToUp" ? 0 : 3)
        for (const column of Array(4).keys()) {
            boxColumnList[column] = gameObjectsArray.filter(item => (item.coordX == column && item.coordY != bordVal))
        }
    }else if(orientation === "ToLeft" || orientation === "ToRight"){
        bordVal = (orientation == "ToLeft" ? 0 : 3)
        for (const row of Array(4).keys()) {
            boxColumnList[row] = gameObjectsArray.filter(item => (item.coordX != bordVal && item.coordY == row ))
        }
    }
    moveInTable(bordVal)
    function moveInTable(yBord){
        for (const xBord of Array(4).keys()) {
            const reverseBoxColumnList = boxColumnList[xBord].slice().reverse()
            if (orientation === "ToDown" || orientation === "ToRight"){
                console.log(reverseBoxColumnList)
                reverseBoxColumnList.forEach(box => {
                    if (box.innerValue){
                        console.log(box.coordX,box.coordY, "A borda esta em",xBord,yBord)
                        for (let i=box.coordY+1; i<=3; i++){
                            console.log("Minha posição",box.coordX,box.coordY,"Posições obeservada",box.coordX,i)
                            updateBoxPosition(box,box.coordX,i,xBord,yBord)
                        }
                    }   
                })
            }        
        }
    }
    function updateBoxPosition(box,xTarget,yTarget,xBord,yBord){
        gameObjectsArray.forEach(cell => {
            if(cell.coordX == xTarget && cell.coordY == yTarget)
                if (box.innerValue === cell.innerValue){
                    console.log("Merge as box")
                }else if(cell.innerValue){
                    console.log("Move para a posição anterior a esta")
                }else if(cell.coordX == xBord && cell.coordY == yBord){
                    console.log(box.coordX,box.coordY,"Foi para", xBord,yBord)
                }
        })
    }
}
// ================= Primeira ideia funcional ==================== //
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
                    //console.log(box.box,box.coordX,box.coordY)
                    //console.log("Minha posição", box.coordX,box.coordY,"Preciso percorrer: ")
                    for (let column=box.coordY+1; column<=3; column++){
                        //console.log(box.coordX,column)
                        updateBoxStatus(box,column,n,3)
                    }
                }
            })
        }
    }else if(orientation === "ToRight"){
        const columnsBoxList = gameObjectsArray.filter(item => ((item.coordX != 3 && item.coordY == 3)))
        console.log(columnsBoxList)

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
// ============================================================== //
*/

/*
const elemento = getRandomInt(0,16)
boxes[elemento].classList.add("filled") M-- THIS HERE
*/