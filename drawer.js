// Manipulates canvas context

Drawer = {}

Drawer.drawNode = function (canvas, node){
  ctx = canvas.getContext('2d');
  drawNodeCircle(ctx, node)
  for (let connection of node.connections.to) {
    drawConnection(ctx, connection)
  }
}

function drawNodeCircle(ctx, node){
  ctx.beginPath()
  ctx.fillStyle = "black"
  ctx.lineWidth = node.threshold * 3 - 2
  ctx.arc(node.x,node.y,20,0,2 * Math.PI)
  ctx.stroke()
  ctx.closePath()
}

function drawSelfConnection(ctx, connection){
  let connectionMagnitude = connection.strength > 0 ? connection.strength : (-1 * connection.strength)
  let arcStartX = connection.toNode.x + radius(connection.toNode) * Math.cos(Math.PI/(6))
  let arcStartY = connection.toNode.y + radius(connection.toNode) * Math.cos(Math.PI/(6))
  let arcEndX = connection.toNode.x - 2 + radius(connection.toNode) * Math.sin(Math.PI/(6))
  let arcEndY = connection.toNode.y + radius(connection.toNode) * Math.cos(Math.PI/(6))
  ctx.arc(arcStartX, arcStartY, 10, 1.5 * Math.PI, Math.PI)
  drawArrowHead(arcEndX, arcEndY, .4, 6)
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
  return (20 + (3 * node.threshold)/2)
}

function drawOtherConnection(ctx, connection){
  let connectionMagnitude = connection.strength > 0 ? connection.strength : (-1 * connection.strength)
  let angle = getAngle(connection.fromNode.x, connection.fromNode.y, connection.toNode.x, connection.toNode.y)
  let length = getLength(connection.fromNode.x, connection.fromNode.y, connection.toNode.x, connection.toNode.y)
  let xterminas = connection.toNode.x + (radius(connection.toNode)) * Math.cos(angle)
  let yterminas = connection.toNode.y + (radius(connection.toNode)) * Math.sin(angle)
  let xinitiatus = connection.toNode.x + ((length - radius(connection.fromNode)) * Math.cos(angle))
  let yinitiatus = connection.toNode.y + ((length - radius(connection.fromNode)) * Math.sin(angle))
  drawArrowFrom(xinitiatus,yinitiatus,xterminas,yterminas,connectionMagnitude)
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
  console.log(angle)
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
  drawArrowHead(xterminas,yterminas, angle / Math.PI, 3 + 3 * width)
  // ctx.lineTo(xterminas + (3 + 3 * width) * Math.cos(angle - Math.PI/(5 + width)), yterminas + (3 + 3 * width) * Math.sin(angle - Math.PI/(5 + width)));
  // ctx.moveTo(xterminas, yterminas);
  // ctx.lineTo(xterminas + (3 + 3 * width) * Math.cos(angle + Math.PI/(5 + width)), yterminas + (3 + 3 * width) * Math.sin(angle + Math.PI/(5 + width)));
  ctx.stroke()
  ctx.strokeStyle = 'black'
}

Drawer.highlight = function(node){
  ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.strokeStyle = "blue"
  ctx.arc(node.x,node.y, radius(node) + 3, 0,2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function fillNode(color){
  ctx.arc(node.x,node.y,18,0,2 * Math.PI)
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