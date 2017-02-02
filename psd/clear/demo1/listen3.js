
console.log('-------listen3-------')
var options={
	stdio:['pipe','pipe','pipe'],
	pty:true

}
var tty = require('tty');
// console.log('tty:',tty)

// console.log('process:',process.stdout.clearLine)

var spawn = require('child_process').spawn;
var child = spawn('node',['clear1.js'])
console.log('process.pid:',process.pid);
console.log('child.pid:',child.pid);
// var stream = require('stream');
// var rawStdout= child.stdout;//先拿到原来的stdout
// var newStdout=new stream.PassThrough();//创建一个passthrough流，这是一种特殊的Transform流，会直接把写入的数据吐出来
// rawStdout.clearLine = function (dir) {
//   require('readline').clearLine(this, dir);
// }

// newStdout.clearLine = function (dir) {
//   require('readline').clearLine(this, dir);
// }
// child.__defineGetter__('stdout',function(){//重新定义process.stdout的Getter
//     return newStdout;//返回我们的passthrough流
// });

// var newStdout2=new stream.PassThrough();//创建一个passthrough流，这是一种特殊的Transform流，会直接把写入的数据吐出来
// newStdout2.clearLine = function (dir) {
//   require('readline').clearLine(this, dir);
// }
// process.__defineGetter__('stdout',function(){//重新定义process.stdout的Getter
//     return newStdout2;//返回我们的passthrough流
// });
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
// newStdout.pipe(rawStdout);//内容输出到控制台

console.log('stdout:',child.stdout.clearLine)
child.stdout.on('data', function (data) {
	var result = data.toString('utf8');
	console.log('data:',result);
	// process.pi
	// console.log(999,child.out)
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