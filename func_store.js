const funcs =  [
  { name: "None", func: function(){} },
  { name: "Alert", func: alert.bind(null, 'Alert!') },
  { name: "Log", func: console.log.bind(null, 'Log!') },
  { name: "Move!", func: function(){window.critter.stepForward()} },
  { name: "Right!", func: function(){window.critter.turnRight()} },
  { name: "Left!", func: function(){window.critter.turnLeft()} }
];

for (funcData of funcs) {
  funcData.func.tagName = funcData.name;
};

const FuncStore = {
  funcs: funcs
};

FuncStore.getFunc = function(funcName){
  for (funcData of funcs){
    if (funcName == funcData.name) { return funcData.func; }
  }
  return funcs[0].func
};

module.exports = FuncStore;
