const Canvas = require('./canvas_manager.js');
require('./starting_network.js');
const Interface = require('./interface.js');

document.addEventListener("DOMContentLoaded", function(){
  Canvas.draw();
  Canvas.buildStateCanvas();
  Canvas.buildSelectionCanvas();
  Canvas.update();
  Interface.initialize(Canvas);
})

