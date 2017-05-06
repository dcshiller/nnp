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

Connection.prototype.transmission = function(){
  return this.fromNode.lastState * this.strength
}

module.exports = Connection