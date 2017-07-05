var Node = require('./node.js')

function FunctionalNode(x,y,name,func){
  this.connections = { to: new Set(), from: new Set() };
  this.state = 0
  this.lastState = 0
  this.threshold = 1
  this.x = x
  this.y = y
  this.name = name
  this.func = ( func || console.log.bind(null, "no function") )
}
FunctionalNode.prototype = new Node();

FunctionalNode.prototype.setFunc = function(func){ this.func = func; };

FunctionalNode.prototype.constructor = FunctionalNode;

FunctionalNode.prototype.on = function(){ this.state = 1; this.func(); }

module.exports = FunctionalNode
