function Critter(){
  this.position = { x: 0, y: 0 }
  this.facing = {x: 1, y: 0}
  this.ongoingAction = null;
  this.actionQueue = [];
};

Critter.prototype.addToQueue = function(func){
  if (this.actionQueue.length > 3) { return  }
  this.actionQueue.push(func);
};

Critter.prototype.ready = function(){
  return !this.ongoingAction && (this.actionQueue.length > 0)
}

Critter.prototype.startAction = function(){
  if (!this.ongoingAction) { this.ongoingAction = this.actionQueue.shift() };
};

Critter.prototype.endAction = function(){
  if (this.ongoingAction) { this.ongoingAction.call(this); }
  this.ongoingAction = null;
}

const performStepForward = function(){
  this.position = addPositions(this.position, this.facing);
};

Critter.prototype.stepForward = function(){
  func = performStepForward;
  func.tagName = "stepForward";
  this.addToQueue(func);
};

const performTurnLeft = function(){
  this.facing = {x: this.facing.y, y: -1 * this.facing.x};
}

Critter.prototype.turnLeft = function(){
  func = performTurnLeft;
  func.tagName = "turnLeft";
  this.addToQueue(func);
}

const performTurnRight = function(){
  this.facing = {x: -1 * this.facing.y, y: this.facing.x};
}

Critter.prototype.turnRight = function(){
  func = performTurnRight;
  func.tagName = "turnRight";
  this.addToQueue(func);
}

function addPositions(pos1, pos2){
  return {x: pos1.x + pos2.x, y: pos1.y + pos2.y};
}

module.exports = Critter;
