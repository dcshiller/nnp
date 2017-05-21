
const Offsetter = {
  x: 0,
  y: 0
};

Offsetter.changeOffset = function(x, y){
  Offsetter.x += x
  Offsetter.y += y
}


Offsetter.offset = function(positionable){
  return {
           x: (positionable.x + Offsetter.x),
           y: (positionable.y + Offsetter.y)
         }
}

Offsetter.reset = function(positionable){
  return {
           x: (positionable.x - Offsetter.x),
           y: (positionable.y - Offsetter.y)
         }
}


module.exports = Offsetter;