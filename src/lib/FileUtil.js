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
exports.save =function(filePath,data,callBack){
    var str = JSON.stringify(data, null, '\t');
    saveString(filePath,str,callBack);
}
function saveString(filePath,string,callBack){
    filePath = escapePath(filePath);
    var dirPath = path.dirname(filePath);
    if(!fs.existsSync(dirPath)){
        console.log('path not exist:',path)
        fs.mkdir(dirPath,function (e) {
            if (!e) {
                writeFile(filePath, string, callBack);
                // fs.writeFile(filePath, string, charset);
                // console.log('writeFile1 success')
            }else{
                console.log('error:',e)
            }
        });
    } else {
         writeFile(filePath, string, callBack);
        // fs.writeFile(filePath, string, charset);
        // console.log('writeFile2 success')
    }
}
exports.saveString = saveString;
function writeFile(filePath,string,callBack) {
    fs.writeFile(filePath, string, charset,function (err) {
        if (err) {
            console.log('writeFile Error:', err);
        } else {
            if (callBack) {
                // console.log('writeFile succ')
                callBack();
            }
        }
    });
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