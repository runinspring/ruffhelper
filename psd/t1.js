var t1 = '1.6.2\n[?25h'

console.log('result2:',decode(t1))

function decode(result) {
	result = result.replace(/\[[?a-z]*[0-9]{1,4}[a-z,A-Z]*/g, "");
    if (result.indexOf('\n') == 0) {
        // console.log('清除掉开头的换行');
        result = result.replace(/\n/, "");
    }
    result = result.replace(/\n\n|\n$/, "");//去掉最后一个\n

    result = result.replace(/\[K/g, "");
    return result;
}
var t2 = '1.6.2\n\n[?25h'
console.log('result2:',decode(t2))