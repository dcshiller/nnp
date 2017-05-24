var Canvas;

function raiseThreshold(){
  window.focusedNode.threshold++
  Canvas.redraw()
}

function lowerThreshold(){
  if(window.focusedNode && window.focusedNode.threshold > 1) {
    window.focusedNode.threshold--
    Canvas.redraw()
  }
}
const NodePanelController = {
  initialize: function(canvasManager){
    Canvas = canvasManager;
    document.querySelector("#raise_threshold").addEventListener("click", function(){raiseThreshold(); Canvas.focusNode();})
    document.querySelector("#lower_threshold").addEventListener("click", function(){lowerThreshold(); Canvas.focusNode();})
  }
}

module.exports = NodePanelController;