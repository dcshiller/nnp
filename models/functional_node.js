var Node = require('./node.js');
var FuncStore = require('../helpers/func_store.js');

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

FunctionalNode.prototype.toObj = function(){
  let basicProps = Node.prototype.toObj.call(this);
  return Object.assign(basicProps, { func: this.func.tagName });
};

FunctionalNode.fromObj = function(obj){
  const node = new FunctionalNode(obj.x, obj.y, obj.name);
  node.assignBasicProps(obj);
  node.setFunc(FuncStore.getFunc(obj.func));
  return node
};

FunctionalNode.prototype.constructor = FunctionalNode;

FunctionalNode.prototype.on = function(){ this.state = 1; this.func(); }

module.exports = FunctionalNode;
