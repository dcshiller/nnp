// Manipulates canvas context

const Drawer = { offsetter: require('../helpers/offsetter.js')}

function aj(num){ return (Drawer.offsetter.proportion * num) }

Drawer.drawNode = function (canvas, node){
  ctx = canvas.getContext('2d');
  drawNodeCircle(ctx, node);
  for (let connection of node.connections.to) {
    drawConnection(ctx, connection);
  }
}

Drawer.drawNodeName = function(canvas, node) {
  if (Drawer.offsetter.proportion <= .5) { return }
  const ctx = canvas.getContext('2d');
  const coords = Drawer.offsetter.offset(node);
  ctx.beginPath();
  ctx.fillText(node.name.slice(0,3), coords.x - 5, coords.y + 3);
  ctx.stroke();
  ctx.closePath();
}

const offset = Drawer.offsetter.offset;

Drawer.drawNodeShadow = function(canvas, x, y){
  const ctx = canvas.getContext('2d');
  const coords = Drawer.offsetter.offset({x: x, y: y});
  ctx.beginPath();
  ctx.arc(coords.x, coords.y, aj(10), 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function drawNodeCircle(ctx, node){
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.lineWidth = node.threshold * 3 - 2;
  const coords = offset(node);
  ctx.arc(coords.x, coords.y, aj(20), 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function drawSelfConnection(ctx, connection){
  const toCoords = offset(connection.toNode);
  const connectionMagnitude = connection.strength > 0 ? aj(connection.strength) : aj(-1 * connection.strength);
  const startCoords = {
    x: toCoords.x + radius(connection.toNode) * Math.cos(Math.PI/6),
    y: arcStartY = toCoords.y + radius(connection.toNode) * Math.cos(Math.PI/6)
  } 
  const endCoords = {
    x: toCoords.x - 2 + radius(connection.toNode) * Math.sin(Math.PI/6),
    y: toCoords.y + radius(connection.toNode) * Math.cos(Math.PI/6)
  }
  ctx.arc(startCoords.x, startCoords.y, aj(10), 1.5 * Math.PI, Math.PI);
  drawArrowHead({ x: endCoords.x - (Drawer.offsetter.proportion - 1) * 2.4, y: endCoords.y}, .4, aj(6));
  ctx.stroke();
}

function drawArrowHead(startCoords, angle, length){
  ctx.moveTo(startCoords.x, startCoords.y);
  ctx.lineTo(startCoords.x + length * Math.cos((angle + .2) * Math.PI), startCoords.y + length * Math.sin((angle + .2) * Math.PI));
  ctx.moveTo(startCoords.x, startCoords.y);
  ctx.lineTo(startCoords.x + length * Math.cos((angle - .2) * Math.PI), startCoords.y + length * Math.sin((angle - .2) *  Math.PI));
}

function radius(node){
  return aj(20 + (3 * node.threshold)/2);
}

function drawOtherConnection(ctx, connection){
  const toCoords = offset(connection.toNode);
  const fromCoords = offset(connection.fromNode);
  const connectionMagnitude = connection.strength > 0 ? connection.strength : (-1 * connection.strength);
  const bCoords = getBetweenCoords(fromCoords, toCoords);
  drawArrowFrom(bCoords.fromCoords, bCoords.toCoords, aj(connectionMagnitude));
}

function getBetweenCoords(fromCoords, toCoords){
  const angle = getAngle(fromCoords, toCoords);
  const length = getLength(fromCoords, toCoords);
  const xterminas = toCoords.x + (radius(connection.toNode)) * Math.cos(angle);
  const yterminas = toCoords.y + (radius(connection.toNode)) * Math.sin(angle);
  const xinitiatus = toCoords.x + ((length - radius(connection.fromNode)) * Math.cos(angle));
  const yinitiatus = toCoords.y + ((length - radius(connection.fromNode)) * Math.sin(angle));
  return { fromCoords: {x: xinitiatus, y: yinitiatus}, toCoords: {x: xterminas, y: yterminas} }
}

function drawConnection(ctx, connection){
  ctx.beginPath();
  const connectionMagnitude = connection.strength > 0 ? connection.strength : (-1 * connection.strength);
  ctx.lineWidth = connectionMagnitude;
  ctx.strokeStyle = connection.strength > 0 ? 'black' : 'red';
  if (connection.toSelf()){
    drawSelfConnection(ctx, connection);
  }
  else {
    drawOtherConnection(ctx, connection);
  }
  ctx.strokeStyle = "black";
  ctx.closePath();
}

Drawer.drawArrowFromNode = function(canvas, node, coords){
  ctx = canvas.getContext('2d');
  ctx.beginPath();
  const toCoords = coords;
  const fromCoords = offset(node);
  const angle = getAngle(fromCoords, toCoords);
  const length = getLength(fromCoords, toCoords);
  offsetFromCoords = {
          x: toCoords.x + ((length - radius(node)) * Math.cos(angle)),
          y: toCoords.y + ((length - radius(node)) * Math.sin(angle))
  }
  drawArrowFrom(offsetFromCoords, toCoords, 1);
  ctx.closePath();
}

function getAngle(fromCoords, toCoords){
  const xdiff = fromCoords.x - toCoords.x;
  const ydiff = fromCoords.y - toCoords.y;
  const angle = Math.atan2((ydiff),(xdiff));
  return angle
}

function getLength(fromCoords, toCoords){
  const xdiff = fromCoords.x - toCoords.x;
  const ydiff = fromCoords.y - toCoords.y;
  const length = Math.sqrt(ydiff ** 2 + xdiff ** 2);
  return length;
}

function drawArrowFrom(fromCoords, toCoords, width){
  const angle = getAngle(fromCoords, toCoords)
  ctx.moveTo(fromCoords.x, fromCoords.y);
  ctx.lineTo(toCoords.x, toCoords.y);
  drawArrowHead(toCoords, angle / Math.PI, aj(3) + 3 * width);
  ctx.stroke();
  ctx.strokeStyle = 'black';
}

Drawer.highlight = function(canvas, node){
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.arc(offset(node).x,offset(node).y, radius(node) + 3, 0,2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function fillNode(color){
  ctx.arc(offset(node).x,offset(node).y,aj(18),0,2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

Drawer.fillInNode = function (canvas, node){
  ctx = canvas.getContext('2d');
  ctx.beginPath();
  const color = node.lastState ? "orange" : "white"
  fillNode(color);
  ctx.closePath();
}

module.exports = Drawer
