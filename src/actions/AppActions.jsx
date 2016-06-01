export const INIT = "init";//初始化
export const CHANGE_CONFIG = "change_config";//改变配置文件
export const ADD_OUTPUT = 'add_output';//增加输出内容;
export const ADD_LOG = 'add_log';//增加log的输出内容
export const OPEN_PROJECT = 'open_project';//打开项目
export const REMOVE_PROJECT = 'remove_project';//移除项目
export const RUFF_SDK_LOCATION = 'ruff_sdk_location';//sdk的位置
export const SHOW_ALERT = 'show_alert';//显示弹出面板
export const CLOSE_ALERT = 'colse_alert';//移除弹出面板
export const TESTING = "testing";//测试
import {commands} from '../lib/Commands';
import {tr} from '../lib/Utils'
var dispatch = null;
var props = null;
// exports.setDispatch = function (data) {
//     dispatch = data;
// }
function init(_dispatch, _props, _data) {
    dispatch = _dispatch;
    props = _props;
    // console.log(1231,dispatch,ddd)
    dispatch({type: INIT, data:_data})
}
/**改变config数据*/
exports.changConfig = function (data) {
    var obj = {type: CHANGE_CONFIG, data: data, save}
    dispatch(obj);
}
/**打开项目*/
exports.openRuffProject = function (data) {
    dispatch({type: OPEN_PROJECT, data})
}
/**移除项目*/
exports.removeProject = function (data) {
    dispatch({type: REMOVE_PROJECT, data})
}
/**显示弹出面板*/
exports.showAlert = function (type,callback=null,data=null) {
    dispatch({type:SHOW_ALERT,data:{type:type,callback:callback,data:data}})
}
/**关闭弹出面板*/
exports.closeAlert = function (index) {
    dispatch({type:CLOSE_ALERT,data:index})
}

/**发送Log子进程的命令*/
exports.sendLogCommand = function (projectPath) {
    addOutputCooked(tr(200, 'rap log'), true, ADD_LOG);//200 执行命令：xxxx
    commands('rap log',(value)=>{addOutputUnCooked(value,ADD_LOG)},null,projectPath)
}
/**发送子进程的命令*/
exports.sendCommand = function (cmd, callback, parentDir = null, inputObj = null, setOutValue = addOutputUnCooked, showCommand = true) {
    if (showCommand) {//是否显示这个命令行
        addOutputCooked(tr(200, cmd), true);//200 执行命令：xxxx
    }
    commands(cmd, setOutValue, function (value) {
        addOutputCooked(value);
        if (callback)callback(value);
    }, parentDir, inputObj);
}
/**增加没有处理过的内容*/
function addOutputUnCooked(value,type = ADD_OUTPUT) {
    if (!value) return;
    //console.log('设置输出的内容:',value)
    //windows 的错误信息
    //'rap' 不是内部或外部命令，也不是可运行的程序
    //或批处理文件。
    var output = "";
    var arr = value.split('\r');
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!arr[i]) {
            output += (' <br>');
        } else {
            if(value != "."){
                output += ('<pre >' + arr[i] + '</pre>');
            }else{
                output = value;// . 不换行
            }
        }
    }
    // console.log('output:', output)
    addOutputCooked(output,false,type);
}
/**增加蓝色的输出内容*/
function addOutPutBlue(data) {
    if (!data) {
        return;
    }
    var obj = {
        type: ADD_OUTPUT, data: '<b style="color:blue">' + data + '</b><br>'
    };
    dispatch(obj);
}
/**增加处理过的内容*/
function addOutputCooked(data, red = false,type= ADD_OUTPUT) {
    if (!data) {
        return;
    }
    if (red) {//使用红色警告字体
        data = '<b style="color:red">' + data + '</b><br>'
    }
    var obj = {
        type: type, data: data
    };
    dispatch(obj);
}
/**获取版本号*/
function getVersion() {
    // console.log('获取版本号')
    addOutputCooked(tr(200, 'rap version'), true);//200 执行命令：xxxx
    //addOutputCooked('<b style="color:red">' + tr(200) + 'rap version' + '</b><br>');//200 执行命令：xxxx
    var reg = /\d+(\.\d+){0,2}/;//匹配 0.1 或者 0.1.0
    commands('rap version', function (value) {
        addOutputUnCooked(value);
        // console.log('version:',value)
        var result = value.match(reg);
        if (result && result.index == 0) {
            // console.log('send')
            var obj = {type: CHANGE_CONFIG, data: {rapVersion: value}}
            dispatch(obj);
        }
    });
}
exports.setRuffSDKLocation = function (value) {
    dispatch({type:RUFF_SDK_LOCATION,data:{ruffSDKLocation:value}})
}
exports.addOutPutBlue = addOutPutBlue;
exports.addOutputCooked = addOutputCooked;
exports.addOutputUnCooked = addOutputUnCooked;
exports.getVersion = getVersion;
exports.init = init;
