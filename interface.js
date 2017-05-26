// Handles click events

var Controllers = new Set ([
                            require('./controllers/action_controller.js'),
                            require('./controllers/time_controller.js'),
                            require('./controllers/file_controller.js'),
                            require('./controllers/navigation_controller.js'),
                            require('./controllers/node_panel_controller.js')
                           ])
var Canvas;

function initializeInterface(canvasManager){
  Canvas = canvasManager;
  for (controller of Controllers) { controller.initialize(Canvas) }
}

module.exports = {
  initialize: initializeInterface,
}