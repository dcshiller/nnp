// Organizes deployment of drawer methods

var Drawer = require('./drawer.js');

var CanvasManager = {
  stateCanvas: null,
  nodeCanvas: null,
  selectionCanvas: null
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

CanvasManager.buildSelectionCanvas = function(){
  CanvasManager.selectionCanvas = CanvasManager.create("selection")
}

var clearNodeCanvas = function(){
  if (!CanvasManager.nodeCanvas){ return }
  CanvasManager.nodeCanvas.remove();
  CanvasManager.buildNodeCanvas();
}

var clearSelectionCanvas = function(){
  if (!CanvasManager.selectionCanvas){ return }
  CanvasManager.selectionCanvas.remove();
  CanvasManager.buildSelectionCanvas();
}

var clearStateCanvas = function(){
  if (!CanvasManager.stateCanvas){ return }
  CanvasManager.stateCanvas.remove();
  CanvasManager.buildStateCanvas();
}

CanvasManager.draw = function(){
  CanvasManager.nodeCanvas = CanvasManager.create("network")
  network.nodes.forEach(function(node){
    Drawer.drawNode(CanvasManager.nodeCanvas, node)
  }) 
}

var highlightSelection = function(){
  clearSelectionCanvas();
  if(window.focusedNode){
    Drawer.highlight(window.focusedNode, CanvasManager.selectionCanvas)
  }
}

CanvasManager.redraw = function(){
  CanvasManager.nodeCanvas.remove()
  CanvasManager.draw();
  highlightSelection();
}

CanvasManager.clearStates = function(){
  CanvasManager.stateCanvas.remove()
  CanvasManager.buildStateCanvas()
}

CanvasManager.reColor = function(){
  CanvasManager.clearStates()
  network.callWithNodes( Drawer.fillInNode.bind(null, CanvasManager.stateCanvas) )
}

CanvasManager.update = function(){
  network.updateAll()
  CanvasManager.reColor()
  network.rememberAll()
}

function writeConnectionDetails(connection, list){
  let listTag = document.createElement("li")
  listTag.innerHTML = `${connection.fromNode.name} (${connection.strength}) ----> ${connection.toNode.name}`
  let raiseButton = document.createElement("button")
  let lowerButton = document.createElement("button")
  let removeButton = document.createElement("button")
  raiseButton.innerHTML = "+"
  lowerButton.innerHTML = "-"
  removeButton.innerHTML = "x"
  raiseButton.addEventListener("click", function(e){connection.increaseStrength(); CanvasManager.redraw(); CanvasManager.focusNode();})
  lowerButton.addEventListener("click", function(e){connection.decreaseStrength(); CanvasManager.redraw(); CanvasManager.focusNode();})
  removeButton.addEventListener("click", function(e){connection.remove(); CanvasManager.redraw(); CanvasManager.focusNode();})
  listTag.appendChild(raiseButton)
  listTag.appendChild(lowerButton)
  listTag.appendChild(removeButton)
  document.querySelector(list).appendChild(listTag)
}

CanvasManager.focusNode = function(){
  highlightSelection();
  if (window.focusedNode){
    document.querySelector("#node_threshold").innerHTML = window.focusedNode.threshold
    document.querySelector("#node_name").innerHTML = window.focusedNode.name
    document.querySelector("#afferent_connection_list").innerHTML = ""
    document.querySelector("#efferent_connection_list").innerHTML = ""
    for (let connection of window.focusedNode.connections.to){
      writeConnectionDetails(connection, "#afferent_connection_list")
    }
    for (let connection of window.focusedNode.connections.from){
      writeConnectionDetails(connection, "#efferent_connection_list")
    }
  }
}

module.exports = CanvasManager