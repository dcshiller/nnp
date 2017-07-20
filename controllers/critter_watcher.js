const canvas = require('../critter_canvas_manager.js')

const CritterWatcher = {
  initialize: function(critter){
      this.critter = critter;
      canvas.buildCam();
      canvas.drawCritter(window.critter);
      setInterval(checkForUpdate, 50);
  }
};

function handleUpdate(i){
  if ( !i ) { i = 0; CritterWatcher.critter.startAction();  }
  if (i < 5) { setTimeout( function(){canvas.drawCritter( CritterWatcher.critter, i ); handleUpdate(i + 1) }, 100 ) }
  else { CritterWatcher.critter.endAction(); }
};

function needsRerender(){
  return CritterWatcher.critter.ready();
};

function checkForUpdate(){
  if (needsRerender()){ handleUpdate() }
}

module.exports = CritterWatcher;
