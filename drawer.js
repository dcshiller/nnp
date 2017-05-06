Drawer = {}

Drawer.drawNode = function (canvas, node){
  ctx = canvas.getContext('2d');
  ctx.beginPath()
  ctx.fillStyle = "black"
  ctx.lineWidth = node.threshold * 3 - 2
  ctx.arc(node.x,node.y,20,0,2 * Math.PI)
  ctx.stroke()
  ctx.closePath()
  ctx.beginPath()
  for (connection of node.connections) {
    let connectedNode = connection[0]
    let connectionStrength = connection[1]
    ctx.lineWidth = connectionStrength
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
    ctx.lineTo(xterminas - (3 + 3 * connectionStrength) * Math.cos(angle - Math.PI/6), yterminas - (3 + 3 * connectionStrength) * Math.sin(angle - Math.PI/6));
    ctx.moveTo(xterminas, yterminas);
    ctx.lineTo(xterminas - (3 + 3 * connectionStrength) * Math.cos(angle + Math.PI/6), yterminas - (3 + 3 * connectionStrength) * Math.sin(angle + Math.PI/6));
    ctx.stroke()
  }
  ctx.closePath()
}

Drawer.fillInNode = function (canvas, node){
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

module.exports = Drawer