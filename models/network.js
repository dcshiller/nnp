const Node = require('./node.js')
const FunctionalNode = require('./functional_node.js')
const Connection = require('./connection.js')

function Network (){
  this.nodes = new Set();
}

// Basic

Network.prototype.include = function(node, name){
  this.nodes.add(node)
  node.name || (node.name = "#" + this.nodes.size++)
};

Network.prototype.exclude = function(node){
  this.nodes.delete(node)
};

// Updating

Network.prototype.updateAll = function(){
  this.callOnNodes(Node.prototype.update)
}

Network.prototype.rememberAll = function(){
  this.callOnNodes(Node.prototype.remember)
}

Network.prototype.reset = function(){
  this.nodes = new Set();
}

Network.prototype.updateState = function(){
  this.updateAll()
  this.rememberAll()
}


// Utility

Network.prototype.callOnNodes = function(func){
  for (node of this.nodes){
    func.call(node)
  }
}

Network.prototype.callWithNodes = function(func){
  for (node of this.nodes){
    func.call(null, node)
  }
}

// Saving

Network.prototype.toObj = function(){
  const nodesList = [];
  const connectionsList = [];
  for (const node of this.nodes) {
    nodesList.push(node.toObj())
    for (const connection of node.connections.to){
      connectionsList.push(connection.toObj())
    }
  }
  return { nodesList: nodesList, connectionsList: connectionsList }
}

Network.prototype.toJSON = function(){
  return JSON.stringify(this.toObj());
}

Network.prototype.getNodeByName = function(name) {
  for (const node of this.nodes){
    if (node.name == name) { return node }
  }
}

Network.fromJSON = function(string){
  const obj = JSON.parse(string);
  const network = new Network();
  for (const listedNode of obj.nodesList ) {
    const newNode = Node.fromObj(listedNode);
    network.include(newNode)
  }
  for (const listedCon of obj.connectionsList ) {
    listedCon.fromNode = network.getNodeByName(listedCon.fromNode);
    listedCon.toNode = network.getNodeByName(listedCon.toNode);
    const newCon = Connection.fromObj(listedCon);
  }
  return network;
}

module.exports = Network