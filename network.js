var Node = require('./node.js')

function Network (){
  this.nodes = [];
  this.nodeCount = 0;
}

Network.prototype.include = function(node){
  this.nodes.push(node)
  node.name = "#" + this.nodeCount++
};

Network.prototype.connectedNodes = function (thisNode) {
  var connectedNodes = [];
  for (otherNode of this.nodes){
    if (thisNode.pointTo(otherNode)){ connectedNodes.push(otherNode); }
  }
  return connectedNodes;
};

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

Network.prototype.updateAll = function(){
  this.callOnNodes(Node.prototype.update)
}

Network.prototype.rememberAll = function(){
  this.callOnNodes(Node.prototype.remember)
}

Network.prototype.reset = function(){
  this.nodes = []
}

Network.prototype.updateState = function(){
  this.updateAll()
  this.rememberAll()
}

module.exports = Network