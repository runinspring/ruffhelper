var appdmg = require('appdmg');
var path = require('path');

module.exports = function (datas,callBack) {
    console.log('dmg',datas)
    var version = datas.version;
    var basepath = path.join(__dirname,'../../');
    var oldAppdir = path.join(basepath, 'prerelease/RuffHelper-darwin-x64/RuffHelper.app');
    var target = path.join(basepath, 'release/RuffHelper-mac-v' + version + '.dmg');
    // console.log('oldAppdir:',oldAppdir);
    // console.log('target:',target);
    var ee = appdmg({
        target: target,
        basepath: basepath,
        specification: {
            "title": "RuffHelper",
            "icon": "install/darwin/media/icon.icns",
            "background": path.join(__dirname, "media/background.png"),
            "icon-size": 80,
            "contents": [
                { "x": 150, "y": 192, "type": "file", "path": oldAppdir },
                { "x": 350, "y": 192, "type": "link", "path": "/Applications" }
            ]
        }
    });
    ee.on('progress', function (info) {
        console.log('progress:',info.current + '/' + info.total + ' ' + info.type + ' ' + (info.title || info.status));
    });

    ee.on('error', function (err) {
        console.log('error', err);
        // self.emit('error', err);
    });

    ee.on('finish', function () {
        console.log('finish');
        if(callBack)callBack();
    });
}