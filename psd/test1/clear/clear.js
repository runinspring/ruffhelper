var fs = require('fs');
var text = fs.readFileSync('data.txt','utf-8');
console.log('text:',text);
var out = process.stdout;
console.log('out1:',out.cursorTo)


// out.clearLine = function (dir) {
//   require('readline').clearLine(this, dir);
// }
// out.cursorTo = function (x, y) {
//   require('readline').cursorTo(this, x, y);
// }

var idx = 0;
var id = setInterval(()=>{
	idx++;
	// console.log('idx:',idx);

	out.clearLine();
    out.cursorTo(0);
    out.write('已完成' + idx);
	if(idx>3){
		clearInterval(id);	
		console.log();
		var str = Number(text)+1;
		console.log('end.data=',str)
		fs.writeFile('data.txt',str.toString());
	}
},100)