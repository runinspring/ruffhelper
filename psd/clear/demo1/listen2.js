var childProcess = require('child_process');
// console.log(99,childProcess.spawn)
var spawn = childProcess.spawn;
// var options = {
// 	execArgv: process.execArgv
// }
var child = spawn('node',['clear1.js'])
// console.log(88,child)
// console.log('process.execArgv:',process.execArgv)
// console.log('child.pid:',child.stdout.clearLine);\
child.stdout.on('data', function (data) {
	var result = data.toString('utf8');
	console.log('data:',result);
})
child.stdout.on('end', function (data) {
        console.log("stdout.end:", data);
})
child.stderr.on('data', function (data) {
	// console.log('outabbb:',child.stdout.clearLine)
	var result = data.toString('utf8');
    console.log("stderr:", result);
});
child.on('message', function (data) {
        console.log('stdout.message:', data)
});
child.on('exit', function (code, signal) {
        console.log('stdout.exit:', code, signal)
});
child.on('error', function (error) {
        console.log('error:', error)
});