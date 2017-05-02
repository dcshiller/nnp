var Node = require('./node.js');
var Network = require('./network.js');
require('./starting_network.js');

function drawNode(canvas, node){
  ctx = canvas.getContext('2d');
  ctx.beginPath()
  ctx.fillStyle = "black"
  ctx.arc(node.x,node.y,20,0,2 * Math.PI)
  node.connections.forEach(function(connectedNode){
    ydiff = node.y - connectedNode.y
    xdiff = node.x - connectedNode.x
    angle = Math.atan2((ydiff),(xdiff))
    length = Math.sqrt(ydiff ** 2 + xdiff ** 2)
    xterminas = node.x - (20 * Math.cos(angle))
    yterminas = node.y - (20 * Math.sin(angle))
    xinitiatus = node.x - ((length - 20) * Math.cos(angle))
    yinitiatus = node.y - ((length - 20) * Math.sin(angle))
    ctx.moveTo(xinitiatus,yinitiatus)
    ctx.lineTo(xterminas, yterminas)
    ctx.lineTo(xterminas - 6 * Math.cos(angle - Math.PI/6), yterminas - 6 * Math.sin(angle - Math.PI/6));
    ctx.moveTo(xterminas, yterminas);
    ctx.lineTo(xterminas - 6 * Math.cos(angle + Math.PI/6), yterminas - 6 * Math.sin(angle + Math.PI/6));
  })
  ctx.stroke()
  ctx.closePath()
}

function fillInNode(canvas, node){
  ctx = canvas.getContext('2d');
  if(node.lastState){
    ctx.beginPath()
    ctx.arc(node.x,node.y,18,0,2 * Math.PI)
    ctx.fillStyle = "orange"
    ctx.fill()
    ctx.closePath()
  }
  else {
    ctx.beginPath()
    ctx.arc(node.x,node.y,18,0,2 * Math.PI)
    ctx.fillStyle = "white"
    ctx.fill()
    ctx.closePath()
  }
}

function createCanvas(id){
  var canvas = document.createElement("canvas")
  canvas.setAttribute('width', '1000');
  canvas.setAttribute('height', '500');
  if (id) { canvas.setAttribute("id", id); }
  document.querySelector('body').appendChild(canvas)
  return canvas
}

function redrawCanvas(){
  document.querySelector('canvas#network').remove()
  initializeCanvas()
}

function initializeCanvas(){
  var canvas = createCanvas("network")
  network.nodes.forEach(function(node){
    drawNode(canvas, node)
  })
}

function updateCanvas(canvas){
  network.updateAll()
  network.callWithNodes( fillInNode.bind(null, canvas) )
  network.rememberAll()
}

document.addEventListener("DOMContentLoaded", function(){
  initializeCanvas()
  var canvas = createCanvas()
  updateCanvas(canvas)
  setInterval(updateCanvas.bind(null, canvas), 1000)
  
  Array.prototype.slice.call(document.querySelectorAll('li')).forEach(function(el){
    el.addEventListener("click", function(e){ 
      Array.from(document.querySelectorAll('li')).forEach(
        function(ele){ele.classList = ele.classList.value.replace("selected", "")}
      )
      e.target.classList += 'selected';
      window.editMode = e.target.getAttribute('data-mode')
      })
  })
  document.querySelector("#clear_button").addEventListener("click", function(){network.nodes = []; redrawCanvas();})
})

function getNode(x,y){
  for (node of network.nodes){
    if (Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2) < 20) {
      return node
    }
  }
}

function drop(node, e){
  // if (Math.sqrt((node.x - e.clientX) ** 2 + (node.y - e.clientY) ** 2) < 10) {
  //   node.on()
  //   node.remember()
  //   document.removeEventListener(e.type, arguments.callee)
  // }
  // else {
  if (e.target.tagName == "CANVAS"){
    node.x = e.clientX
    node.y = e.clientY
    redrawCanvas()
    document.removeEventListener(e.type, window.mouseUpHandler)
  }
  // }
}

function connect(node, e){
  otherNode = getNode(e.clientX,e.clientY)
  otherNode.pointFrom(node)
  redrawCanvas()
  document.removeEventListener(e.type, window.mouseUpHandler)
}

document.addEventListener("mousedown", function(e){
  if (e.target.tagName == "CANVAS") {
    switch (window.editMode) {
      case "move":
        node = getNode(e.clientX,e.clientY)
        window.mouseUpHandler = drop.bind(this, node)
        document.addEventListener("mouseup", window.mouseUpHandler)
        break;
      case "place":
        node = new Node(e.clientX, e.clientY, "charlie");
        network.nodes.push(node);
        redrawCanvas();
        break;
      case "toggle":
        node = getNode(e.clientX,e.clientY)
        node.lastState ? node.off() : node.on()
        node.remember()
        break;
      case "delete":
        node = getNode(e.clientX,e.clientY)
        network.nodes.splice(network.nodes.indexOf(node),1)
        network.nodes.forEach(function(possibleConnection){
          if(possibleConnection.connections.indexOf(node) >= 0){ 
            possibleConnection.connections.splice(possibleConnection.connections.indexOf(node),1)
          }
        })
        redrawCanvas()
        break;
      case "connect":
        node = getNode(e.clientX,e.clientY)
        window.mouseUpHandler = connect.bind(this, node)
        document.addEventListener("mouseup", window.mouseUpHandler)
        break;
    }
  }
})

