function Connection(fromNode, toNode, strength) {
  this.fromNode = fromNode;
  this.toNode = toNode;
  this.strength = (strength || 1);
  this.toNode.addToConnection(this);
  this.fromNode.addFromConnection(this);
}

Connection.prototype.remove = function(){
  this.toNode.removeConnection(this);
  this.fromNode.removeConnection(this);
}

Connection.prototype.increaseStrength = function(){
  if (this.strength == -1) {this.strength = 1}
  else { this.strength++ }
}

Connection.prototype.decreaseStrength = function(){
  if (this.strength == 1) {this.strength = -1}
  else { this.strength-- }
}

Connection.prototype.transmission = function(){
  return this.fromNode.lastState * this.strength
}

Connection.prototype.toSelf = function(){
  return this.fromNode == this.toNode
}

Connection.prototype.toObj = function(){
  return { fromNode: this.fromNode.name, toNode: this.toNode.name, strength: this.strength }
}

Connection.fromObj = function(obj){
  connection = new Connection(obj.fromNode, obj.toNode, obj.Strength)
  return connection
}

module.exports = Connection