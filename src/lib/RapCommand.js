var config = require('../config');
var spawn = require('child_process').spawn;
exports.sendCommands = function (command, parentDir) {
    console.log('RapCommand.sendCommand:', command)
    console.log('platform:', config.platform)
    //把命令解析成数组 比如['deploy','-s']
    var trueCmd = command.split(' ');
    var arrOpts = [];
    for (var i = 1, len = trueCmd.length; i < len; i++) {
        arrOpts.push(trueCmd[i])
    }

    console.log('trueCmd:', trueCmd);
    console.log('arrOpts:', arrOpts);
    console.log('parentDir:', parentDir);

    // childProcess = spawn('/usr/local/bin/rap',arrOpts, { cwd: parentDir });
}