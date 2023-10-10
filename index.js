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

// Helper function to parse strig to get x and y coordinates of a node
const parseString = (inputString) =>{
    const regex = /Node\((\d+),(\d+)\)/; // Regular expression to match the pattern
    const match = inputString.match(regex); // Use match() to find the pattern
    if (match) {
        // Extract and convert the x and y values to ints
        const x = parseInt(match[1]); 
        const y = parseInt(match[2]); 
        const coordinate = [x,y]
        return coordinate
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

const bfs = (newVisitedMat, currentSquare, targetSquare) => {
    // Note: Coordinates will be entered in the form [y,x] for newVisitedMat. Everything else will be of the form [x,y]
    const startNode = [...currentSquare]  // Will be used later for path construction
    let path = {}
    let xQueue = [startNode[0]]
    let yQueue = [startNode[1]] 
    // Visit nodes until queue is empty (all nodes have been visited) or final node is found
    while(xQueue.length > 0 && yQueue.length > 0 && (currentSquare[0] !== targetSquare[0] || currentSquare[1] !== targetSquare[1])){
        let validMoves = []
        // Make all possible moves
        for(let i=0; i<8; i++){
            let newMove = arrayArithmetic(currentSquare, moves[i])
            let x = newMove[0]
            let y = newMove[1]
            // Check for valid move and if node has been visited
            if(y >=1 && y <=8 && x >=1 && x <= 8 && newVisitedMat[y][x] !== 1){
                newVisitedMat[y][x] = 1
                validMoves.push(newMove)
                xQueue.push(x)
                yQueue.push(y)
            }
        }
        // Dequeue visited node
        let xComponent = xQueue.shift()
        let yComponent = yQueue.shift()
        //Add last visited node as key and all the nodes we can reach from that node as values
        path[`Node(${xComponent},${yComponent})`] = validMoves
        currentSquare[0] = xQueue[0]
        currentSquare[1] = yQueue[0]
    }
    let xFinal = targetSquare[0]
    let yFinal = targetSquare[1]

    let newPath = [targetSquare]
    // While we haven't reached start node, keep extracting parent nodes
    while(xFinal !== startNode[0] || yFinal !== startNode[1]){
        for(let key in path){
            for(let i=0; i<path[key].length; i++){
                // Searching to see which key the final move coordinates belong to so we can backtrack
                if(path[key][i][0] === xFinal && path[key][i][1] === yFinal){
                    // Parse key to get coordinates 
                    let parentNode = parseString(key)
                    newPath.push(parentNode)
                    xFinal = parentNode[0]
                    yFinal = parentNode[1]
                    break;
                }
            }
        }
    }
    newPath.reverse()
    return newPath
}   

const knightMove = (currentSquare, targetSquare) =>{
    let newVisitedMat = createVistiedAdjMat()
    let startNode = [...currentSquare]

    // Mark first node as visited
    newVisitedMat[currentSquare[1]][currentSquare[0]] = 1
    const path = bfs(newVisitedMat, currentSquare, targetSquare)
    
    let pathString = ""
    for(let i=0; i<path.length; i++){
        pathString += `[${path[i]}],`
    }
    let newPathString = pathString.slice(0,-1)
    console.log(`Knight Moves [${startNode}], [${targetSquare}] = [${newPathString}]`)
}

knightMove([1,1], [1,5])
knightMove([4,7], [8,8])
knightMove([4,4], [4,5])
knightMove([4,4], [4,4])
knightMove([1,1], [8,8])