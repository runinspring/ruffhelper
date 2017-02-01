var out = process.stdout;
var idx = 0;
var id = setInterval(()=>{
	idx++;
	out.clearLine();
    out.cursorTo(0);
    out.write('workTime:' + idx);
	if(idx>3){
		clearInterval(id);	
		console.log();
		console.log('end')
	}
},100)