
const Canvas = require('./canvas_manager.js');
require('./starting_network.js');
const Interface = require('./interface.js');
const Critter = require('./models/critter.js');
window.critter = new Critter();
require('./starting_network.js');
var CritterWatcher = require('./controllers/critter_watcher.js')

document.addEventListener("DOMContentLoaded", function(){
  Canvas.draw();
  Canvas.buildStateCanvas();
  Canvas.buildSelectionCanvas();
  Canvas.update();
  CritterWatcher.initialize(window.critter);
  Interface.initialize(Canvas);
})
