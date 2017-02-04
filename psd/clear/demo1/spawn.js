
console.log('-------spawn-------')

var spawn = require('child_process').spawn;
var options = {
	stdio:[null,null,null]
}
options={}
var child = spawn('node',['clear1.js'],options)
console.log('child.pid:',child.pid)
process.stdout.clearLine = 
child.stdout['clearLine'] = function (dir) {
  require('readline').clearLine(this, dir);
}
// child.__defineGetter__('stdout',function(){//重新定义process.stdout的Getter
//     return process.stdout;
// });

// child.stdout.clearLine = function(stream, dir) {
//   if (stream === null || stream === undefined)
//     return;

//   if (dir < 0) {
//     // to the beginning
//     stream.write('\x1b[1K');
//   } else if (dir > 0) {
//     // to the end
//     stream.write('\x1b[0K');
//   } else {
//     // entire line
//     stream.write('\x1b[2K');
//   }
// }
child.stdout.on('data', function (data) {
	var result = data.toString('utf8');
	console.log('data:',result);
	// console.log('tdd1:',child.stdout.tdd);
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