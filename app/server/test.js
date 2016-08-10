var child_process = require("child_process");
const p = child_process.fork(
  'E:/ZhiHuaSiStudio/2016/RuffHelperGit/app/server/RapLogServer.js', ["10.0.2.164",9254]
);
p.on('message',m=>{
	console.log('message in child2',m)
})
p.send('send from parent')