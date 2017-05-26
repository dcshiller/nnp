var Canvas;
const Network = require('../network')


function saveNetwork(){
  const blob = new Blob([network.toJSON()], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "network.txt");
}

function loadFile(){
  let file = document.querySelector("input").files[0];
  let reader = new FileReader();
  reader.onload = function(e) {
    const jsonString = reader.result;
    network = Network.fromJSON(jsonString);
    Canvas.redraw();
  };
  reader.readAsText(file);
}


const FileController = {
  initialize: function(canvasManager){
    Canvas = canvasManager;
    document.querySelector("#save_button").addEventListener("click", saveNetwork);
    document.querySelector("#load_button").addEventListener("click", function(){document.querySelector("#upload_file").click()});
    document.querySelector("#upload_file").addEventListener("change", loadFile);
  },
}

module.exports = FileController