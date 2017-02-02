var spawn = require('child_process').spawnSync;
var child = spawn('node',['clear1.js'])
console.log('child',child.output[1].toString())
console.log('child2',child.output[2].toString())