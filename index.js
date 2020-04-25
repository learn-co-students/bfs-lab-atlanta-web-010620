function bfs(rootNode, vertices, edges){
    let queue = []
    let order = []
    queue.push(rootNode)
    order.push(rootNode)
    rootNode.distance = 0
    while(!queue.length == 0) {
        let firstNode = queue.shift()
        let adjacentVertices = findAdjacent(firstNode.name, vertices, edges)
        markDistanceAndPredecessor(firstNode, adjacentVertices)
        adjacentVertices.forEach(node => {
            queue.push(node)
            order.push(node)
        })
    }
    return order
}

function findAdjacent(nodeName,  vertices, edges){
    return edges.filter(function(edge){
        return edge.includes(nodeName)
    }).map(function(edge){
        return edge.filter(function(node){
            return (node != nodeName)
        })[0]
    }).map(function(name){
        return findNode(name, vertices)
    }).filter(function(node){
        return node.distance == null;
    })
}

function markDistanceAndPredecessor(predecessor, adjacentNodes){
    adjacentNodes.map(function(node){
        node.distance = predecessor.distance + 1;
        node.predecessor = predecessor;
    })
}



function findNode(nodeName, vertices){
    return vertices.find(function(vertex){
        return vertex.name == nodeName
    })
}