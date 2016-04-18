/**
 * 全局多语言翻译函数
 * @param code 要查询的字符串代码
 * @param args 替换字符串中{0}标志的参数列表
 * @returns 返回拼接后的字符串
 */
exports.tr = function tr(code, args) {
    var text = global['$locale_strings'][code];
    text = format(text, args);
    return text;
}
function format(text, args) {
    if (!args) {
        return text;
    } else if (typeof(args) == 'string') {
        args = [args];
    }
    var length = args.length;
    for (var i = 0; i < length || i < 5; i++) {
        text = text.replace(new RegExp("\\{" + i + "\\}", "ig"), args[i] || "");
    }
    return text;
}
/**
 * 从两边向中间取值
 * @param str 原始的字符串
 * @param num 要取的字符数，一个中文算2个
 * @constructor
 */
exports.cutCharByLength = function (str, num) {
    var arr = str.split("");
    //console.log("str:", str)
    var strFront = "";
    var strBack = "";
    var w = 0;
    var isBreak = false;
    while (arr.length > 0) {
        var str = arr.shift();
        strFront += str;
        w += countCharCode(str);
        if (w < num) {
            if (arr.length > 0) {
                str = arr.pop();
                strBack = str + strBack;
                w += countCharCode(str);
                if (w >= num) {
                    isBreak = true;
                    break;
                }
            }
        } else {
            isBreak = true;
            break;
        }
    }
    //console.log("arr:", arr)
    //console.log("arrFront:", strFront);
    //console.log("arrBack:", strBack);
    if(isBreak){
        strFront += "\\...\\";
    }
    return strFront + strBack;
}
function countCharCode(str) {
    var c = str.charCodeAt(0);
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {//单字节
        return 1;
    } else {//双字节
        return 2;
    }
}
exports.format = format;
