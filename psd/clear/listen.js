// http://stackoverflow.com/questions/9962197/node-js-readline-not-waiting-for-a-full-line-on-socket-connections/10012306#10012306
//关键词 readline child_process
//拦截process.stdout和process.stderr http://www.tuicool.com/articles/NJNra2Z
// var readline = require('readline');
var spawn = require('child_process').spawn;
var options = {
	encoding:'buffer',
	stdio:[0,'pipe',null]
}
var child = spawn('node',['clear1.js'])
console.log('listen.clearLine:',process.stdout.clearLine);
console.log('child.clearLine:',child.stdout.clearLine);


// console.log('out.listen:',child.stdout);
// console.log(11,child.stdout)
// child.stdout.clearLine = function (dir) {
//   require('readline').clearLine(this, dir);
// }

// console.log('outaaa:',child)
// newStdout.pipe(rawStdout);//内容输出到控制台
process.on('data',()=>{
	console.log('ddd')
})
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