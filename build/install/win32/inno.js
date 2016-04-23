var spawn = require('child_process').spawn;
var path = require('path');
module.exports = function (datas,callBack) {
	var compil = path.resolve(path.join(__dirname, 'inno/ISCC.exe'));
	var args = [];
	args.push('/DAppVersion='+datas.version);
	args.push(path.resolve(path.join(__dirname, 'media/'+datas.platform+'.iss')));
	console.log('inno',args)
	var run = spawn(compil,args);
	run.stdout.on('data', function (data) {
		//console.log(data.toString('utf8').trim());
	});
	run.stderr.on('data', function (data) {
		//console.log("error:",data.toString('utf8').trim());
	});
	run.on('close', function (code) {
		console.log('close',code)
		// return next(null);
		if(callBack){
			callBack();
		}
	});
}