const Node = require('./models/node.js');
const FunctionalNode = require('./models/functional_node.js');
const NoisyNode = require('./models/noisy_node.js');
const Network = require('./models/network.js');
// 
// window.network = new Network();
// const n1 = new NoisyNode(200,400,"");
// const n2 = new Node(400,200,"");
// const n3 = new Node(500,200,"");
// const n4 = new Node(600,200,"");
// const n5 = new Node(700,200,"");
// const n6 = new FunctionalNode(800,200,"", console.log.bind(this, "yep"))
// network.include(n1);
// network.include(n2);
// network.include(n3);
// network.include(n4);
// network.include(n5);
// network.include(n6);
// n1.pointTo(n2);
// n1.pointTo(n3);
// n1.pointTo(n4);
// n1.pointTo(n5);
// n1.pointTo(n6);


window.network = Network.fromJSON('{"nodesList":[{"type":"Node","state":1,"lastState":1,"threshold":1,"x":734,"y":327,"name":"fctrl"},{"type":"Node","state":0,"lastState":0,"threshold":1,"x":894,"y":190,"name":"dy1"},{"type":"Node","state":1,"lastState":1,"threshold":1,"x":617,"y":182,"name":"dy3"},{"type":"FunctionalNode","state":0,"lastState":0,"threshold":1,"x":730,"y":550,"name":"Fwd","func":"Move!"},{"type":"Node","state":0,"lastState":0,"threshold":1,"x":572,"y":395,"name":"#6"},{"type":"NoisyNode","state":1,"lastState":1,"threshold":1,"x":462,"y":411,"name":"rl control","prob":"0.5"},{"type":"FunctionalNode","state":0,"lastState":0,"threshold":2,"x":445,"y":550,"name":"Right","func":"Right!"},{"type":"FunctionalNode","state":0,"lastState":0,"threshold":3,"x":581,"y":531,"name":"Left","func":"Left!"},{"type":"NoisyNode","state":1,"lastState":1,"threshold":1,"x":277,"y":357,"name":"initiator","prob":"0.71"},{"type":"Node","state":0,"lastState":0,"threshold":1,"x":744,"y":140,"name":"dy2"}],"connectionsList":[{"fromNode":"initiator","toNode":"fctrl","strength":1},{"fromNode":"dy3","toNode":"fctrl","strength":-2},{"fromNode":"fctrl","toNode":"fctrl","strength":1},{"fromNode":"fctrl","toNode":"dy1","strength":1},{"fromNode":"dy1","toNode":"dy1","strength":-2},{"fromNode":"dy2","toNode":"dy3","strength":1},{"fromNode":"fctrl","toNode":"Fwd","strength":1},{"fromNode":"dy3","toNode":"#6","strength":1},{"fromNode":"initiator","toNode":"Right","strength":1},{"fromNode":"#6","toNode":"Right","strength":1},{"fromNode":"rl control","toNode":"Right","strength":-1},{"fromNode":"initiator","toNode":"Left","strength":1},{"fromNode":"#6","toNode":"Left","strength":1},{"fromNode":"rl control","toNode":"Left","strength":1},{"fromNode":"dy1","toNode":"dy2","strength":1}]}');

module.exports = network;
