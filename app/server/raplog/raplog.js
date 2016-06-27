var socket = io.connect(window.location.href, { reconnection: true, reconnectionDelay: 1000 });
var userid = uuid();
var containerDiv = document.getElementById('container')
var contentDiv = document.getElementById('content');
var output = '98765</br>987659876598765987659876598765987659876598765987659876598765987659876598765987659876598765</br>98765</br>98765</br>98765</br>' +
    '98765</br>98765</br>98765</br>98765</br>98765</br>' +
    '98765</br>98765</br>98765</br>98765</br>98765</br>' +
    '98765</br>98765</br>98765</br>98765</br>98765</br>';
socket.on('connect', function () {
    socket.emit('login', { userid: userid });
    output += '</br>Connect to the RuffHelper</br>Successful';
    showOutput();
    // contentDiv.dangerouslySetInnerHTML += 
    // setPosition();
    // console.log('----connection----');
});
socket.on('disconnect', function () {
    output += '</br>Disconnect, waiting to reconnect...';
    showOutput();
    // contentDiv.innerHTML += '</br>Disconnect, waiting to reconnect...';
    // setPosition();
    // console.log('----disconnect----');
})
socket.on('reconnect', function () {
    output += '</br>Reconnect';
    showOutput();
    // contentDiv.innerHTML += '</br>Reconnect';
    // setPosition();
    // console.log('----reconnect----');
})
socket.on('login', function (o) {
    output += `</br>login ${o} `;
    showOutput();
    // contentDiv.innerHTML += `</br>login ${o} `;
	// // console.log('----login----', o)
    // setPosition();
});
socket.on('message', function (o) {
    output += `</br>${o}`;
    showOutput();
    // contentDiv.innerHTML += `</br>${o}`;
    // setPosition();
	// console.log('----login----', o)
});
socket.on('test1', function (o) {
    output += `</br>test ${o}`;
    showOutput();
    // contentDiv.innerHTML += `</br>test ${o}`;
    // setPosition();
	// console.log('----test----', o)
});
function showOutput() {
    var body = document.body;
    contentDiv.innerHTML = output;
    // body.scrollTop = body.scrollHeight-100;
    containerDiv.scrollTop = containerDiv.scrollHeight-100;
    // console.log('containerDiv',containerDiv.scrollTop,containerDiv.scrollHeight)
}
/**定位到最底下 */
// function setPosition(){
//     // var ex = document.getElementById("rapCommandArea");//定位到最下面一行
//     // console.log('setPosition1',contentDiv.scrollTop,contentDiv.scrollHeight)
//     containerDiv.scrollTop = containerDiv.scrollHeight;
//     console.log('setPosition2', contentDiv.scrollTop, contentDiv.scrollHeight)
//     console.log('contentDiv:',contentDiv)
// }

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
 
    var uuid = s.join("");
    return uuid;
}
