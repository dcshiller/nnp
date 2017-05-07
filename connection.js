function Connection(fromNode, toNode, strength) {
  this.fromNode = fromNode;
  this.toNode = toNode;
  this.strength = (strength || 1);
  this.toNode.addToConnection(this);
  this.fromNode.addFromConnection(this);
}

Connection.prototype.remove = function(){
  this.toNode.removeConneciton(this);
  this.fromNode.removeConneciton(this);
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

module.exports = Connection