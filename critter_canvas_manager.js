const Drawer = require('./critter_drawer.js');


const CritterCanvasManager = {
  critterCamCanvas: null,
  critter: null
}

CritterCanvasManager.buildCam = function(){
  canvas = document.createElement("canvas");
  canvas.setAttribute('width', 300);
  canvas.setAttribute('height', 300);
  canvas.setAttribute("id", "critter_cam");
  document.querySelector('body').appendChild(canvas);
  this.critterCamCanvas = canvas;
}

CritterCanvasManager.setCritter = function(critter){
  this.critter = critter;
}

CritterCanvasManager.drawCritter = function(critter, offset){
  Drawer.drawCritter(critter, offset, this.critterCamCanvas);
};

module.exports = CritterCanvasManager;