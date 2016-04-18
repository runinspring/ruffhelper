var fs = require('fs');
var path = require('path');
var fileUtil = require('./FileUtil');// './Utils';
/** rap SDK 是否存在 不存在返回 null 存在返回路径*/
exports.existRapSDK = function(value,osType) {
    var sdkPath = fileUtil.escapePath(value);
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