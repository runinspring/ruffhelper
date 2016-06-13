var arguments = process.argv.splice(2);
console.log("arguments", arguments)
var host = arguments[0];
var port = parseInt(arguments[1]);
  console.log(`host:${host},port:${port}`)

 var app = require('http').createServer(serverHandler);
    var io = require('socket.io')(app);
    var url = require("url");
    var net = require("net");
    var fs = require("fs");
    var path = require('path');
    app.listen(port);
    
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
                var htmlName = './app/server/raplog/raplog.html';
                fs.readFile(htmlName, function (err, data) {
                    if (!err) {
                        res.end(data);
                    } else {
                        console.log('createServer err:', err)
                    }
                });
                break;
            default:
                var fullpathname = './app/server/raplog' + pathname;
                // console.log('fullpathname:', fullpathname)
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
                    } else {console.log(777, '资源不存在')//
                        res.writeHead(404, { "Content-Type": "text/html" });
                        res.end("<h1>404 Not Found</h1>");
                    }
                    // console.log('exists:', exists)
                })
                break;
        }
    }


    var child_process = require("child_process");
    child_process.exec(`start http://${host}:${port}`);
    console.log(`start  http://${host}:${port}`)