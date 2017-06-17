
function Critter(){
  this.position = { x: 0, y: 0 }
  this.facing = {x: 1, y: 0}
  this.timeStamp = new Date();
}

Critter.prototype.stepForward = function(){
  this.position = addPositions(this.position, this.facing);
  this.updateTimeStamp();
}

Critter.prototype.turnLeft = function(){
  this.facing = {x: this.facing.y, y: -1 * this.facing.x};
  this.updateTimeStamp();
}

Critter.prototype.turnRight = function(){
  this.facing = {x: -1 * this.facing.y, y: this.facing.x};
  this.updateTimeStamp();
}

Critter.prototype.updateTimeStamp = function(){
  this.timeStamp = new Date();
};

function addPositions(pos1, pos2){
  return {x: pos1.x + pos2.x, y: pos1.y + pos2.y};
}

module.exports = Critter;