let gameObjectsArray=[]

function start(){
    gameObjectsArray=[]
    buildGameObjects()
    game()
}

function game(){
    document.addEventListener('keydown', catchEvent)
}

function catchEvent(event){
    const keyPressed = event.keyCode
    if(keyPressed === 87 || 65 || 83 || 68 ){
        calculate_game_table(keyPressed)
        updateHTML()
    }
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

function updateHTML(){
    for(let i=0;i<16;i++){
        if(gameObjectsArray[i].innerValue){
            gameObjectsArray[i].box.innerHTML = gameObjectsArray[i].innerValue
            gameObjectsArray[i].box.classList.add("filled")
        }
        else{
            gameObjectsArray[i].box.innerHTML = 0
            gameObjectsArray[i].box.classList.remove("filled")
        }
    }
}
function calculate_game_table(orientation){
    function filter_columns_rows(){
        if(orientation === "ToUp" || orientation === "ToDown"){
            for (const column of Array(4).keys()) {
                boxList[column] = gameObjectsArray.filter(item => (item.coordX == column && item.coordY != staticBoardVal))
            }
        }else if(orientation === "ToLeft" || orientation === "ToRight"){
            for (const row of Array(4).keys()) {
                boxList[row] = gameObjectsArray.filter(item => (item.coordX != staticBoardVal && item.coordY == row ))
            }
        }
        calculate_boxes_movement()
    }
    function calculate_boxes_movement(){
        for (const variableBoardVal of Array(4).keys()) {
            if (orientation === "ToDown" || orientation === "ToRight"){
                const reverseBoxList = boxList[variableBoardVal].slice().reverse()
                reverseBoxList.forEach(box => {
                    const boxDirectionRef = (orientation === "ToDown"  ? box.coordY+1 : box.coordX+1)
                    if (box.innerValue){
                        for (let i=boxDirectionRef; i<=3; i++){
                            orientation === "ToDown"  ? 
                            update_box_status(box,box.coordX,i,variableBoardVal,staticBoardVal) : 
                            update_box_status(box,i,box.coordY,staticBoardVal,variableBoardVal)
                        }
                    }   
                })
            }else if (orientation === "ToUp" || orientation === "ToLeft"){
                const regularBoxList = boxList[variableBoardVal]
                regularBoxList.forEach(box => {
                    const boxDirectionRef = (orientation === "ToUp" ? box.coordY-1 : box.coordX-1)
                    if (box.innerValue){
                        for (let i=boxDirectionRef; i>=0; i--){
                            orientation === "ToUp"   ? 
                            update_box_status(box,box.coordX,i,variableBoardVal,staticBoardVal) : 
                            update_box_status(box,i,box.coordY,staticBoardVal,variableBoardVal)
                        }
                    }   
                })
            } 
        }
    }
    function update_box_status(box,xTarget,yTarget,xBoard,yBoard){
        for (const cell of gameObjectsArray) {
            if(cell.coordX == xTarget && cell.coordY == yTarget){
                if(cell.innerValue){
                    if(cell.innerValue === box.innerValue){
                        //console.log(box.box,"Merge com",cell.box) Manter, Debugger via Console
                        cell.innerValue += box.innerValue
                        box.innerValue = 0
                        break
                    }else{
                        let previX,previY
                        if(orientation === "ToUp"){
                            previX=cell.coordX
                            previY=cell.coordY+1
                        }
                        else if(orientation === "ToLeft"){
                            previX=cell.coordX+1
                            previY=cell.coordY
                        }
                        else if(orientation === "ToDown"){
                            previX=cell.coordX
                            previY=cell.coordY-1
                        }
                        else if(orientation === "ToRight"){
                            previX=cell.coordX-1
                            previY=cell.coordY
                        }
                        for (const previCell of gameObjectsArray) {
                            if(previCell.coordX == previX && previCell.coordY == previY){
                                if(previCell.box === box.box || box.innerValue === 0){
                                    //console.log(box.box,"Ja esta no local em que devia",previCell.box) Manter, Debugger via Console
                                    break
                                }else{
                                    //console.log(box,"Vai para",previCell) Manter, Debugger via Console
                                    previCell.innerValue = box.innerValue
                                    box.innerValue = 0
                                    break
                                }
                            }
                        }
                    }
                }else if(cell.coordX == xBoard && cell.coordY == yBoard){
                    // console.log(box.box,"Vai para borda",cell.box) Manter, Debugger via Console
                    cell.innerValue = box.innerValue
                    box.innerValue = 0
                    break
                }
            }
        }
    }
    const boxList = []
    
    if(orientation === 87 ) // 87 W 
    orientation = "ToUp"
    else if(orientation === 65) // 65 A
    orientation = "ToLeft"
    else if(orientation === 83) // 83 S
    orientation = "ToDown"
    else if(orientation === 68) // 68 D
    orientation = "ToRight"
    
    const staticBoardVal = (orientation === "ToUp" || orientation === "ToLeft" ? 0 : 3)
    filter_columns_rows()
}

function box_generator(){
    
}
start()
// ================ Prototipo   =========================
let validCells = []
const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

validCells = gameObjectsArray.filter(item => (!item.innerValue))

console.log(validCells)
// Tratar para que validCells seja uma lista com .length sempre maior que 1
for (const column of Array(3).keys()) {
    let cell = validCells[Math.floor(Math.random()*validCells.length)]
    console.log(cell.box)
    let cellPostion = validCells.indexOf(cell)
    let removedItem = validCells.splice(cellPostion, 1)
}
// ================ Prototipo   ========================= 


// for(let i=0;i<16;i++){ // Debugger
//     console.log(gameObjectsArray[i].innerValue,gameObjectsArray[i].box,gameObjectsArray[i].coordX,gameObjectsArray[i].coordY)
// }