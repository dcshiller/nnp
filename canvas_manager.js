var Drawer = require('./drawer.js');

var CanvasManager = {
  stateCanvas: null,
  nodeCanvas: null
}

CanvasManager.create = function(id){
  canvas = document.createElement("canvas")
  canvas.setAttribute('width', '1000');
  canvas.setAttribute('height', '500');
  if (id) { canvas.setAttribute("id", id); }
  document.querySelector('body').appendChild(canvas)
  return canvas
}

CanvasManager.buildNodeCanvas = function(){
  CanvasManager.nodeCanvas = CanvasManager.create("network")
}

CanvasManager.buildStateCanvas = function(){
  CanvasManager.stateCanvas = CanvasManager.create("states")
}

CanvasManager.draw = function(){
  CanvasManager.nodeCanvas = CanvasManager.create("network")
  network.nodes.forEach(function(node){
    Drawer.drawNode(CanvasManager.nodeCanvas, node)
  })
}

CanvasManager.redraw = function(){
  document.querySelector('canvas#network').remove()
  CanvasManager.draw()
}

CanvasManager.reColor = function(){
  network.callWithNodes( Drawer.fillInNode.bind(null, CanvasManager.stateCanvas) )
}

CanvasManager.update = function(){
  network.updateAll()
  CanvasManager.reColor()
  network.rememberAll()
}

module.exports = CanvasManager