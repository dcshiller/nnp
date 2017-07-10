const FuncStore = require('./func_store')
const PanelDrawer = {
  canvas: null,
}

function writeConnectionDetails(connection, list){
  const listTag = document.createElement("li");
  listTag.innerHTML = `${connection.fromNode.name} <i class="fa fa-long-arrow-right" aria-hidden="true"></i> ${connection.toNode.name}`;
  // listTag.innerHTML = `${connection.fromNode.name} → ${connection.toNode.name}`;
  const raiseButton = document.createElement("button");
  const lowerButton = document.createElement("button");
  const removeButton = document.createElement("button");
  const strength = document.createElement("span");
  const buttonBox = document.createElement("div");
  buttonBox.classList += "button_box";
  strength.innerHTML = connection.strength;
  raiseButton.innerHTML = "<i class='fa fa-plus' aria-hidden='true'></i>";
  lowerButton.innerHTML = "<i class='fa fa-minus' aria-hidden='true'></i>";
  removeButton.innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>";
  raiseButton.addEventListener("click", function(e){connection.increaseStrength(); PanelDrawer.canvas.redraw(); PanelDrawer.canvas.focusNode();});
  lowerButton.addEventListener("click", function(e){connection.decreaseStrength(); PanelDrawer.canvas.redraw(); PanelDrawer.canvas.focusNode();});
  removeButton.addEventListener("click", function(e){connection.remove(); PanelDrawer.canvas.redraw(); PanelDrawer.canvas.focusNode();});
  buttonBox.appendChild(strength);
  buttonBox.appendChild(raiseButton);
  buttonBox.appendChild(lowerButton);
  buttonBox.appendChild(removeButton);
  listTag.appendChild(buttonBox);
  document.querySelector(list).appendChild(listTag);
}

function drawRange(node){
  if (node.constructor.name == 'NoisyNode') {
    document.querySelector('.row.probability').classList.remove('hidden')
    const nodeRange = document.querySelector(`input[type="range"`);
    const nodeRangeValue = document.querySelector(`#prob_value`);
    nodeRange.value = nodeRangeValue.innerHTML = node.prob || 0.5;
  }
  else {
    document.querySelector('.row.probability').classList.add('hidden')
  }
}

function drawNodeType(node){
  const nodeType = document.querySelector(`#node_type [value='${node.constructor.name}']`);
  nodeType.selected = true;
}

function drawNodeFunc(node){
  if (node.constructor.name == "FunctionalNode") {
    document.querySelector('.row.function').classList.remove('hidden');
    const nodeFuncSelect = document.querySelector('#node_func_select');
    buildFuncOptions();
    const nodeFuncOpton = document.querySelector(`#node_func [value='${node.func.tagName}']`);
 }
 else {
   document.querySelector('.row.function').classList.add('hidden');
 }
}

function buildFuncOptions(){
  const select = document.querySelector('#node_func_select');
  select.innerHTML = "";
  for ( funcOption of FuncStore.funcs ){
    const newOption = document.createElement('option');
    newOption.name = funcOption.name;
    newOption.innerText = funcOption.name;
    select.appendChild(newOption);
  }
}

function drawConnections(node){
  document.querySelector("#afferent_connection_list").innerHTML = "";
  document.querySelector("#efferent_connection_list").innerHTML = "";
  for (const connection of node.connections.to){
    writeConnectionDetails(connection, "#afferent_connection_list");
  }
  for (const connection of node.connections.from){
    writeConnectionDetails(connection, "#efferent_connection_list");
  }
}

function drawNodeName(node){
  const nodeName = document.querySelector("#node_name");
  nodeName.value = node.name
  nodeName.oninput = function(){ node.name = document.querySelector("#node_name").value; PanelDrawer.canvas.redraw();}
}

function drawNodeThreshold(node){
  document.querySelector("#node_threshold").innerHTML = node.threshold;
}

PanelDrawer.updatePanel = function(node){
  for (el of document.querySelectorAll('#node_menu > *')){ el.classList.remove('hidden')}
  drawNodeName(node);
  drawNodeThreshold(node);
  drawNodeType(node);
  drawRange(node);
  drawNodeFunc(node);
  drawConnections(node);
}

PanelDrawer.clearPanel = function(){
  for (el of document.querySelectorAll('#node_menu > *')){ el.classList.add('hidden')}
}

PanelDrawer.initialize = function(canvas){
  this.canvas = canvas;
}
module.exports = PanelDrawer;
