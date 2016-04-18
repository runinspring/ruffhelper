var fs = require('fs');
var path = require("path");
var charset = "utf-8";
exports.read = function(path){
    path = escapePath(path);
    var text ="";
    try {
        text = fs.readFileSync(path, charset);
        text = text.replace(/^\uFEFF/, '');
    }
    catch (err0) {
        return "";
    }
    return text;
}
exports.save =function(filePath,data){
    filePath = escapePath(filePath);
    var dirPath = path.dirname(filePath)
    var str = JSON.stringify(data,null,'\t');
    // console.log('save.data:',str)
    //console.log('dirPath:',dirPath)
    if(!fs.existsSync(dirPath)){
        console.log('path not exist:',path)
        fs.mkdir(dirPath,function (e) {
            if(!e){
                console.log('succ dir')
                fs.writeFileSync(filePath, str, charset);
            }else{
                console.log('error:',e)
            }
        });
    }else{
        fs.writeFileSync(filePath, str, charset);
    }
    // console.log('save.path:',filePath)
    //
    //
}
exports.saveCallBack=function(filePath,data,callBack){
    filePath = escapePath(filePath);
    var str = JSON.stringify(data,null,'\t');
    fs.writeFile(filePath, str, charset,callBack);
}
/**
 * 转换本机路径为Unix风格路径。
 */
function escapePath(path) {
    if (!path)
        return "";
    return path.split("\\").join("/");
}
exports.escapePath = escapePath;