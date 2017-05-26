var Node = require('../node.js')
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
    document.removeEventListener("mousemove", window.mouseMoveHandler)
  }
}

function handleMoveMouseup(e){
  node = getNode(e.offsetX,e.offsetY)
  focusOnSelection(e)
  if (!node) { return }
  window.mouseUpHandler = place.bind(this, node)
  document.addEventListener("mouseup", window.mouseUpHandler)
}

function shadowMouse(e){
  Canvas.shadowNode(e.offsetX, e.offsetY)
}

function handleMoveMousemove(e){
  window.mouseMoveHandler = shadowMouse
  document.addEventListener("mousemove", window.mouseMoveHandler)

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

function selectNewModeHandler(e) {
    for (liElement of document.querySelectorAll('#action_menu li')){
      liElement.classList = liElement.classList.value.replace("selected", "")
    }
    e.target.classList += 'selected';
    document.querySelector('body').classList = e.target.getAttribute('data-mode')
    window.editMode = e.target.getAttribute('data-mode')
}

function assignEditModeHandlers(){
  for ( liElement of document.querySelectorAll('#action_menu li')) {
    liElement.addEventListener("click", selectNewModeHandler)
  };
}

function handleConnectMouseup(e){
  node = getNode(e.offsetX,e.offsetY)
  if (!node) { return }
  focusOnSelection(e)
  window.mouseUpHandler = connect.bind(this, node)
  document.addEventListener("mouseup", window.mouseUpHandler)
}

function assignMouseHandlers(){
  document.addEventListener("mousedown", function(e){
    if (e.target.tagName == "CANVAS" && window.editMode) {
      switch (window.editMode) {
        case "move":
          handleMoveMouseup(e);
          handleMoveMousemove(e); break;
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

const ActionController = {
  initialize: function(canvasManager){
    Canvas = canvasManager;
    offset = Canvas.offsetter.offset;
    reset = Canvas.offsetter.reset;
    document.querySelector("#clear_button").addEventListener("click", function(){network.reset(); Canvas.clearStates(); Canvas.redraw();})
    assignEditModeHandlers();
    assignMouseHandlers();
  }
}

module.exports = ActionController
