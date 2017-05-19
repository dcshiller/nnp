var Connection = require('./connection.js')

function Node(x,y,name){
  this.connections = { to: [], from: [] };
  this.state = 0
  this.lastState = 0
  this.threshold = 1
  this.x = x
  this.y = y
  this.name = name
}

Node.prototype.assess = function(){
  value = 0
  for (let connection of this.connections.to){
    value += (connection.transmission())
  }
  if (value >= this.threshold){ return true }
  return false
}

Node.prototype.on = function(){
  this.state = 1
}

Node.prototype.off = function(){
  this.state = 0
}

Node.prototype.remember = function(){
  this.lastState = this.state
}

Node.prototype.update = function(){
  this.assess() ? this.on() : this.off()
}

Node.prototype.pointFrom = function(otherNode){
  new Connection(otherNode, this)
}

Node.prototype.addToConnection = function(connection){
  this.connections.to.push(connection)
}

Node.prototype.addFromConnection = function(connection){
  this.connections.from.push(connection)
}

Node.prototype.pointTo = function(otherNode){
  new Connection(this, otherNode)
}

Node.prototype.pointsTo = function(otherNode){
  for (let connection of this.connections.from){
    if(connection.toNode == otherNode){
      return true
    }
  }
  return false
}

Node.prototype.removeConnectionsWith = function(otherNode){
  for (let connection of this.connections.to){
    if(connection.toNode == otherNode){
      connection.remove()
    }
  }
  for (let connection of this.connections.to){
    if(connection.fromNode == otherNode){
      connection.remove()
    }
  }
}

Node.prototype.removeConnection = function(connection){
  var newConnections = { to: [], from: [] };
  for (let toConnection of this.connections.to){
    if (connection != toConnection){
      newConnections.to.push(toConnection);
    }
  }
  for (let fromConnection of this.connections.from){
    if (connection != fromConnection){
      newConnections.from.push(fromConnection);
    }
  }
  this.connections = newConnections;
}

Node.prototype.removeAllConnections = function(){
  for (let connection of this.connections.to){ connection.remove() }
  for (let connection of this.connections.from){ connection.remove() }
}

// Node.prototype.connectionsByName = function(){
//   var toNames = new Set();
//   for (let c of this.connections.to) { toNames.add(c.byName) }
//   var fromNames = new Set();
//   for (let c of this.connections.to) { fromNames.add(c.byName) }
//   return {
//     to: toNames,
//     from: fromNames
//   }
// }

Node.prototype.toObj = function(){
  return {
    state: this.state,
    lastState: this.lastState,
    threshold: this.threshold,
    x: this.x,
    y: this.y,
    name: this.name
  }
}

Node.fromObj = function(obj){
  const node = new Node(obj.x, obj.y, obj.name)
  node.state = obj.state || 0
  node.lastState = obj.lastState || 0
  node.threshold = obj.threshold || 1
  return node
}

module.exports = Node