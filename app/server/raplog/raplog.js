// console.log(123123, window.location.href)
var socket = io.connect(window.location.href, { reconnection: true, reconnectionDelay: 1000 });
var userid = uuid();
var contentDiv = document.getElementById('content');
socket.on('connect', function () {
    socket.emit('login', { userid: userid });
    contentDiv.innerHTML += '</br>Connect to the RuffHelper</br>Successful';
    // console.log('----connection----');
});
socket.on('disconnect', function () {
    contentDiv.innerHTML += '</br>Disconnect, waiting to reconnect...';
    // console.log('----disconnect----');
})
socket.on('reconnect', function () {
    contentDiv.innerHTML += '</br>Reconnect';
    // console.log('----reconnect----');
})
socket.on('login', function (o) {
    contentDiv.innerHTML += `</br>login ${o} `;
	// console.log('----login----', o)
});
socket.on('message', function (o) {
    contentDiv.innerHTML += `</br>${o}`;
	// console.log('----login----', o)
});
socket.on('test1', function (o) {
    contentDiv.innerHTML += `</br>test ${o}`;
	// console.log('----test----', o)
});

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
