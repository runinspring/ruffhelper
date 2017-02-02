
console.log('-------fork-------')
var childProcess = require('child_process');

// var options = {
// 	stdio:['pipe','pipe','pipe','ipc'],
// 	execPath:'rap'
// }
// var child = childProcess.fork('--version',options);

var options = {
	stdio:['pipe','pipe','pipe','ipc']
}


options = {
	silent:true,
}
options={stdio:['inherit','inherit','pipe','ipc']}
options={}
// var options = {
// 	stdio:['pipe','pipe','pipe','ipc'],
// 	execPath:'rap'
// }
// process.stdout['clearLine'] = function (dir) {
//   require('readline').clearLine(this, dir);
// }
var child = childProcess.fork(__dirname+'/clear1.js',options);
// child.stdout['clearLine'] = function (dir) {
//   require('readline').clearLine(this, dir);
// }
child.on('close',()=>{
	console.log('close')
})
child.on('error',()=>{
	console.log('error')
})
var pid = child.pid;

console.log('child.pid:',pid);
console.log('process.pid:',process.pid);
// console.log('child`:',child);

// child.stdout.on('data', function (data) {
// 	var result = data.toString('utf8');
// 	console.log('data:',result);
// })
// child.stdout.on('end', function (data) {
//         console.log("stdout.end:", data);
// })
// child.stderr.on('data', function (data) {
// 	// console.log('outabbb:',child.stdout.clearLine)
// 	var result = data.toString('utf8');
//     console.log("stderr:", result);
// });
// child.on('message', function (data) {
//         console.log('stdout.message:', data)
// });
// child.on('exit', function (code, signal) {
//         console.log('stdout.exit:', code, signal)
// });
// child.on('error', function (error) {
//         console.log('error:', error)
// });