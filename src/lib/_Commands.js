var iconv = require('iconv-lite');//解决中文乱码
var config = require('../config');
import {showAlert,addOutPutBlue,addOutputCooked} from '../actions/AppActions.jsx';
import {PanelInput,PanelSelecter} from '../component/Alerts.jsx';
import {tr} from './Utils';
import fs from 'fs';
iconv.skipDecodeWarning = true;//忽略报错
var spawn = require('child_process').spawn;
var kill = require('tree-kill');
var raplogPid;
exports.killRaplog = function killRaplog() {
    if(raplogPid){
        kill(raplogPid);
    }
}
// var cp_exec = require('child_process').exec;
/**
 * command 进程执行的命令
 * callBackOutput 输出信息的回调
 * callBack 全部结束的回调
 * inputObj 输入的参数
 * */
exports.commands = function commands(command, callBackOutput, callBack, parentDir, inputObj,showOutPut) {
    if(!inputObj) inputObj= {};
    inputObj["? enter password for Ruff board:"]='';
    inputObj["ERR Hostname required."]="";
    if(command == 'rap scan'){
        inputObj["? select a device to interact:"] = '';//scan 中的命令
        inputObj["? setup password for Ruff board:"] ='';
        inputObj["? confirm password for Ruff board:"]="";
        inputObj["? enter a name for this device:"]="";
    }
    // console.log('inputObj', inputObj)
    // outPutMessage('? continue?Yes  Uploading new firmware, this might take a while.? continue?Yes  Uploading new firmware, this might take a while.');
    
    // console.log('spawn command',command)
    function outPutMessage(value){
        if(callBackOutput){
            callBackOutput(value);
        }
    }
    var result = '';
    var outputObj = {}
    //使用指定的 rap 版本
    // var cmdPath = config.saveData.ruffSDKLocation + '/bin/rap';
    //把命令解析成数组 比如['deploy','-s']
    var trueCmd = command.split(' ');
    var arrOpts = [];
    for(var i=1,len = trueCmd.length;i<len;i++){
        arrOpts.push(trueCmd[i])
    }
    // trueCmd.shift();//把最前面的 rap 命令删除
    console.log('trueCmd:',trueCmd)
    console.log('parentDir:',parentDir);
    // var childProcess = spawn('node',['-v'], { cwd: parentDir });
    // if(config.)
    if(config.platform == "Windows"){
        var childProcess = spawn(trueCmd[0],arrOpts, { cwd: parentDir });
    }else{//mac
        childProcess = spawn('/usr/local/bin/rap',arrOpts, { cwd: parentDir });
        // try {
        //     console.log(1212)
        //
        // }catch (err){
        //     console.log(2321323,err);
        //     // addOutputCooked(tr(24), true);//24 系统中未安装 rap, 请前往 https://ruff.io/zh-cn/ 下载安装
        //     // return;
        // }
    }

    if (command == 'rap log') {//只保留一个 rap log
        // console.log('rap log 命令');
        if (raplogPid) {
            kill(raplogPid);
        }
        raplogPid = childProcess.pid;
    }
    
    childProcess.stdout.on('data', function (data) {
        // console.log("stdout1:",data);
        result = outPut(data);
        var pureResult = result.replace(/[^\w\?\(\)-]/g, '');//清除非法字符的纯净结果
        
        if (!result || pureResult=="") {
            console.log('没有返回消息，跳过');
            return;
        }
        // console.log(7878,result.indexOf('?'))
        // if(result.indexOf('?')==)
        // console.log("stdout2:", result);
        
        // console.log("stdout2:", result, ';pureResult---',pureResult);
        
        for (var key in inputObj) {
            if (result.indexOf(key) > -1) {
                // console.log('find key:',result,key)
                if(key == "? enter password for Ruff board:" || key == "? setup password for Ruff board:"
                || key == "? confirm password for Ruff board:" || key=="? enter a name for this device:"){
                    let title = tr(49);//49 请输入 Ruff 开发板的密码
                    switch (key){
                        case "? setup password for Ruff board:":
                            title = tr(47);//47 请设置 Ruff 开发板的密码
                            break;
                        case "? confirm password for Ruff board:":
                            title = tr(46);//47 请确认 Ruff 开发板的密码
                            break;
                        case "? enter a name for this device:":
                            title = tr(45);//45 给当前开发板设定一个名称
                            break;
                        default:break;
                    }
                    outputObj[getPureResult(key)] = '';
                    showAlert(PanelInput,function (value) {
                        key += value;
                        outPutMessage(key);
                        childProcess.stdin.write(value + '\n');
                        // console.log('input end',value)
                    },title);
                    delete inputObj[key];
                    return;
                }else if(key == '? select a device to interact:') {//选择开发板
                    outputObj[getPureResult(key)] = '';
                    let arr = result.split('\n');
                    // console.log('arr1:',arr)
                    arr.shift();
                    // console.log('arr2:',arr)
                    showAlert(PanelSelecter, function (data) {
                        key += data.value;
                        outPutMessage(key);
                        childProcess.stdin.write(data.value + '\n');
                    }, {title: tr(48), items: arr});//48 请选择一块 Ruff 开发板
                    delete inputObj[key];
                    return;
                }else if(key == "? continue?" && inputObj["rap system upgrade"]){//固件更新
                    outputObj[getPureResult(key)] = '';
                    childProcess.stdin.write('\n');
                    outPutMessage('? continue?Yes\nUploading new firmware, this might take a while.');
                    delete inputObj[key];
                    return;
                }

                var inputValue = inputObj[key];
                // console.log('input',key,inputObj[key])
                childProcess.stdin.write(inputObj[key] + '\n');
                if (inputValue) {
                    result = key + ": "+inputValue;    
                } else {
                    result = key;
                }
                
                outputObj[getPureResult(key)] = inputValue;
                if(Object.getOwnPropertyNames(inputObj).length == 0) {
                    inputObj = null;
                    childProcess.stdin.end();
                }
                outPutMessage(result);
                if(key=="ERR Hostname required."){
                    addOutPutBlue(tr(44));//44 请使用 rap scan 命令连接设备
                }
                // if(inputObj['rap wifi'] && key=="? password"){
                //     outPutMessage('Broadcasting WiFi settings to your Ruff device, this might take a while.');
                //     outPutMessage('It is possible that the device became connected during broadcasting but not with this very session. Try `rap scan` even if broadcasting timed out.');
                // }
                delete inputObj[key];
                return;
            }
            //console.log("key:",key,result.indexOf(key));
        }
        var find = false;
        for (key in outputObj) {//输出的信息里不包含输入的内容
            // console.log("key---"+key+';result---'+pureResult+';pos----',pureResult.indexOf(key))
            if (pureResult.indexOf(key) > -1) {
                find = true;
                return;
            }
            //console.log("key:",key,result.indexOf(key));
        }
        // console.log('find:',find,result)
        if(!find){
            // console.log('没找到,',result)
            //if (callBackOutput && showOutPut)callBackOutput(result);
            var numSelect = pureResult.indexOf('?select');
            var numInput = pureResult.indexOf('?');
            let outputMessage = result;
            if (numSelect > -1 && numSelect < 2) {//选择面板
                result = result.replace(/>/, '');
                let arr = result.split('\n');
                // console.log('------------select data------------', arr)
                let title = arr.shift().replace(/\(Use arrow keys\)/, ''); 
                key = title;
                key = key.replace(/[^\w\?\(\)-]/g, '');//清除非法字符的纯净结果
                // console.log('-----------------add key------------:'+key)
                
                outputObj[key] = '';//保存清除空格后的key
                    // console.log('arr2:',arr)
                showAlert(PanelSelecter, function (data) {
                    title += data.value;
                    outPutMessage(title);
                    childProcess.stdin.write(data.value + '\n');
                }, { title: title, items: arr });
            } else if (numInput > -1 && numInput < 2) {//输入面板
                // let key = result.replace(/\s+/g, '');//保存清除空格后的key
                key = pureResult.replace(/(\([^\(\)]*\))/, '');//清除掉括弧内的内容
                outputObj[key] = '';
                // console.log('-----------------add key------------:'+key)
                showAlert(PanelInput,function (value) {
                    outputMessage += value;
                    // console.log('outPutMessage---',outputMessage)
                    outPutMessage(outputMessage);         
                    childProcess.stdin.write(value + '\n');
                        //console.log('input end',value)
                }, result);
            } else {
                outPutMessage(result);    
            }            
        }

    });
    childProcess.stderr.on('data', function (data) {
        result = outPut(data);
        console.log("----stderr----:",result);
        //if (callBackOutput)callBackOutput(result);
        outPutMessage(result);
    });
    childProcess.on('exit', function (code, signal) {
        console.log('exit',code, signal)
        if (signal) {
            // process.kill(childProcess.pid, signal);
            childProcess = null;
        }
        if(command!='rap log'){
            addOutPutBlue(tr(213));//命令执行结束
        }
        if (callBack) callBack();
    });
    childProcess.on('error', function (error) {
        console.log('error:',error)
        if(error.toString().indexOf('spawn /usr/local/bin/rap')>-1 || error.toString().indexOf('spawn rap')>-1){
            addOutputCooked(tr(24), true);//24 系统中未安装 rap, 请前往 https://ruff.io/zh-cn/ 下载安装
        }
    })
    
}
var ls1 = "";
/**清除非法字符的纯净结果 无空格*/
function getPureResult(value) {
    return value.replace(/[^\w\?\(\)-]/g, '');
}
function outPut(value) {
    value.toString('utf8');
    var result = iconv.decode(value, "UTF8");
    if (result.indexOf('�') != -1) {// 编码不对试着用GBK编码
        result = iconv.decode(value, "GBK");
    }
    result = result.replace(/\[\d{1,2}A/g, "");
    result = result.replace(/\[\d{1,2}B/g, "");
    result = result.replace(/\[\d{1,2}C/g, "");//替换[33D 为空 输入开发板密码的时候会有
    result = result.replace(/\[\d{1,2}D/g, "");//替换[33C 为空 输入开发板密码的时候会有
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
    result = result.replace(/\[l000D\[K/g, "");
    result = result.replace(/\[1000D\[K/g, "");
    result = result.replace(/\[l000D \[K/g, "");
    result = result.replace(/</g, " &lt;")//把 <  替换成&lt;
    result = result.replace(/\[\?25h/g, "")//替换[?25 为空
    result = result.replace(/\[\?25l/g, "")//替换[?25l 为空
    result = result.replace(/\[0;31m/g, "")//替换[0;31m 为空// egret build 的红色
    result = result.replace(/\[0m/g, "")//替换[0m 为空// egret build 的黑色
    if (result.indexOf('\n') == 0) {
        console.log('清除掉开头的换行');
        result = result.replace(/\n/, "");
    }
    //console.log('输出：',result)
    return result;
}

