/**
 * Created by wander on 15/11/13.
 */
var fs = require('fs');
var file_path = "app/public/app.js"
var content = fs.readFileSync(file_path,"utf-8");
content = content.replace(/use strict/gi,"");
fs.writeFileSync(file_path,content,"utf-8");
