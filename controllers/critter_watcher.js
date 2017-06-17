const canvas = require('../critter_canvas_manager.js')

const CritterWatcher = {
  initialize: function(critter){
      this.critter = critter;
      canvas.buildCam();
      canvas.drawCritter(window.critter);
      setInterval(checkForUpdate, 50);
  },
  timeStamp: new Date()
};

function handleUpdate(i){
  !i && (i = 0)
  if (i < 5) { setTimeout( function(){canvas.drawCritter( CritterWatcher.critter, i ); handleUpdate(i + 1) }, 100 ) }
  CritterWatcher.timeStamp = window.critter.timeStamp
};

function needsRerender(){
  return window.critter.timeStamp > CritterWatcher.timeStamp;
};


function checkForUpdate(){
  if(needsRerender()){
    handleUpdate()
  }
}

module.exports = CritterWatcher;