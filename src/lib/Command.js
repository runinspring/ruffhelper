var iconv = require('iconv-lite');//解决中文乱码
var config = require('../config');
import {showAlert} from '../actions/AppActions.jsx';
import {PanelInput} from '../component/Alerts.jsx';
import {tr} from './Utils';
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
    if(!inputObj) inputObj= {};
    inputObj["? enter password for Ruff board:"]='';
    inputObj["? select a device to interact:"] = '';
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
        // console.log("stdout1:",data);
        result = outPut(data);
        console.log("stdout2:", result);
        for (var key in inputObj) {
            if (result.indexOf(key) > -1) {
                delete inputObj[key];
                if(key == "? enter password for Ruff board:"){
                    outputObj[key] = '';
                    showAlert(PanelInput,function (value) {
                        key += value;
                        outPutMessage(key);
                        childProcess.stdin.write(value + '\n');
                        console.log('input end',value)
                    },tr(49));//49 请输入 Ruff 开发板的密码
                    return;
                }else if(key == '? select a device to interact:'){
                    outPutMessage(key);
                    console.log('splite,',result.split('\n'))
                    return;
                }
                var inputValue = inputObj[key];
                childProcess.stdin.write(inputObj[key] + '\n');
                result = key + ": "+inputValue;
                outputObj[key] = inputValue;
                if(Object.getOwnPropertyNames(inputObj).length == 0) {
                    inputObj = null;
                    childProcess.stdin.end();
                }
                outPutMessage(result);
                return;
            }
            //console.log("key:",key,result.indexOf(key));
        }
        var find = false;
        for (key in outputObj) {//输出的信息里不包含输入的内容
            // console.log("key:",key,result.indexOf(key))
            if (result.indexOf(key) > -1) {
                find = true;
                return;
            }
            //console.log("key:",key,result.indexOf(key));
        }
        // console.log('find:',find)
        if(!find){
            // console.log('not find,',result)
            //if (callBackOutput && showOutPut)callBackOutput(result);
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
var ls1 ="";
function outPut(value) {
    value.toString('utf8');
    var result = iconv.decode(value, "UTF8");
    if (result.indexOf('�') != -1) {// 编码不对试着用GBK编码
        result = iconv.decode(value, "GBK");
    }
    result = result.replace(/\[\d{2}C/g, "");//替换[33D 为空 输入开发板密码的时候会有
    result = result.replace(/\[\d{2}D/g, "");//替换[33C 为空 输入开发板密码的时候会有
    // var reg = "";
    // for(var i=21;i<25;i++){
    //     reg = "\["+i+"C";
    //     // console.log(reg);
    //     result = result.replace(/reg/g, "");
    //     reg = "\["+i+"D";
    //     result = result.replace(/reg/g, "");
    // }
    // result = result.replace(/\[22D/g, "")//创建项目的时候会有
    // result = result.replace(/\[22C/g, "");
    // result = result.replace(/\[23D/g, "");
    // result = result.replace(/\[23C/g, "");
    // result = result.replace(/\[24D/g, "");
    // result = result.replace(/\[24C/g, "");
    result = result.replace(/\[l000D \[K/g, "");
    result = result.replace(/</g, " &lt;")//把 <  替换成&lt;
    result = result.replace(/\[\?25h/g, "")//替换[?25 为空
    result = result.replace(/\[\?25l/g, "")//替换[?25l 为空
    result = result.replace(/\[0;31m/g, "")//替换[0;31m 为空// egret build 的红色
    result = result.replace(/\[0m/g, "")//替换[0m 为空// egret build 的黑色

    //console.log('输出：',result)
    return result;
}

