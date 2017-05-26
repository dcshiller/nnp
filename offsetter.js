const Offsetter = {
  x: 0,
  y: 0,
  proportion: 1
};

function aj(num){
  return Offsetter.proportion * num
}

function rj(num){
  return num / Offsetter.proportion
}

Offsetter.changeOffset = function(x, y){
  Offsetter.x += x
  Offsetter.y += y
}

Offsetter.changeProportion = function(diff){
  if (Offsetter.proportion + diff <= .1) { return }
  Offsetter.proportion += diff
  Offsetter.x += ((1000 / Offsetter.proportion) * ( 1 - (Offsetter.proportion / (Offsetter.proportion + .1)) ) ) / 2
  Offsetter.y += ((500 / Offsetter.proportion) * ( 1 - (Offsetter.proportion / (Offsetter.proportion + .1)) ) ) / 2
  // Offsetter.x = (((1000 + Offsetter.x) * Offsetter.proportion) / 2) * 0.1
  // Offsetter.y = (((500 + Offsetter.y) * Offsetter.proportion) / 2) * 0.1
}

Offsetter.offset = function(positionable){
  return {
           x: aj(positionable.x + Offsetter.x),
           y: aj(positionable.y + Offsetter.y)
         }
}

Offsetter.reset = function(positionable){
  return {
           x: rj(positionable.x - Offsetter.x),
           y: rj(positionable.y - Offsetter.y)
         }
}

module.exports = Offsetter;