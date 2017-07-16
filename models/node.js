var Connection = require('./connection.js')

function Node(x,y,name){
  this.connections = { to: new Set(), from: new Set() };
  this.state = 0;
  this.lastState = 0;
  this.threshold = 1;
  this.x = x;
  this.y = y;
  this.name = name;
}

Node.prototype.assess = function(){
  value = 0;
  for (let connection of this.connections.to){
    value += (connection.transmission());
  }
  if (value >= this.threshold){ return true }
  return false
}

Node.prototype.on = function(){
  this.state = 1;
}

Node.prototype.off = function(){
  this.state = 0;
}

Node.prototype.remember = function(){
  this.lastState = this.state;
}

Node.prototype.update = function(){
  this.assess() ? this.on() : this.off();
}

Node.prototype.pointFrom = function(otherNode){
  new Connection(otherNode, this);
}

Node.prototype.addToConnection = function(connection){
  this.connections.to.add(connection);
}

Node.prototype.allConnectedNodes = function(){
  const allConn = new Set();
  for (const connection of this.connections.to){
    allConn.add(connection.toNode);
    allConn.add(connection.fromNode);
  }
  for (const connection of this.connections.from){
    allConn.add(connection.toNode);
    allConn.add(connection.fromNode);
  }
  return allConn;
}

Node.prototype.addFromConnection = function(connection){
  this.connections.from.add(connection);
}

Node.prototype.pointTo = function(otherNode){
  new Connection(this, otherNode);
}

Node.prototype.pointsTo = function(otherNode){
  for (const connection of this.connections.from){
    if(connection.toNode == otherNode){
      return true
    }
  }
  return false
}

Node.prototype.removeConnectionsWith = function(otherNode){
  for (const connection of this.connections.to){
    if(connection.toNode == otherNode){
      connection.remove();
    }
  }
  for (let connection of this.connections.to){
    if(connection.fromNode == otherNode){
      connection.remove();
    }
  }
}

Node.prototype.removeConnection = function(connection){
    this.connections.to.delete(connection);
    this.connections.from.delete(connection);
}

Node.prototype.removeAllConnections = function(){
  for (const connection of this.connections.to){ connection.remove(); }
  for (const connection of this.connections.from){ connection.remove(); }
}

Node.prototype.toObj = function(){
  return {
    type: this.constructor.name,
    state: this.state,
    lastState: this.lastState,
    threshold: this.threshold,
    x: this.x,
    y: this.y,
    name: this.name
  }
}

Node.fromObj = function(obj){
  const node = new Node(obj.x, obj.y, obj.name);
  node.assignBasicProps(obj);
  return node
}

Node.prototype.assignBasicProps = function(obj){
  this.state = obj.state || 0;
  this.lastState = obj.lastState || 0;
  this.threshold = obj.threshold || 1;
}

Node.prototype.convertTo = function(className){
  newNode = new className(this.x, this.y, this.name)
  for (prop in this){
    if (newNode[prop] && this.hasOwnProperty(prop)){ newNode[prop] = this[prop] }
  }
  for (const connection of this.connections.from ){ 
    connection.fromNode = newNode;
    newNode.addFromConnection( connection );
  }
  for (const connection of this.connections.to ){ 
    connection.toNode = newNode;
    newNode.addToConnection( connection );
  }
  return newNode;
}

module.exports = Node
