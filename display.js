var Node = require('./node.js');
var Network = require('./network.js');
var Drawer = require('./drawer.js');
var Canvas = require('./canvas_manager.js');
require('./starting_network.js');
var Interface = require('./interface.js');
window.Network = Network;

document.addEventListener("DOMContentLoaded", function(){
  Canvas.draw()
  Canvas.buildStateCanvas()
  Canvas.buildSelectionCanvas()
  Canvas.update()
  Interface.initialize(Canvas)
  Interface.assignButtonHandlers()
  Interface.assignMouseHandlers()
})

