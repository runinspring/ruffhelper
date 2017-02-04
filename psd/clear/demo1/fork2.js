var cluster = require('cluster')
console.log('cluster:',cluster.sendLog)
var cluster2 =  require('./cluster-logger')
console.log('cluster2:',cluster.sendLog)