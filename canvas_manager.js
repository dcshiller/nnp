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
  CanvasManager.nodeCanvas.remove()
  CanvasManager.draw()
}

CanvasManager.clearStates = function(){
  CanvasManager.stateCanvas.remove()
  CanvasManager.buildStateCanvas()
}

CanvasManager.reColor = function(){
  network.callWithNodes( Drawer.fillInNode.bind(null, CanvasManager.stateCanvas) )
}

CanvasManager.update = function(){
  network.updateAll()
  CanvasManager.reColor()
  network.rememberAll()
}

CanvasManager.focusNode = function(){
  if (window.focusedNode){
    document.querySelector("#node_threshold").innerHTML = window.focusedNode.threshold
    document.querySelector("#node_name").innerHTML = window.focusedNode.name
    document.querySelector("#connection_list").innerHTML = ""
    for (connection of window.focusedNode.connections){
      listTag = document.createElement("li")
      listTag.innerHTML = `${connection.name} ---> ${window.focusedNode.name}`
      document.querySelector("#connection_list").appendChild(listTag)
    }
  }
}

module.exports = CanvasManager