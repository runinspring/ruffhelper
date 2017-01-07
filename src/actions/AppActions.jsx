export const INIT = "init";//初始化
export const LEFT_CHANGE_CLUMTYPE= 'left_change_clumtype';//改变左侧每个栏目的开启状态，0关闭 1打开 2关闭中
export const LOG_ADD = 'log_add';//增加log信息
export const LOG_CLEAN = 'log_clean';//清除log信息
var dispatch = null;
/**初始化，保存dispatch */
exports.init =function(_dispatch, data) {
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

