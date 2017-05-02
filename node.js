function Node(x,y,name){
  this.connections = [];
  this.state = 0
  this.lastState = 0
  this.threshold = 1
  this.x = x
  this.y = y
  this.name = name
}

Node.prototype.assess = function(){
  value = 0
  this.connections.forEach(function(connection){
    value += connection.lastState
  })
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
  this.connections.push(otherNode)
}

module.exports = Node