var fs = require('fs');
var path = require("path");
var os = require('os');
var net = require('net');
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

/** rap SDK 是否存在 不存在返回 null 存在返回路径*/
exports.existRapSDK = function (value, osType) {
    var sdkPath = escapePath(value);
    var rapPath = sdkPath + '/bin/' + 'rap';
    if (osType == 'Windows') {
        rapPath += '.exe'
    }
    // console.log('rapPath:',rapPath)
    if (fs.existsSync(rapPath)) {//SDK路径是存在的
        return sdkPath;
    } else {//可能还包含一层路径
        var baseName = path.basename(sdkPath);
        //sdkPath = `${sdkPath}/${baseName}`;
        sdkPath = sdkPath + '/' + baseName;//zip解压可能多包含一层路径
        var rapPath2 = sdkPath + '/bin/' + 'rap';
        //console.log('sdk2:',rapPath2)
        if (osType == 'Windows') {
            rapPath2 += '.exe'
        }
        //console.log('rapPath2:',rapPath2)
        if (fs.existsSync(rapPath2)) {
            return sdkPath;
        } else {
            return null;
        }
    }
}
/**获取本机 ip 地址 */
exports.getIpAddress = function () {
    var ifaces = os.networkInterfaces();
    var ipAddress;
    // console.log(777)
    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            ipAddress = iface.address;
        })
    })
    return ipAddress;
}
/**获取可用端口 callback(port)*/
exports.getAvailablePort = function (callback) {
    var port = 0;
    function getPort() {
        var server = net.createServer();
        server.on('listening', function () {
            port = server.address().port
            // console.log("Server running at port:", port);
            server.close();

        })
        server.on('close', function () {
            // console.log('callback')
            callback(port)
        })
        server.on('error', function (err) {
            port++;
            getPort();
        })
        server.listen(port, '0.0.0.0')
    }
    getPort();
}