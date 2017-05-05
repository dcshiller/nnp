var Node = require('./node.js');
var Network = require('./network.js');
var Drawer = require('./drawer.js');
var Canvas = require('./canvas_manager.js');
require('./starting_network.js');

function assignEditListeners(){
  Array.prototype.slice.call(document.querySelectorAll('li')).forEach(function(el){
    el.addEventListener("click", function(e){ 
      Array.from(document.querySelectorAll('li')).forEach(
        function(ele){ele.classList = ele.classList.value.replace("selected", "")}
      )
      e.target.classList += 'selected';
      window.editMode = e.target.getAttribute('data-mode')
      })
  })
  document.querySelector("#clear_button").addEventListener("click", function(){network.reset(); Canvas.redraw();})
  document.querySelector("#play_button").addEventListener("click", handlePause)
  document.querySelector("#advance_button").addEventListener("click", Canvas.update)
}

function getNode(x,y){
  for (node of network.nodes){
    if (Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2) < 20) {
      return node
    }
  }
}

function drop(node, e){
  if (e.target.tagName == "CANVAS"){
    node.x = e.clientX
    node.y = e.clientY
    Canvas.redraw()
    document.removeEventListener(e.type, window.mouseUpHandler)
  }
  // }
}

function connect(node, e){
  otherNode = getNode(e.clientX,e.clientY)
  otherNode.pointFrom(node)
  Canvas.redraw()
  document.removeEventListener(e.type, window.mouseUpHandler)
}

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

function handleMoveMouseup(e){
  node = getNode(e.clientX,e.clientY)
  if (!node) { return }
  window.mouseUpHandler = drop.bind(this, node)
  document.addEventListener("mouseup", window.mouseUpHandler)
}

function handlePlaceMouseup(e){
  node = new Node(e.clientX, e.clientY, "charlie");
  network.nodes.push(node);
  Canvas.redraw();
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
  network.nodes.forEach(function(possibleConnection){
    if(possibleConnection.connections.indexOf(node) >= 0){ 
      possibleConnection.connections.splice(possibleConnection.connections.indexOf(node),1)
    }
  })
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
  }
  else {
    window.interval = setInterval(Canvas.update.bind(null), 1000)
  }
}

document.addEventListener("DOMContentLoaded", function(){
  Canvas.draw()
  Canvas.buildNodeCanvas()
  Canvas.buildStateCanvas()
  Canvas.update()
  assignEditListeners()
})

