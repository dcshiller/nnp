var Canvas;

const NodeTypes = {
  Node: require('../models/node.js'),
  FunctionalNode: require('../models/functional_node.js')
}

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

function changeNodeType(){
  const newNodeTypeName = document.querySelector('#node_type').value
  const newNodeType = NodeTypes[newNodeTypeName]
  const newNode = window.focusedNode.convertTo(newNodeType);
  window.network.exclude(window.focusedNode);
  window.network.include(newNode);
  window.focusedNode = newNode;
}

function initialize(canvasManager){
  Canvas = canvasManager;
  document.querySelector("#raise_threshold").onclick = doBoth(raiseThreshold, Canvas.focusNode);
  document.querySelector("#lower_threshold").onclick = doBoth(lowerThreshold, Canvas.focusNode);
  document.querySelector("#node_type").onchange = changeNodeType
};

const NodePanelController = {
  initialize: initialize
}

module.exports = NodePanelController;
