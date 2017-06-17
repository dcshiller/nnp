var Canvas;

function raiseThreshold(){
  window.focusedNode.threshold++;
  Canvas.redraw();
};

function lowerThreshold(){
  if(window.focusedNode && window.focusedNode.threshold > 1) {
    window.focusedNode.threshold--;
    Canvas.redraw();
  }
};

function initialize(canvasManager){
  Canvas = canvasManager;
  document.querySelector("#raise_threshold").onclick = doBoth(raiseThreshold, Canvas.focusNode);
  document.querySelector("#lower_threshold").onclick = doBoth(lowerThreshold, Canvas.focusNode);
};

const NodePanelController = {
  initialize: initialize
}

module.exports = NodePanelController;