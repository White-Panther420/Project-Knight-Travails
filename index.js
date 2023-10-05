// Creates a new 8x8 matrix to keep track of visited nodes
const createVistiedAdjMat = () => {
    visitedAdjMat = []
    for(let i=0; i<8; i++){
        visitedAdjMat[i] = []
        for(let j=0; j<8; j++){
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
const dfs = (newVisitedMat, currentSquare) => {
    let validMoves = []
    execution_ounter++
    for(let i=0; i<8; i++){
        let newMove = arrayArithmetic(currentSquare, moves[i])
        let y = newMove[0]
        let x = newMove[1]
        // Check for valid move and if node has been visited
        if(y >=0 && y <=7 && x >=0 && x <= 7 && newVisitedMat[y][x] !== 1){
            newVisitedMat[y][x] = 1
            counter++
            validMoves.push(newMove)
        }
    }
    console.log(validMoves)
    console.log(visitedAdjMat)

    for(let i=0; i<validMoves.length; i++){
        dfs(newVisitedMat, validMoves[i])
    }
    console.log("FINAL")
    console.log(validMoves)
    console.log(visitedAdjMat)
}

const knightMove = (currentSquare, targetSquare) =>{
    let newVisitedMat = createVistiedAdjMat()
    const path = dfs(newVisitedMat, currentSquare)
}

knightMove([0,0], [3,3])

console.log(counter)
console.log(execution_ounter)