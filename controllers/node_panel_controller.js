var Canvas;
var FuncStore = require('../helpers/func_store.js');

const NodeTypes = {
  Node: require('../models/node.js'),
  FunctionalNode: require('../models/functional_node.js'),
  NoisyNode: require('../models/noisy_node.js')
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
  const newNodeTypeName = document.querySelector('#node_type').value;
  const newNodeType = NodeTypes[newNodeTypeName];
  const newNode = window.focusedNode.convertTo(newNodeType);
  window.network.exclude(window.focusedNode);
  window.network.include(newNode);
  window.focusedNode = newNode;
  Canvas.focusNode();
};

function changeNodeFunc(){
  const newNodeFuncName = document.querySelector('#node_func_select').value;
  const newNodeFunc = FuncStore.getFunc(newNodeFuncName);
  window.focusedNode.func = newNodeFunc;
};

function adjustNodeProbabilityRange(e){
  const probability = document.querySelector('#prob_range').value;
  document.querySelector('#prob_value').innerText = probability;
  window.focusedNode.prob = probability;
  e.stopPropagation();
};

function initialize(canvasManager){
  Canvas = canvasManager;
  document.querySelector("#raise_threshold").onclick = doBoth(raiseThreshold, Canvas.focusNode);
  document.querySelector("#lower_threshold").onclick = doBoth(lowerThreshold, Canvas.focusNode);
  document.querySelector("#node_type").onchange = changeNodeType;
  document.querySelector("#node_func_select").onchange = changeNodeFunc;
  document.querySelector("#prob_range").onchange = adjustNodeProbabilityRange;
  document.querySelector("#prob_range").onmousedown = adjustNodeProbabilityRange;
};

const NodePanelController = {
  initialize: initialize
};

module.exports = NodePanelController;
