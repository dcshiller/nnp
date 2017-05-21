// Handles click events

var Node = require('./node.js')
var Network = require('./network.js')
var Canvas;

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
    node.x = e.offsetX
    node.y = e.offsetY
    Canvas.redraw()
    Canvas.reColor()
    document.removeEventListener(e.type, window.mouseUpHandler)
  }
}

function raiseThreshold(){
  window.focusedNode.threshold++
  Canvas.redraw()
}

function lowerThreshold(){
  if(window.focusedNode && window.focusedNode.threshold > 1) {
    window.focusedNode.threshold--
    Canvas.redraw()
  }
}

function getNode(x,y){
  for (node of network.nodes){
    if (Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2) < 20) {
      return node
    }
  }
}

function focusOnSelection(e){
  window.focusedNode = getNode(e.offsetX,e.offsetY)
  if (window.focusedNode) {
    Canvas.focusNode(window.focusedNode)
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
    node = new Node(e.offsetX, e.offsetY);
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

function handlePlay(){
  if (window.interval){
    clearInterval(window.interval);
    window.interval = undefined;
    document.querySelector('#play_button').innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
  }
  else {
    document.querySelector('#play_button').innerHTML = '<i class="fa fa-stop" aria-hidden="true"></i>'
    window.interval = setInterval(Canvas.update.bind(null), 1000)
  }
}

function handleNavUp(){
  Canvas.navUp();
}
function handleNavDown(){
  Canvas.navDown();
}
function handleNavLeft(){
  Canvas.navLeft();
}
function handleNavRight(){
  Canvas.navRight();
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

function saveNetwork(){
  const blob = new Blob([network.toJSON()], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "network.txt");
}

function loadFile(){
  let file = document.querySelector("input").files[0];
  let reader = new FileReader();
  reader.onload = function(e) {
    const jsonString = reader.result;
    network = Network.fromJSON(jsonString);
    Canvas.redraw();
  };
  reader.readAsText(file);
}

function assignAuxiliaryButtonHandlers(){
  document.querySelector("#clear_button").addEventListener("click", function(){network.reset(); Canvas.clearStates(); Canvas.redraw();})
  document.querySelector("#play_button").addEventListener("click", handlePlay)
  document.querySelector("#advance_button").addEventListener("click", Canvas.update);
  document.querySelector("#raise_threshold").addEventListener("click", function(){raiseThreshold(); Canvas.focusNode();})
  document.querySelector("#lower_threshold").addEventListener("click", function(){lowerThreshold(); Canvas.focusNode();})
  document.querySelector("#save_button").addEventListener("click", saveNetwork);
  document.querySelector("#load_button").addEventListener("click", function(){document.querySelector("#upload_file").click()});
  document.querySelector("#upload_file").addEventListener("change", loadFile);
  document.querySelector("#up_button").addEventListener("click", handleNavUp);
  document.querySelector("#down_button").addEventListener("click", handleNavDown);
  document.querySelector("#left_button").addEventListener("click", handleNavLeft);
  document.querySelector("#right_button").addEventListener("click", handleNavRight);
}

module.exports = {
  initialize: function(canvasManager){ Canvas = canvasManager},
  assignButtonHandlers: function (){
    assignEditModeHandlers();
    assignAuxiliaryButtonHandlers();
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