const color = {2:`rgb(199,249,191)`,4:`rgb(152,241,139)`,8:`rgb(99,228,163)`,16:`rgb(74,227,176)`,32:`rgb(112,209,219)`,64:`rgb(112,156,219)`,128:`rgb(122,112,219)`,256:`rgb(175,112,219)`,512:`rgb(219,112,209)`,1024:`rgb(219,112,155)`,2048:`rgb(208,70,125)`}

let gameObjectsArray=[]
let action = false

const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

const randomChoice = (array,quantity=1) => { // Tratar erros Array deve ser sempre um Vetor com pelo menos 1 elemento
    let newArray = []
    if(array.length == 1){
        return array
    }else{
        quantity = quantity > array.length ? quantity = array.length : quantity
        for (const _ of Array(quantity).keys()) {
            const picked = array[Math.floor(Math.random()*array.length)]
            newArray.push(picked)
            const pickIndex = array.indexOf(picked)
            const removedItem = array.splice(pickIndex, 1)
        }
        return newArray
    }
}

function start(){
    gameObjectsArray=[]
    buildGameObjects()
    box_generator(3)
    updateHTML()
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
        if(action){
            action=false
            box_generator()
            updateHTML()
        }
    }
}

function buildGameObjects(){
    const boxes = document.getElementsByClassName("box")
    let cont=0
    function gameObjectFactory(cont,i,j){
        return {
            box: boxes[cont],
            innerValue: 0,
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
            gameObjectsArray[i].box.style.backgroundColor = color[gameObjectsArray[i].innerValue]
        }
        else{
            gameObjectsArray[i].box.innerHTML = ""
            gameObjectsArray[i].box.classList.remove("filled")
            gameObjectsArray[i].box.style.backgroundColor = `rgb(255,255,255)`
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
        //let deepBreak = true
        for (const variableBoardVal of Array(4).keys()) {
            if (orientation === "ToDown" || orientation === "ToRight"){
                const reverseBoxList = boxList[variableBoardVal].slice().reverse()
                reverseBoxList.forEach(box => {
                    const boxDirectionRef = (orientation === "ToDown"  ? box.coordY+1 : box.coordX+1)
                    if (box.innerValue){
                        deepBreak = true
                        console.log(box.box,deepBreak)
                        for (let i=boxDirectionRef; i<=3; i++){
                            if(deepBreak){
                                orientation === "ToDown"  ? 
                                update_box_status(box,box.coordX,i,variableBoardVal,staticBoardVal) : 
                                update_box_status(box,i,box.coordY,staticBoardVal,variableBoardVal)
                            }
                            else{
                                break
                            }
                        }
                    }   
                })
            }else if (orientation === "ToUp" || orientation === "ToLeft"){
                const regularBoxList = boxList[variableBoardVal]
                regularBoxList.forEach(box => {
                    const boxDirectionRef = (orientation === "ToUp" ? box.coordY-1 : box.coordX-1)
                    if (box.innerValue){
                        deepBreak = true
                        console.log(box.box,deepBreak)
                        for (let i=boxDirectionRef; i>=0; i--){
                            if(deepBreak){
                                orientation === "ToUp"   ? 
                                update_box_status(box,box.coordX,i,variableBoardVal,staticBoardVal) : 
                                update_box_status(box,i,box.coordY,staticBoardVal,variableBoardVal)
                            }
                            else{
                                break
                            }
                        }
                    }   
                })
            } 
        }
    }
    function update_box_status(box,xTarget,yTarget,xBoard,yBoard){
        //console.log(box.box,deepBreak)
        for (const cell of gameObjectsArray) {
            if((cell.coordX == xTarget && cell.coordY == yTarget) && deepBreak){
                //console.log(box.box,cell.box)
                //console.log(cell.box)
                if(cell.innerValue){
                    if(cell.innerValue === box.innerValue){
                        //console.log(box.box,"Merge com",cell.box) // Manter, Debugger via Console
                        cell.innerValue += box.innerValue
                        box.innerValue = 0
                        deepBreak = false
                        action = true
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
                                if(!(previCell.box === box.box || box.innerValue === 0)){
                                    //console.log(box.box,"Vai para",previCell.box) // Manter, Debugger via Console
                                    previCell.innerValue = box.innerValue
                                    box.innerValue = 0
                                    action = true
                                }
                                // else{
                                //     console.log(box.box,"Ja esta no local em que devia",previCell.box) // Manter, Debugger via Console
                                // }
                                deepBreak = false
                                break
                            }
                        } 
                    }
                }else if(cell.coordX == xBoard && cell.coordY == yBoard){
                    //console.log(box.box,"Vai para borda",cell.box) // Manter, Debugger via Console
                    cell.innerValue = box.innerValue
                    box.innerValue = 0
                    deepBreak = false
                    action = true
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

function box_generator(quantity=1){
    const newBoxesPositions = () => {
        let validCells = gameObjectsArray.filter(item => (!item.innerValue))
        return randomChoice(validCells,quantity)
    }
    newBoxesPositions().forEach(element => {
        //console.log(element.box)
        element.innerValue = randomChoice([2,2,2,2,4])[0]
    })
}
start()

// ================ Prototipo   =========================

// ================ Prototipo   ========================= 