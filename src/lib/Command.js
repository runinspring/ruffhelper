var iconv = require('iconv-lite');//解决中文乱码
var config = require('../config')
iconv.skipDecodeWarning = true;//忽略报错
var cp_exec = require('child_process').exec;
/**
 * command 进程执行的命令
 * callBackOutput 输出信息的回调
 * callBack 全部结束的回调
 * inputObj 输入的参数
 * */
exports.commands = function commands(command, callBackOutput, callBack, parentDir, inputObj,showOutPut) {
    // console.log('command:',command);
    // console.log('parentDir:',parentDir);
    //command = 'npm init';
    /*inputObj = {
     'name':
     }*/
    //command = 'rap info'
    //command = "dsdf";
    //command = 'rap init'
    //command = 'egret build'
    //command = 'egret'
    //var parentDir = "D:\\work";
    //console.log(123213,parentDir)
    // command = '/Volumes/D/apps/ruff-sdk-mac-0.8.0/bin/'+ command;
    // command = '/Volumes/D/下载/ruff-sdk-mac-0.9.0/bin/' + command;
    // console.log('command:',command)
    command = config.saveData.ruffSDKLocation + '/bin/'+command;
    //console.log('command',command)
    function outPutMessage(value){
        if(callBackOutput){
            callBackOutput(value);
        }
    }

    var result = '';
    var outputObj={}
    //timeout: 100000,
    var childProcess = cp_exec(command, {
        encoding: 'binary',
        timeout: 100000,
        maxBuffer: 2000 * 1024,
        killSignal: 'SIGTERM',
        cwd: parentDir,
        env: null
    });
    childProcess.stdout.on('data', function (data) {
        //console.log("stdout:",data);
        result = outPut(data);
        //console.log("stdout:", result);
        //console.log('inputObj:',inputObj)
        if (inputObj && Object.getOwnPropertyNames(inputObj).length>0) {
            for (var key in inputObj) {
                if (result.indexOf(key) > -1) {
                    //console.log('inputObj11:', inputObj);
                    //console.log("stdout:", result);
                    //console.log(7878,inputObj.length)
                    //console.log("childProcess.stdin:", childProcess.stdin)
                    var inputValue = inputObj[key];
                    childProcess.stdin.write(inputObj[key] + '\n');
                    result = key + ": "+inputValue;
                    outputObj[key] = inputValue;
                    delete inputObj[key];
                    if(Object.getOwnPropertyNames(inputObj).length == 0) {
                        inputObj = null;
                        childProcess.stdin.end();
                    }

                    //if (callBackOutput && showOutPut)callBackOutput(result);
                    outPutMessage(result);
                    //find = true;
                    return;
                }
                //console.log("key:",key,result.indexOf(key));
            }
            //console.log(outputObj,Object.getOwnPropertyNames(outputObj).length);
        } else if(Object.getOwnPropertyNames(outputObj).length>0){
            //console.log('outObj:',result,outputObj)
            var find = false;
            for (key in outputObj) {//输出的信息里不包含输入的内容
                //console.log("key:",key,result.indexOf(key))
                if (result.indexOf(key) > -1) {
                    find = true;
                    return;
                }
                //console.log("key:",key,result.indexOf(key));
            }
            if(!find){
                //if (callBackOutput && showOutPut)callBackOutput(result);
                outPutMessage(result);
            }
        }else{
            //if (callBackOutput)callBackOutput(result);
            outPutMessage(result);
        }
    });
    childProcess.stderr.on('data', function (data) {
        result = outPut(data);
        console.log("----stderr----:",result);
        //if (callBackOutput)callBackOutput(result);
        outPutMessage(result);
    });
    childProcess.on('exit', function (msg) {
        console.log('exit')
        if (callBack) callBack();
    })
}
function outPut(value) {
    value.toString('utf8');
    var result = iconv.decode(value, "UTF8");
    if (result.indexOf('�') != -1) {// 编码不对试着用GBK编码
        result = iconv.decode(value, "GBK");
    }
    result = result.replace(/</g, " &lt;")//把 <  替换成&lt;
    result = result.replace(/\[\?25h/g, "")//替换[?25 为空
    result = result.replace(/\[\?25l/g, "")//替换[?25l 为空
    result = result.replace(/\[0;31m/g, "")//替换[0;31m 为空// egret build 的红色
    result = result.replace(/\[0m/g, "")//替换[0m 为空// egret build 的黑色

    //console.log('输出：',result)
    return result;
}

