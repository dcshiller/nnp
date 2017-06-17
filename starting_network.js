const Node = require('./node.js');
const Network = require('./network.js');

window.network = new Network();
const n1 = new Node(200,400,"");
const n2 = new Node(400,200,"");
const n3 = new Node(500,200,"");
const n4 = new Node(600,200,"");
const n5 = new Node(700,200,"");
const n6 = new Node(800,200,"");
network.include(n1);
network.include(n2);
network.include(n3);
network.include(n4);
network.include(n5);
network.include(n6);
n1.pointTo(n2);
n1.pointTo(n1);
n1.pointTo(n3);
n1.pointTo(n4);
n1.pointTo(n5);
n1.pointTo(n6);

module.exports = network;