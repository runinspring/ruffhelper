var arguments = process.argv.splice(2);
console.log("arguments", arguments)
var host = arguments[0];
var port = parseInt(arguments[1]);
// port = 8081;
console.log(`host:${host},port:${port}`)

var app = require('http').createServer(serverHandler);
var io = require('socket.io').listen(app);
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
            var htmlName = __dirname+'/raplog/raplog.html';
            fs.readFile(htmlName, function (err, data) {
                if (!err) {
                    res.end(data);
                } else {
                    console.log('createServer err:', err)
                }
            });
            break;
        default:
            var fullpathname = __dirname+'/raplog' + pathname;
            // console.log('fullpathname:', fullpathname)
            fs.exists(fullpathname, function (exists) {
                var contentType ={}
                if (exists) {
                    switch (path.extname(pathname)) {
                        case '.js':
                            contentType = "text/javascript";
                            break;
                        case '.css':
                            contentType = "text/css";
                            break;
                    }
                    res.writeHead(200, { "Content-Type": contentType });
                    fs.readFile(fullpathname, function (err, data) {
                        res.end(data);
                    });
                } else {
                    console.log(777, '资源不存在')//
                    res.writeHead(404, { "Content-Type": "text/html" });
                    res.end("<h1>404 Not Found</h1>");
                }
                // console.log('exists:', exists)
            })
            break;
    }
}
var socketObj = {};
var numUser = 0;
io.on('connection', function (socket) {
    //   socket = _socket;
    // console.log('a user connected');
    socket.on('login', function (obj) {
        socket.name = obj.userid;
        //  console.log('login',socket.name)
        socketObj[obj.userid] = socket;
        numUser += 1;
        // socket.emit('login', 'you are login '+numUser);
    })
    socket.on('disconnect', function () {
        numUser -= 1;
        if (socketObj[socket.name]) {
            // console.log('have user',socket.name)
            delete socketObj[socket.name];
        }
        // for (var i in socketObj) {
        //     console.log('id:', i);
        //  }
    })
    socket.on('message', function (obj) {
        //收到electron 发来的消息，转发给其他的网页
        io.emit('message', obj);
    })
})
// var testIdx = 0;
// setInterval(function () {
//     testIdx++;
//     io.emit('test1', "okokoko你好"+testIdx);
// },1000)

console.log(`start  http://${host}:${port}`)