var Canvas;

function handlePlay(){
  if (window.interval){
    clearInterval(window.interval);
    window.interval = undefined;
    document.querySelector('#play_button').innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
  }
  else {
    document.querySelector('#play_button').innerHTML = '<i class="fa fa-stop" aria-hidden="true"></i>'
    window.interval = setInterval(Canvas.update.bind(null), 1000)
  }
}

const TimeController = {
  initialize: function(canvasManager){
    Canvas = canvasManager;
    document.querySelector("#play_button").addEventListener("click", handlePlay )
    document.querySelector("#advance_button").addEventListener("click", Canvas.update);
  }
}

module.exports = TimeController;