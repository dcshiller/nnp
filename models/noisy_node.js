var Node = require('./node.js')

function NoisyNode(x,y,name,prob){
  this.connections = { to: new Set(), from: new Set() };
  this.state = 0
  this.lastState = 0
  this.threshold = 1
  this.x = x
  this.y = y
  this.name = name
  this.prob = prob || .25
}
NoisyNode.prototype = new Node();

NoisyNode.prototype.constructor = NoisyNode;

NoisyNode.prototype.assess = function(){
  randomNumber = Math.random();
  if (randomNumber < this.prob) { return true }
  value = 0;
  for (let connection of this.connections.to){
    value += (connection.transmission());
  }
  if (value >= this.threshold){ return true }
  return false
}

module.exports = NoisyNode
