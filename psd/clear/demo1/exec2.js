
console.log('-------exec2-------')
// var exec = require('child_process').exec;
const execa = require('execa');

execa('node',['clear1.js']).then(result =>{
	console.log('result:',result.stdout)
})
execa('node', ['clear1.js']).stdout.pipe(process.stdout);