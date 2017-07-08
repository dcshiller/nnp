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

module.exports = FuncStore;
