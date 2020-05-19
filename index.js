function findAdjacent(node, vertices, edges){
    let adjacentNodes = []; 
    // loop through edges and find each edge that includes node 
    edges.forEach(edge => {
        if(edge[0] === node){
            // filter vertices for the one that has the edge's other element's name 
            let vertice = vertices.filter(v => v.name === edge[1] && v.distance === null)[0]
            // vertice.distance = 0; 
            if (vertice !== undefined){
                adjacentNodes.push(vertice)
            }
        }else if(edge[1] === node){
            // filter vertices for the one that has the edge's other element's name 
            let vertice = vertices.filter(v => v.name === edge[0] && v.distance === null)[0]
            // vertice.distance = 0; 
            if (vertice !== undefined){
                adjacentNodes.push(vertice)
            }
        }
    })
    return adjacentNodes;
}

function markDistanceAndPredecessor(rootNode, nodeList){
    nodeList.forEach(node => {
        node.distance = rootNode.distance + 1; 
        node.predecessor = rootNode; 
    })
    return nodeList; 
}


function bfs(rootNode, vertices, edges){
    if (rootNode.distance === null){
        rootNode.distance = 0; 
    }
    let adjacentNodes = findAdjacent(rootNode.name, vertices, edges); 
    let visitedNodes = [rootNode]; 
    adjacentNodes.forEach(node => visitedNodes.push(node)); 

    adjacentNodes.forEach(node => {
        let nodeList = markDistanceAndPredecessor(node, findAdjacent(node.name, vertices, edges)); 
        if (nodeList.length > 0){
            nodeList.forEach(node => {
                if (visitedNodes.filter(oldNode => oldNode.name === node.name).length < 1){
                    //
                    visitedNodes.push(node); 
                }
                let returnedList = bfs(node, vertices, edges); 
                //
                returnedList.forEach(node => {
                    if (visitedNodes.filter(oldNode => oldNode.name === node.name).length < 1){
                        visitedNodes.push(node)
                    }
                });
            })
        }else{
            // return visitedNodes;
        }
    })
    console.log(visitedNodes);  
    return visitedNodes;
}
