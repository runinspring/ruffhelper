export const INIT = "init";//初始化
export const LEFT_CHANGE_CLUMTYPE = 'left_change_clumtype';//改变左侧每个栏目的开启状态，0关闭 1打开 2关闭中
export const CHANGE_CONFIG = 'change_config';//改变配置文件
export const OPEN_RUFF_PROJECT = 'open_ruff_project';//打开ruff项目
export const REMOVE_RUFF_PROJECT = 'remove_ruff_project';//移除历史记录里的项目
export const LOG_ADD = 'log_add';//增加log信息
export const LOG_CLEAN = 'log_clean';//清除log信息
export const COLOR_GREEN = 'color_green';//绿色为提示信息
export const COLOR_RED = 'color_red';//红色为警告信息
import {sendCommands} from '../lib/RapCommand';
import {tr} from '../lib/Utils';
var dispatch = null;
/**初始化，保存dispatch */
exports.init = function (_dispatch, data) {
    dispatch = _dispatch;
    command(INIT, data);
}
/**通用的命令*/
exports.command = command;
function command(command, data) {
    var obj = {type: command, data: data}
    // console.log('command:',obj)
    dispatch(obj);
}
/**增加log信息*/
exports.addLog = addLog;
function addLog(data, color) {
    var arr = data.split('\n');
    // console.log('arr:', arr)
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!arr[i]) {
            return;
        }
        var obj = {
            color: 'white',
            value: arr[i]
        }
        if (color) {
            switch (color) {
                case COLOR_GREEN://绿色为提示信息
                    obj.color = '#5EFDFF';
                    break;
                case COLOR_RED://红色为警告信息
                    // obj.color = 'red';
                    obj.color = '#ffccff';
                    break;
                default://默认为白色的通用信息
                    obj.color = color;
                    break;
            }
        }
        command(LOG_ADD, obj);
    }

}
/**
 * 发送rap命令
 * @param cmd string 发送的命令
 * @param callback 回调方法
 */
exports.rapCommand = rapCommand;
function rapCommand(cmd, parentDir = null, callback = null, inputObj = null, showCommand = true) {
    console.log('cmd:', cmd)
    if (showCommand) {//是否显示这个命令行
        addLog(tr(200, cmd), COLOR_GREEN)//200 执行命令：xxxx
    }
    sendCommands(cmd, parentDir, (value)=> {
        if (showCommand) addLog(value);
        if (cmd == 'rap --version') {
            var reg = /\d+(\.\d+){0,2}/;//匹配 0.1 或者 0.1.0
            var result = value.match(reg);
            if (result && result.index == 0) {
                var obj = {type: CHANGE_CONFIG, data: {rapVersion: value}}
                dispatch(obj);
            }else{
                if(showCommand){
                    addLog(tr(24), COLOR_RED);//24 系统中未安装 rap, 请前往 https://ruff.io/zh-cn/ 下载安装
                }
            }
        }
    }, ()=> {
        if (cmd != 'rap log' && showCommand) {
            addLog(tr(213), COLOR_GREEN);
        }
        if (callback) callback();
    }, inputObj);
}
