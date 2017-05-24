var Node = require('./node.js')
var Canvas;
var offset;
var reset;

function inNode(x,y,node) {
  if (Math.sqrt((x - offset(node).x) ** 2 + (y - offset(node).y) ** 2) < 20) { return true }
}

function getNode(x,y){
  for (node of network.nodes){
    if ( inNode(x,y,node) ) { return node }
  }
}

function eToAbsCoords(e){
  return reset({ x: e.offsetX, y: e.offsetY})
}

function focusOnSelection(e){
  window.focusedNode = getNode(e.offsetX,e.offsetY)
  if (window.focusedNode) {
    Canvas.focusNode(window.focusedNode)
  }
}

function connect(node, e){
  otherNode = getNode(e.offsetX,e.offsetY)
  focusOnSelection(e)
  if (otherNode && !node.pointsTo(otherNode)){
    node.pointTo(otherNode)
    Canvas.redraw()
  }
  document.removeEventListener(e.type, window.mouseUpHandler)
}

function place(node, e){
  if (e.target.tagName == "CANVAS"){
    const coords = eToAbsCoords(e);
    node.x = coords.x
    node.y = coords.y
    Canvas.redraw()
    Canvas.reColor()
    document.removeEventListener(e.type, window.mouseUpHandler)
  }
}

function handleMoveMouseup(e){
  node = getNode(e.offsetX,e.offsetY)
  focusOnSelection(e)
  if (!node) { return }
  window.mouseUpHandler = place.bind(this, node)
  document.addEventListener("mouseup", window.mouseUpHandler)
}

function handlePlaceMouseup(e){
  if (getNode(e.offsetX, e.offsetY)){
    focusOnSelection(e)
  }
  else {
    newCoords = eToAbsCoords(e)
    node = new Node(newCoords.x, newCoords.y);
    window.focusedNode = node
    network.include(node);
    Canvas.focusNode();
    Canvas.redraw();
  }
}

function handleToggleMouseup(e){
  node = getNode(e.offsetX,e.offsetY)
  focusOnSelection(e)
  if (!node) { return }
  node.lastState ? node.off() : node.on()
  node.remember()
  Canvas.reColor()
}

function handleDeleteMouseup(e){
  node = getNode(e.offsetX,e.offsetY)
  if (!node) { return }
  network.nodes.delete(node)
  for (let possibleConnection of network.nodes){
    if(possibleConnection.pointsTo(node)){ 
      possibleConnection.removeConnectionsWith(node)
    }
  }
  Canvas.redraw()
}

function handleConnectMouseup(e){
  node = getNode(e.offsetX,e.offsetY)
  if (!node) { return }
  focusOnSelection(e)
  window.mouseUpHandler = connect.bind(this, node)
  document.addEventListener("mouseup", window.mouseUpHandler)
}

const ActionController = {
  
  initialize: function(canvasManager){
    Canvas = canvasManager;
    offset = Canvas.offsetter.offset;
    reset = Canvas.offsetter.reset;
  },

  assignMouseHandlers: function(){
    document.addEventListener("mousedown", function(e){
      if (e.target.tagName == "CANVAS") {
        switch (window.editMode) {
          case "move":
            handleMoveMouseup(e); break;
          case "place":
            handlePlaceMouseup(e); break;
          case "toggle":
            handleToggleMouseup(e); break;
          case "delete":
            handleDeleteMouseup(e); break;
          case "connect":
            handleConnectMouseup(e); break;
        }
      }
    })
  }
}

module.exports = ActionController
