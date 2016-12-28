export const INIT = "init";//初始化
var dispatch = null;
/**初始化，保存dispatch */
exports.init =function(_dispatch, data) {
    dispatch = _dispatch;
    command(INIT, data);
}
/**通用的命令*/
function command(command, data) {
    var obj = { type: command, data: data }
    dispatch(obj);
}
exports.command = command;

