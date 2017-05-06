var Connection = require('connection.js')

function Node(x,y,name){
  this.connections = {to: [], from: []};
  this.state = 0
  this.lastState = 0
  this.threshold = 1
  this.x = x
  this.y = y
  this.name = name
}

Node.prototype.assess = function(){
  value = 0
  for (connection of this.connections){
    value += (connection[0].lastState * connection[1])
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
  var included = false
  for (connection of otherNode.connections){
    if(connection[0] == this){
      included = true
    }
  }
  return included
}

Node.prototype.removeConnection = function(otherNode){
  var newConnections = [];
  for (connection of this.connections){
    if (connection[0] != otherNode){
      newConnections.push(connection);
    }
  }
  this.connections = newConnections;
}

module.exports = Node