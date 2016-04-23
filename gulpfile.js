var gulp = require('gulp');
var spawn = require('child_process').spawn;
var cp_exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');
var inno = require('./build/install/win32/inno');
var datas = {platform: '', version: ''}
var preleasePath = './build/prerelease/';
var npmCmd={}
gulp.task("default", ["getVersion","getPackageCmd","win","mac","linux"], function () {
});
gulp.task("win", ['getVersion',"getPackageCmd"], function () {
    if (process.platform == "win32") {
        publishWin("win32", function () {
            publishWin('win64')
        })
    }
});
gulp.task("mac", ['getVersion',"getPackageCmd"], function () {
    var cmd = 'npm run packagemac';
    commands(cmd,function () {
        var dmg = require('./build/install/darwin/dmg');
        dmg(datas,null);
    })
});

gulp.task("linux", ['getVersion',"getPackageCmd"], function () {
    if (process.platform == "win32") {
        return null;
    }
    var srcPath = preleasePath+'RuffHelper-linux-x64-v'+datas.version+'/*';
    var cmd = 'npm run packagelinux';
    commands(cmd,function () {
        var srcPath = './build/prerelease/RuffHelper-linux-x64/*';
        var zipName = 'RuffHelper-linux-v'+datas.version+'.zip';
        var zipPath = './build/release';
        const zip = require('gulp-zip');
        return gulp.src(srcPath)
            .pipe(zip(zipName))
            .pipe(gulp.dest(zipPath));
    })
})

function publishWin(platform, next) {
    datas.platform = platform;
    //var compil = path.resolve(path.join(__dirname, 'inno/ISCC.exe'));
    //console.log('compil',compil)
    //console.log('publishWin.platform',datas.platform);
    var cmd1 = npmCmd['package'+platform];
    //commands(cmd1,inno(datas,next))
    commands(cmd1,function(){
        inno(datas,next)
    })
    //if(next)next();
}
gulp.task("getVersion", function () {
    //读取版本号
    var jsonPath = path.join(__dirname, '/app/package.json');
    var jsonStr = fs.readFileSync(jsonPath, "utf-8");
    var obj = JSON.parse(jsonStr);
    datas.version = obj.version;
    console.log('getVersion:', datas.version)
});
gulp.task("getPackageCmd", function () {
    //读取package里的npm 命令
    console.log('getPackageCmd')
    var jsonPath = path.join(__dirname, '/package.json');
    var jsonStr = fs.readFileSync(jsonPath, "utf-8");
    var obj = JSON.parse(jsonStr);
    npmCmd = obj.scripts;
    //console.log("getPackageCmd",npmCmd)
});
function commands(command, callBack) {
    console.log('command:', command)
    //console.log('arg:', args)
    console.log('cwd:',process.cwd())
    var run = cp_exec(command);
    run.stdout.on('data', function (data) {
        console.log(data.toString('utf8').trim());
    });
    run.stderr.on('data', function (data) {
        console.log("error:", data.toString('utf8').trim());
    });
    run.on('close', function (code) {
        console.log('close', code)
        // return next(null);
        if (callBack) {
            callBack();
        }
    });
}