// Organizes deployment of drawer methods

const Drawer = require('./drawer.js');

const CanvasManager = {
  stateCanvas: null,
  nodeCanvas: null,
  selectionCanvas: null,
  offsetter: Drawer.offsetter
}

CanvasManager.navUp = function(){
  CanvasManager.offsetter.changeOffset(0,20);
  CanvasManager.redraw();
  CanvasManager.reColor();
}
CanvasManager.navDown = function(){
  CanvasManager.offsetter.changeOffset(0,-20);
  CanvasManager.redraw();
  CanvasManager.reColor();
}
CanvasManager.navLeft = function(){
  CanvasManager.offsetter.changeOffset(20,0);
  CanvasManager.redraw();
  CanvasManager.reColor();
}
CanvasManager.navRight = function(){
  CanvasManager.offsetter.changeOffset(-20,0);
  CanvasManager.redraw();
  CanvasManager.reColor();
}

CanvasManager.zoomIn = function(){
  CanvasManager.offsetter.changeProportion(0.1);
  CanvasManager.redraw();
  CanvasManager.reColor();
}

CanvasManager.zoomOut = function(){
  CanvasManager.offsetter.changeProportion(-0.1);
  CanvasManager.redraw();
  CanvasManager.reColor();
}

CanvasManager.create = function(id){
  canvas = document.createElement("canvas");
  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);
  if (id) { canvas.setAttribute("id", id); }
  document.querySelector('body').appendChild(canvas);
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

var drawConnectedNodeNames = function(){
  Drawer.drawNodeName(CanvasManager.selectionCanvas, window.focusedNode)
  for (const node of window.focusedNode.allConnectedNodes()) {
    Drawer.drawNodeName(CanvasManager.selectionCanvas, node)
  }

}

var highlightSelection = function(){
  clearSelectionCanvas();
  if(window.focusedNode){
    Drawer.highlight(CanvasManager.selectionCanvas, window.focusedNode);
    drawConnectedNodeNames();
  }
}

CanvasManager.redraw = function(){
  CanvasManager.nodeCanvas.remove()
  CanvasManager.draw();
  clearSelectionCanvas();
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

CanvasManager.shadowNode = function(x,y){
  highlightSelection();
  Drawer.drawNodeShadow(CanvasManager.selectionCanvas,x,y)
}

CanvasManager.drawArrowFromNode = function(node, coords){
  clearSelectionCanvas();
  Drawer.drawArrowFromNode(CanvasManager.selectionCanvas, node, coords)
}

CanvasManager.update = function(){
  network.updateAll()
  CanvasManager.reColor()
  network.rememberAll()
}

function writeConnectionDetails(connection, list){
  const listTag = document.createElement("li");
  listTag.innerHTML = `${connection.fromNode.name} <i class="fa fa-long-arrow-right" aria-hidden="true"></i> ${connection.toNode.name}`;
  const raiseButton = document.createElement("button");
  const lowerButton = document.createElement("button");
  const removeButton = document.createElement("button");
  const strength = document.createElement("span");
  const buttonBox = document.createElement("div");
  buttonBox.classList += "button_box";
  strength.innerHTML = connection.strength;
  raiseButton.innerHTML = "<i class='fa fa-plus' aria-hidden='true'></i>";
  lowerButton.innerHTML = "<i class='fa fa-minus' aria-hidden='true'></i>";
  removeButton.innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>";
  raiseButton.addEventListener("click", function(e){connection.increaseStrength(); CanvasManager.redraw(); CanvasManager.focusNode();});
  lowerButton.addEventListener("click", function(e){connection.decreaseStrength(); CanvasManager.redraw(); CanvasManager.focusNode();});
  removeButton.addEventListener("click", function(e){connection.remove(); CanvasManager.redraw(); CanvasManager.focusNode();});
  buttonBox.appendChild(strength);
  buttonBox.appendChild(raiseButton);
  buttonBox.appendChild(lowerButton);
  buttonBox.appendChild(removeButton);
  listTag.appendChild(buttonBox);
  document.querySelector(list).appendChild(listTag);
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