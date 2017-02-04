var cluster = require('cluster')

function sendLog(type){
	return function(){
		process.send({ type: 'log', message: Array.from(arguments).join(' ') })
	}
}

function receiveLog(message){
	console[message.type](message.message)
}

if(cluster.isWorker){

	console.log = sendLog('log')
	console.error = sendLog('error')

} else if(cluster.isMaster) {
	cluster.on('message', receiveLog)
}