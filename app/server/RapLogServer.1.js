import io from 'socket.io';
/**用于网页输出log的server，扫码后可以在手机端看log信息 */
exports.createServer = function (host, port) {
    var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
    // try {
    //     // var io = require('socket.io')();
    //     var io = require('socket.io').listen(port);
    // } catch (e) {
    //     console.log(e)
    // }
    
// io.on('connection', function(socket){});
// io.listen(3000);
    
}

exports.createServer2 = function (host, port) {
    // var http = require('http');
    var app = require('http').createServer(serverHandler);
    var io = require('socket.io')(app);
    var url = require("url");
    var net = require("net");
    var fs = require("fs");
    var path = require('path');
    app.listen(port)

    function serverHandler(req, res) {
        var urlObj = url.parse(req.url);
        var pathname = urlObj.pathname;
        // console.log('pathName:',pathname)
        if (!pathname.indexOf('/favicon.ico')) {
            return;
        }
        switch (pathname) {
            case "/":
            case "/index.html":
                var htmlName = './src/server/raplog/raplog.html';
                fs.readFile(htmlName, function (err, data) {
                    if (!err) {
                        res.end(data);
                    } else {
                        console.log('createServer err:', err)
                    }
                });
                break;
            default:
                var fullpathname = './src/server/raplog' + pathname;
                console.log('fullpathname:', fullpathname)
                fs.exists(fullpathname, function (exists) {
                    if (exists) {
                        switch (path.extname(pathname)) {
                            case '.js':
                                res.writeHead(200, { "Content-Type": "text/javascript" });
                                break;
                        }
                        fs.readFile(fullpathname, function (err, data) {
                            res.end(data);
                        });
                    } else {//console.log(777, '资源不存在')//
                        res.writeHead(404, { "Content-Type": "text/html" });
                        res.end("<h1>404 Not Found</h1>");
                    }
                    console.log('exists:', exists)
                })
                fs.readFile(fileName, function (err, data) {
                    if (!err) {
                        res.end(data);
                    } else {
                        console.log('createServer err:', err)
                    }
                });
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end('404');
                break;
        }
    }


    var child_process = require("child_process");
    child_process.exec(`start http://${host}:${port}`);
    console.log(`start  http://${host}:${port}`)
    // var args = process.argv.splice(2);
    // console.log("arguments:", arguments);
}
