// Organizes deployment of drawer methods

const Drawer = require('./drawer.js');
const PanelDrawer = require('./node_panel_drawer');

const CanvasManager = {
  stateCanvas: null,
  nodeCanvas: null,
  selectionCanvas: null,
  offsetter: Drawer.offsetter
}

PanelDrawer.initialize(CanvasManager);

const nav = function (offsetX, offsetY){
  CanvasManager.offsetter.changeOffset(offsetX,offsetY);
  CanvasManager.redraw();
  CanvasManager.reColor();
}

CanvasManager.navUp     = nav.bind(null,  0, 20);
CanvasManager.navDown   = nav.bind(null,  0,-20);
CanvasManager.navLeft   = nav.bind(null, 20,  0);
CanvasManager.navRight  = nav.bind(null,-20,  0);

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

CanvasManager.resetZoom = function(){
  CanvasManager.offsetter.resetOffset();
  CanvasManager.redraw();
  CanvasManager.reColor();
}

CanvasManager.create = function(id){
  const canvas = document.createElement("canvas");
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
  network.updateAll();
  network.rememberAll();
  CanvasManager.reColor();
}

CanvasManager.focusNode = function(){
  highlightSelection();
  if (window.focusedNode){
    PanelDrawer.updatePanel(window.focusedNode);
  }
  else {
    PanelDrawer.clearPanel();
  }
}

module.exports = CanvasManager;
