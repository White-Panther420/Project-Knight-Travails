// Creates a new 8x8 matrix to keep track of visited nodes
const createVistiedAdjMat = () => {
    visitedAdjMat = []
    for(let i=1; i<(9); i++){
        visitedAdjMat[i] = []
        for(let j=1; j<9; j++){
            visitedAdjMat[i][j] = 0
        }
    }
    return visitedAdjMat
}

// Helper function for when we need to mae a move and update array
const arrayArithmetic = (arr1, arr2) =>{
    if(arr1.length !== arr2.length){
        return 0;
    }else{
        let result = []
        for(let i=0; i<arr1.length; i++){
            result.push(arr1[i]+arr2[i])
        }
        return result
    }
}

// Direction Vectors for our knight
const moves = [
    [-2, +1],
    [-1, +2],
    [+1, +2],
    [+2, +1],
    [+2, -1],
    [+1, -2],
    [-1, -2],
    [-2, -1]
];  

let xQueue = []
let yQueue = []
let counter = 0
let execution_ounter = 0;
const dfs = (newVisitedMat, currentSquare, targetSquare) => {
    // Note: Coordinates will be entered in the form [y,x] for newVisitedMat. Everything else will be of the form [x,y]
    
    let path = {}
    while(xQueue.length > 0 && yQueue.length > 0 && (currentSquare[0] !== targetSquare[0] || currentSquare[1] !== targetSquare[1])){
        let validMoves = []
        execution_ounter++

        // Make all possible moves
        for(let i=0; i<8; i++){
            let newMove = arrayArithmetic(currentSquare, moves[i])
            let x = newMove[0]
            let y = newMove[1]
            // Check for valid move and if node has been visited
            if(y >=1 && y <=8 && x >=1 && x <= 8 && newVisitedMat[y][x] !== 1){
                newVisitedMat[y][x] = 1
                counter++
                validMoves.push(newMove)
                xQueue.push(x)
                yQueue.push(y)
            }
        }
        let xComponent = xQueue.shift()
        let yComponent = yQueue.shift()
        path[`Node(${xComponent},${yComponent})`] = validMoves

        console.log(`Current Move: (${xComponent},${yComponent})`)
        console.log("XQUEUE: " + xQueue)
        console.log("YQUEUE: " + yQueue)
        currentSquare[0] = xQueue[0]
        currentSquare[1] = yQueue[0]
        console.log("Next Move: " + currentSquare)
    }
    console.log("YAY! We found the goal of: " + currentSquare)
    console.log("PATH")
    console.log(path)
    let xFinal = targetSquare[0]
    let yFinal = targetSquare[1]
    //TODO: Find a way to see backtrack from final quare to start node
    // TODO: Find a way to parse the key string to get x,y values
    for(let key in path){
        for(let i=0; i<path[key].length; i++){
            // Searching to see which key the final move coordinates belong to so we can backtrack
            if(path[key][i][0] === xFinal && path[key][i][1] === yFinal){
                console.log("FOUND KEY:" + key)

                // Parse Key to get coords
                // Add coords to new path array
                // set xF and yF to those parsed coords and repeat loop
                // End loop once xF and yF are null (we reached start node)
                // Return new path array
            }
        }
    }
}   

const knightMove = (currentSquare, targetSquare) =>{
    let newVisitedMat = createVistiedAdjMat()
    // Push first move into queue 
    xQueue.push(currentSquare[0])
    yQueue.push(currentSquare[1])
    // Mark first node as visited
    newVisitedMat[currentSquare[1]][currentSquare[0]] = 1
    console.log(newVisitedMat)
    const path = dfs(newVisitedMat, currentSquare, targetSquare)
}

knightMove([1,1], [4,4])

console.log(counter)
console.log(execution_ounter)