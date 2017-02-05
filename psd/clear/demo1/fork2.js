
console.log('--------fork2--------')
var cluster = require ('cluster');
require('./cluster-logger');
var childProcess = require('child_process');
// cluster.fork();
if ( cluster . isMaster ) {
	// console.log(1232,cluster.fork)
	// __dirname+'/clear1.js'
	cluster.fork()
	cluster.on('listening' , function ( worker , address) {
		console.log('listening: worker ' + worker.process.pid);
    });
	cluster.on('exit' , function ( worker , code , signal ) {
		console.log('worker'+worker.process.id+'died');
	})
}else{
	cluster.on('message', ()=>{
		// console.log(888)
	})
	console.log('isNotMaster',12)
	console.log(111)
	// var child = childProcess.fork(__dirname+'/clear1.js');
}


