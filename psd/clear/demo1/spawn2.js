
console.log('-------spawn-------')
var spawn = require('respawn');
// var spawn = require('child_process').spawn;
var options = {
	stdio:[null,null,null]
}
options={}
var child = spawn(['node','clear1.js'],options)
child.start();