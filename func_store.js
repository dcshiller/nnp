const funcs =  [
  { name: "None", func: function(){} },
  { name: "Alert", func: alert },
  { name: "Log", func: console.log }
];

for (funcData of funcs) {
  funcData.func.tagName = funcData.name;
};

const FuncStore = {
  funcs: funcs
};

FuncStore.getFunc = function(funcName){
  const tag = func.tagName;
  for (funcData of funcs){
    if (funcName == fundData.name) { return funcData.func; }
  }
  return funcs[0].func
};

module.exports = FuncStore;
