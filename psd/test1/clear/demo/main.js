var spawn = require('child_process').spawn;
var child = spawn('node',['work.js']);
child.stdout.on('data', function (data) {
	console.log('data:',data.toString());
})
child.stderr.on('data', function (data) {
    console.log("stderr:", data.toString());
});