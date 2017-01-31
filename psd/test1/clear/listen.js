// http://stackoverflow.com/questions/9962197/node-js-readline-not-waiting-for-a-full-line-on-socket-connections/10012306#10012306
//关键词 readline child_process
var readline = require('readline');
// var exec = require('child_process').exec;
// var childProcess = exec('node clear.js',{ stdio: ['pipe', 'pipe', process.stderr] });
var spawn = require('child_process').spawn;
var child = spawn('node',['clear.js']);

// var rd = readline.createInterface({
//     output: process.stdout,
//     terminal: false
// });
// rd.on('line', function(line) {
//     // var child = spawn('node',['clear.js']);
// })
// readline.createInterface({
//   input: child.stdout,
//   terminal: false
// }).on('line', function(line) {
//   console.log(99,line);
// });

