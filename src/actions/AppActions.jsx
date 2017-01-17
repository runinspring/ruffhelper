export const INIT = "init";//初始化
export const LEFT_CHANGE_CLUMTYPE = 'left_change_clumtype';//改变左侧每个栏目的开启状态，0关闭 1打开 2关闭中
export const OPEN_RUFF_PROJECT = 'open_ruff_project';//打开ruff项目
export const REMOVE_RUFF_PROJECT = 'remove_ruff_project';//移除历史记录里的项目
export const LOG_ADD = 'log_add';//增加log信息
export const LOG_CLEAN = 'log_clean';//清除log信息
import { sendCommands } from '../lib/RapCommand';
var dispatch = null;
/**初始化，保存dispatch */
exports.init = function (_dispatch, data) {
    dispatch = _dispatch;
    command(INIT, data);
}
/**通用的命令*/
function command(command, data) {
    var obj = { type: command, data: data }
    // console.log('command:',obj)
    dispatch(obj);
}
exports.command = command;

export const COLOR_GREEN = 'color_green';
export const COLOR_RED = 'color_red';
/**增加log信息*/
exports.addLog = function (data, color) {
    var obj = {
        color: 'white',
        value: data
    }
    if (color) {
        switch (color) {
            case COLOR_GREEN:
                obj.color = '#5EFDFF';
                break;
                gy
            case COLOR_RED:
                // obj.color = 'red';
                obj.color = '#ffccff';
                break;
            default:
                obj.color = color;
                break;
        }
    }
    command(LOG_ADD, obj);
}
/**
 * 发送rap命令
 * @param cmd string 发送的命令
 * @param callback 回调方法
 */
exports.rapCommand = function (cmd, parentDir, callback) {
    sendCommands(cmd, parentDir);
}