var stream = require('stream');
var readline = require('readline');
var customStream = new stream.Writable();
customStream._write = function (data) {
    console.log('112',data.toString());
};

// var exec = require('child_process').exec;
// var childProcess = exec('node clear.js',{ stdio: ['pipe', 'pipe', process.stderr] });
var spawn = require('child_process').spawn;
var child = spawn('node',['clear.js']);



// child.clearLine
// var child = spawn('ls');
// var child = spawn('ls',[],{stdio: [null,'pipe','inherit']});
// var child = spawn('node',['clear.js'],{stdio: [null,'pipe','inherit']});
// console.log('writable')
// child.stdout.pipe(process.stdout);
// process.stdout.pipe(customStream);
process.stdout.on('data', function (data) {
	console.log(888,data)
})



// var childProcess = exec('rap',['--version']);


child.stdout.on('data', function (data) {
	var result = data.toString('utf8');
	console.log('data:',result);
	// console.log(999,child.out)

})
child.stdout.on('end', function (data) {
        console.log("stdout.end:", data);
    })
    child.stderr.on('data', function (data) {
    	var result = data.toString('utf8');
        console.log("stderr:", result);
    });



child.on('exit', function (code, signal) {
        console.log('stdout.exit:', code, signal)
});
child.on('error', function (error) {
        console.log('error:', error)
});
