const CritterDrawer = {};

CritterDrawer.drawCritter = function(critter, i, canvas){
  ctx = canvas.getContext('2d');
  var billy = new Image();
  billy.src = "images/billy.png";
  billy.height = 100;
  billy.width = 100;
  billy.style.background = "grey"
  !i && (i = 0)
  ctx.clearRect(  0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width/2,canvas.height/2);
  ctx.translate(critter.position.x * 8 + i * 2 * critter.facing.x, critter.position.y * 8 + i * 2 * critter.facing.y);
  if(critter.facing.x != 0){ ctx.rotate( critter.facing.x * Math.PI / 2); }
  if(critter.facing.y != 0){ ctx.rotate( (critter.facing.y + 1) / 2 * Math.PI );}
  // ctx.translate(- canvas.width/2, canvas.height/2);
  ctx.drawImage( billy, 100 * (i % 4), 0, 100, 100, -20, -20, 40, 40);
  ctx.restore();
};

module.exports = CritterDrawer;
