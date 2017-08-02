const CritterDrawer = {};

function getBillyImage(critter){
  var billyImage = new Image();
  billyImage.src = getImage(critter);
  billyImage.height = 100;
  billyImage.width = 100;
  billyImage.style.background = "grey"
  return billyImage
};

function getImage(critter){
  if (forward(critter)) { return "images/billy.png"; }
  else { return "images/billyturn.png"; }
}

function adjustContextForFacing(ctx, critter, i){
  if (critter.facing.x != 0) { ctx.rotate( critter.facing.x * Math.PI / 2); }
  if (critter.facing.y != 0) { ctx.rotate( (critter.facing.y + 1) / 2 * Math.PI ); }
  if (turnRight(critter)) { ctx.rotate( Math.PI * centerWeight(i) / 8) }
  if (turnLeft(critter)) { ctx.rotate( -1 * Math.PI * centerWeight(i) / 8) }
}

function centerWeight(i){
  if (i == 0) return 0
  if (i == 1) return 2
  if (i >= 2) return 4
}

function adjustContextForPosition(ctx, critter, i, canvas){
  ctx.translate(canvas.width/2, canvas.height/2);
  translate = getActionTranslate(critter, i);
  ctx.translate(translate.x, translate.y);
}

function getTranslateForward(critter, i) {
  return {
    x: critter.position.x * 8 + i * 2 * critter.facing.x,
    y: critter.position.y * 8 + i * 2 * critter.facing.y
  }
}

function forward(critter) {
  return critter.ongoingAction && critter.ongoingAction.tagName == "stepForward";
};

function turnRight(critter) {
  return critter.ongoingAction && critter.ongoingAction.tagName == "turnRight";
};

function turnLeft(critter) {
  return critter.ongoingAction && critter.ongoingAction.tagName == "turnLeft";
};

function getActionTranslate(critter, i){
  if (forward(critter)) { return getTranslateForward(critter, i) }
  else { return getTranslateForward(critter, 0) }
}

const drawFrame = function(ctx, critter, billyImage, i, canvas){
  adjustContextForPosition(ctx, critter, i, canvas);
  adjustContextForFacing(ctx, critter, i);
  ctx.drawImage( billyImage, 100 * (i % 4), 0, 100, 100, -20, -20, 40, 40);
};

CritterDrawer.drawCritter = function(critter, i, canvas){
  ctx = canvas.getContext('2d');
  var billyImage = getBillyImage(critter);
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(ctx, critter, billyImage, i, canvas);
  ctx.restore();
};

module.exports = CritterDrawer;
