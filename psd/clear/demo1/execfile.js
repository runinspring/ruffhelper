
console.log('-------exec-------')
var execFile = require('child_process').execFile;

var child = execFile('node', ['clear1.js'],(e,stdout,stderr)=>{
	console.log('err:',e);
	console.log('stdout:',stdout);
	console.log('stderr:',stderr);
})
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