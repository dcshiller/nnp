var Node = require('./node.js')
var Network = require('./network.js')
var Canvas;

function drop(node, e){
  if (e.target.tagName == "CANVAS"){
    node.x = e.clientX
    node.y = e.clientY
    Canvas.redraw()
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

// function select(){
//   window.focusedNode = getNode(e.clientX,e.clientY)
//   if (window.focusedNode) {
//     Canvas.focusNode(window.focusedNode)
//   }
// }

function connect(node, e){
  otherNode = getNode(e.clientX,e.clientY)
  if (otherNode && !node.pointsTo(otherNode)){
    node.pointTo(otherNode)
    Canvas.redraw()
  }
  document.removeEventListener(e.type, window.mouseUpHandler)
}

function getNode(x,y){
  for (node of network.nodes){
    if (Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2) < 20) {
      return node
    }
  }
}

function handleMoveMouseup(e){
  node = getNode(e.clientX,e.clientY)
  if (!node) { return }
  window.mouseUpHandler = drop.bind(this, node)
  document.addEventListener("mouseup", window.mouseUpHandler)
}

function handlePlaceMouseup(e){
  if (getNode(e.clientX, e.clientY)){
    window.focusedNode = getNode(e.clientX,e.clientY)
    if (window.focusedNode) {
      Canvas.focusNode(window.focusedNode)
    }
  }
  else {
    node = new Node(e.clientX, e.clientY, "charlie");
    window.focusedNode = node
    network.include(node);
    Canvas.focusNode();
    Canvas.redraw();
  }
}

function handleToggleMouseup(e){
  node = getNode(e.clientX,e.clientY)
  if (!node) { return }
  node.lastState ? node.off() : node.on()
  node.remember()
  Canvas.reColor()
}

function handleDeleteMouseup(e){
  node = getNode(e.clientX,e.clientY)
  if (!node) { return }
  network.nodes.splice(network.nodes.indexOf(node),1)
  for (possibleConnection of network.nodes){
    if(possibleConnection.pointsTo(node)){ 
      possibleConnection.removeConnection(node)
    }
  }
  Canvas.redraw()
}

function handleConnectMouseup(e){
  node = getNode(e.clientX,e.clientY)
  if (!node) { return }
  window.mouseUpHandler = connect.bind(this, node)
  document.addEventListener("mouseup", window.mouseUpHandler)
}

function handlePlay(){
  if (window.interval){
    clearInterval(window.interval);
    window.interval = undefined;
    document.querySelector('#play_button').innerHTML = "Play"
  }
  else {
    document.querySelector('#play_button').innerHTML = "Stop"
    window.interval = setInterval(Canvas.update.bind(null), 1000)
  }
}

module.exports = {
  initialize: function(canvasManager){ Canvas = canvasManager},
  assignButtonHandlers: function (){
    Array.prototype.slice.call(document.querySelectorAll('li')).forEach(function(el){
      el.addEventListener("click", function(e){ 
        Array.from(document.querySelectorAll('li')).forEach(
          function(ele){ele.classList = ele.classList.value.replace("selected", "")}
        )
        e.target.classList += 'selected';
        window.editMode = e.target.getAttribute('data-mode')
        })
    })
    document.querySelector("#clear_button").addEventListener("click", function(){network.reset(); Canvas.clearStates(); Canvas.redraw();})
    document.querySelector("#play_button").addEventListener("click", handlePlay)
    document.querySelector("#advance_button").addEventListener("click", Canvas.update);
    document.querySelector("#raise_threshold").addEventListener("click", function(){raiseThreshold(); Canvas.focusNode();})
    document.querySelector("#lower_threshold").addEventListener("click", function(){lowerThreshold(); Canvas.focusNode();})
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