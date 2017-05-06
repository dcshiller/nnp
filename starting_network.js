var Node = require('./node.js')
var Network = require('./network.js')

network = new Network()
var n1 = new Node(200,400,"")
var n2 = new Node(400,200,"")
network.include(n1)
network.include(n2)
n1.pointTo(n2)

module.exports = network