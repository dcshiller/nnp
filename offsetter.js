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
  Offsetter.x += x;
  Offsetter.y += y;
}

Offsetter.changeProportion = function(diff){
  if (Offsetter.proportion + diff <= .1) { return }
  const oldProp = Offsetter.proportion;
  Offsetter.proportion += diff;
  Offsetter.x += (1000 / Offsetter.proportion) * ( 1 - (Offsetter.proportion / oldProp)) / 2;
  Offsetter.y += (500 / Offsetter.proportion) * ( 1 - (Offsetter.proportion / oldProp)) / 2;
}

Offsetter.offset = function(positionable){
  return {
           x: aj(positionable.x + Offsetter.x),
           y: aj(positionable.y + Offsetter.y)
         }
}

Offsetter.reset = function(positionable){
  return {
           x: rj(positionable.x) - Offsetter.x,
           y: rj(positionable.y) - Offsetter.y
         }
}

module.exports = Offsetter;