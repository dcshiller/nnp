function Connection(fromNode, toNode, strength) {
  this.fromNode = fromNode;
  this.toNode = toNode;
  this.strength = strength || 1;
  toNode.addToConnection(this);
  fromNode.addFromConnection(this);
}

module.exports = Connection