// Manipulates canvas context

const Drawer = { offsetter: require('./offsetter.js')}

function aj(num){ return (Drawer.offsetter.proportion * num) }

Drawer.drawNode = function (canvas, node){
  ctx = canvas.getContext('2d');
  drawNodeCircle(ctx, node)
  for (let connection of node.connections.to) {
    drawConnection(ctx, connection)
  }
}

const offset = Drawer.offsetter.offset;

Drawer.drawNodeShadow = function(canvas, x, y){
  ctx = canvas.getContext('2d');
  const coords = Drawer.offsetter.offset({x: x, y: y})
  ctx.beginPath();
  ctx.arc(coords.x, coords.y, aj(10), 0, 2 * Math.PI)
  ctx.stroke();
  ctx.closePath();
}

function drawNodeCircle(ctx, node){
  ctx.beginPath()
  ctx.fillStyle = "black"
  ctx.lineWidth = node.threshold * 3 - 2
  let coords = offset(node);
  ctx.arc(coords.x, coords.y, aj(20), 0, 2 * Math.PI)
  ctx.stroke()
  ctx.closePath()
}

function drawSelfConnection(ctx, connection){
  let toCoords = offset(connection.toNode)
  let connectionMagnitude = connection.strength > 0 ? aj(connection.strength) : aj(-1 * connection.strength)
  let arcStartX = toCoords.x + radius(connection.toNode) * Math.cos(Math.PI/(6))
  let arcStartY = toCoords.y + radius(connection.toNode) * Math.cos(Math.PI/(6))
  let arcEndX = toCoords.x - 2 + radius(connection.toNode) * Math.sin(Math.PI/(6))
  let arcEndY = toCoords.y + radius(connection.toNode) * Math.cos(Math.PI/(6))
  ctx.arc(arcStartX, arcStartY, aj(10), 1.5 * Math.PI, Math.PI)
  drawArrowHead(arcEndX, arcEndY, .4, aj(6))
  // ctx.lineTo(arcEndX, arcEndY)
  ctx.stroke()
}

function drawArrowHead(startX, startY, angle, length){
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX + length * Math.cos((angle + .2) * Math.PI), startY + length * Math.sin((angle + .2) * Math.PI));
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX + length * Math.cos((angle - .2) * Math.PI), startY + length * Math.sin((angle - .2) *  Math.PI));
}

function radius(node){
  return aj(20 + (3 * node.threshold)/2)
}

function drawOtherConnection(ctx, connection){
  let toCoords = offset(connection.toNode);
  let fromCoords = offset(connection.fromNode);
  let connectionMagnitude = connection.strength > 0 ? connection.strength : (-1 * connection.strength)
  let angle = getAngle(fromCoords.x, fromCoords.y, toCoords.x, toCoords.y)
  let length = getLength(fromCoords.x, fromCoords.y, toCoords.x, toCoords.y)
  let xterminas = toCoords.x + (radius(connection.toNode)) * Math.cos(angle)
  let yterminas = toCoords.y + (radius(connection.toNode)) * Math.sin(angle)
  let xinitiatus = toCoords.x + ((length - radius(connection.fromNode)) * Math.cos(angle))
  let yinitiatus = toCoords.y + ((length - radius(connection.fromNode)) * Math.sin(angle))
  drawArrowFrom(xinitiatus,yinitiatus,xterminas,yterminas, aj(connectionMagnitude))
}

function drawConnection(ctx, connection){
  ctx.beginPath()
  let connectionMagnitude = connection.strength > 0 ? connection.strength : (-1 * connection.strength)
  ctx.lineWidth = connectionMagnitude
  ctx.strokeStyle = connection.strength > 0 ? 'black' : 'red'
  if (connection.toSelf()){
    drawSelfConnection(ctx, connection)
  }
  else {
    drawOtherConnection(ctx, connection)
  }
  ctx.closePath()
}

function getAngle(x1,y1,x2,y2){
  let xdiff = x1 - x2
  let ydiff = y1 - y2
  let angle = Math.atan2((ydiff),(xdiff))
  return angle
}

function getLength(x1,y1,x2,y2){
  let xdiff = x1 - x2
  let ydiff = y1 - y2
  let length = Math.sqrt(ydiff ** 2 + xdiff ** 2)
  return length
}

function drawArrowFrom(xinitiatus,yinitiatus,xterminas,yterminas,width){
  let angle = getAngle(xinitiatus, yinitiatus, xterminas, yterminas)
  ctx.moveTo(xinitiatus,yinitiatus)
  ctx.lineTo(xterminas, yterminas)
  drawArrowHead(xterminas,yterminas, angle / Math.PI, aj(3) + 3 * width)
  ctx.stroke()
  ctx.strokeStyle = 'black'
}

Drawer.highlight = function(canvas, node){
  ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.strokeStyle = "blue"
  ctx.arc(offset(node).x,offset(node).y, radius(node) + 3, 0,2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function fillNode(color){
  ctx.arc(offset(node).x,offset(node).y,aj(18),0,2 * Math.PI)
  ctx.fillStyle = color
  ctx.fill()
}

Drawer.fillInNode = function (canvas, node){
  ctx = canvas.getContext('2d');
  ctx.beginPath()
  if(node.lastState){
    fillNode("orange")
  }
  else {
    fillNode("white")
  }
  ctx.closePath()
}

module.exports = Drawer