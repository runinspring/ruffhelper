
console.log('-------fork-------')
var childProcess = require('child_process');

var options = {
	execPath:'rap'
}

// options={}
// var child = childProcess.fork(['uninstall','hjhjh'],options);
var child = childProcess.fork(['uninstall'],options);
// child.stdout['clearLine'] = function (dir) {
//   require('readline').clearLine(this, dir);
// }
child.on('close',(value)=>{
	console.log('close2:',value)
})
child.on('error',()=>{
	console.log('error2')
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