var config = require('../config');
var spawn = require('child_process').spawn;
exports.sendCommands = function (command, parentDir, callBack, inputObj) {
    console.log('RapCommand.sendCommand:', command)

    //把命令解析成数组 比如['deploy','-s']
    var trueCmd = command.split(' ');
    var arrOpts = [];
    for (var i = 1, len = trueCmd.length; i < len; i++) {
        arrOpts.push(trueCmd[i])
    }

    console.log('trueCmd:', trueCmd);
    console.log('arrOpts:', arrOpts);
    console.log('parentDir:', parentDir);
    console.log('platform:', config.platform)
    if (config.platform == "Windows") {
        var childProcess = spawn(trueCmd[0], arrOpts, { cwd: parentDir });
    } else {//mac
        childProcess = spawn('/usr/local/bin/rap', arrOpts, { cwd: parentDir });
    }
    var raplogPid = childProcess.pid;
    console.log('raplogPid:', raplogPid)


    childProcess.stdout.on('data', function (data) {
        var result = decodeData(data);
        console.log('stdout.data:', `"${result}"`)
        var pureResult = result.replace(/[^\w\?\(\)-]/g, '');//清除非法字符的纯净结果
        console.log('pureResult', pureResult)
        if (!result || pureResult == "") {//console.log('没有返回消息，跳过');
            return;
        }
        console.log('inputObj:', inputObj)
        for (var key in inputObj) {
            if (result.indexOf(key) > -1) {
                // childProcess.stdin.write(value + '\n');
            }
        }

    })
    childProcess.stderr.on('data', function (data) {
        console.log("stderr:", data);
    });
    childProcess.on('exit', function (code, signal) {
        console.log('stdout.exit:', code, signal)
    })
    childProcess.on('error', function (error) {
        console.log('error:', error)
    })

    // childProcess = spawn('/usr/local/bin/rap',arrOpts, { cwd: parentDir });
}
/**把子进程返回的数据解码 */
function decodeData(data) {
    // var arr = ["[l000D",'[1000D',"[?25h","[33D"];
    var result = data.toString('utf8');
    result = result.replace(/\[[?a-z]*[0-9]{1,4}[a-z,A-Z]*/g, "");
    if (result.indexOf('\n') == 0) {
        // console.log('清除掉开头的换行');
        result = result.replace(/\n/, "");
    }
    return result;
}