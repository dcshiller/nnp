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
  for (let connection of this.connections.to){
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
      newConnections.to.push(connection);
    }
  }
  for (let fromConnection of this.connections.from){
    if (connection != fromConnection){
      newConnections.from.push(connection);
    }
  }
  this.connections = newConnections;
}

Node.prototype.removeAllConnections = function(){
  for (let connection of this.connections.to){ connection.remove() }
  for (let connection of this.connections.from){ connection.remove() }
}

module.exports = Node