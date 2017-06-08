const Node = require('../node.js')
var Canvas;

function inNode(absCoords,node) {
  const xDiff =  absCoords.x - node.x;
  const yDiff =  absCoords.y - node.y;
  if (Math.sqrt((xDiff ** 2) + (yDiff ** 2)) < 20) { return true }
}

function getNode(absCoords){
  for (node of network.nodes){
    if ( inNode(absCoords, node) ) { return node }
  }
  return null
}

function eToAbsCoords(e){
  return Canvas.offsetter.reset({ x: e.offsetX, y: e.offsetY})
}

function eToCoords(e){
  return { x: e.offsetX, y: e.offsetY }
}

function focusOnSelection(node){
  if (node) {
    window.focusedNode = node;
    Canvas.focusNode(node);
  }
}

function connect(node, e){
  const otherNode = getNode(eToAbsCoords(e))
  focusOnSelection(otherNode)
  if (otherNode && !node.pointsTo(otherNode)){
    node.pointTo(otherNode)
    Canvas.redraw()
  }
  document.removeEventListener(e.type, window.mouseUpHandler)
  document.removeEventListener("mousemove", window.mouseMoveHandler)
}

function place(node, e){
  if (e.target.tagName == "CANVAS"){
    const coords = eToAbsCoords(e);
    node.x = coords.x;
    node.y = coords.y;
    Canvas.redraw();
    Canvas.reColor();
    document.removeEventListener(e.type, window.mouseUpHandler);
    document.removeEventListener("mousemove", window.mouseMoveHandler);
  }
}

function handleMoveMouseup(e){
  const node = getNode(eToAbsCoords(e));
  focusOnSelection(node);
  if (!node) { return }
  window.mouseUpHandler = place.bind(this, node);
  document.addEventListener("mouseup", window.mouseUpHandler);
}

function shadowMouse(node, e){
  const coords = eToAbsCoords(e);
  node.x = coords.x;
  node.y = coords.y;
  Canvas.redraw();
  Canvas.reColor();
  // Canvas.shadowNode(coords.x, coords.y);
}

function drawArrow(node, e){
  Canvas.drawArrowFromNode(node, eToCoords(e));
};

function handleMoveMousemove(e){
  const node = getNode(eToAbsCoords(e));
  window.mouseMoveHandler = shadowMouse.bind(this, node);
  document.addEventListener("mousemove", window.mouseMoveHandler);

}

function handlePlaceMouseup(e){
  const node = getNode(eToAbsCoords(e));
  if (node) {
    focusOnSelection(node);
  }
  else {
    newCoords = eToAbsCoords(e);
    const node = new Node(newCoords.x, newCoords.y);
    window.focusedNode = node;
    network.include(node);
    Canvas.focusNode();
    Canvas.redraw();
  }
}

function handleToggleMouseup(e){
  const node = getNode(eToAbsCoords(e))
  focusOnSelection(node)
  if (!node) { return }
  node.lastState ? node.off() : node.on()
  node.remember()
  Canvas.reColor()
}

function handleDeleteMouseup(e){
  node = getNode(eToAbsCoords(e))
  if (!node) { return }
  else if (node == window.focusedNode) { window.focusedNode = null; Canvas.focusNode();}
  network.nodes.delete(node);
  node.removeAllConnections();
  Canvas.redraw()
}

function selectNewModeHandler(e) {
  for (liElement of document.querySelectorAll('#action_menu li')){
    liElement.classList = liElement.classList.value.replace("selected", "")
  }
  e.currentTarget.classList += 'selected';
  document.querySelector('body').classList = e.currentTarget.getAttribute('data-mode')
  window.editMode = e.currentTarget.getAttribute('data-mode')
}

function assignEditModeHandlers(){
  for ( liElement of document.querySelectorAll('#action_menu li')) {
    liElement.addEventListener("click", selectNewModeHandler)
  };
}

function handleConnectMouseup(e){
  node = getNode(eToAbsCoords(e))
  if (!node) { return }
  focusOnSelection(node)
  window.mouseUpHandler = connect.bind(this, node)
  document.addEventListener("mouseup", window.mouseUpHandler)
}

function handleConnectMousemove(e){
  node = getNode(eToAbsCoords(e))
  if (!node) { return }
  window.mouseMoveHandler = drawArrow.bind(this, node)
  document.addEventListener("mousemove", window.mouseMoveHandler)
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
          handleConnectMouseup(e);
          handleConnectMousemove(e); break;
      }
    }
  })
}

const ActionController = {
  initialize: function(canvasManager){
    Canvas = canvasManager;
    document.querySelector("#clear_button").addEventListener("click", function(){network.reset(); Canvas.clearStates(); window.focusedNode = null; Canvas.redraw();})
    assignEditModeHandlers();
    assignMouseHandlers();
  }
}

module.exports = ActionController
