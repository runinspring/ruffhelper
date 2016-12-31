import {combineReducers}from 'redux';
var cfg = require('../config');//
import {INIT,LEFT_CHANGE_CLUMTYPE} from '../actions/AppActions.jsx';
import {List} from 'immutable';
var appPath = '';
let initConfig = {
    language: '',//语言默认中文 zh_CN
    // rapVersion: "",//rap 版本号
    // rapVersionDec: "",//版本号的描述信息  比如:未安装rap
    osType: "",//操作系统 Windows Mac
    appPath: '',//应用的路径
    ruffProjectPath: '',//要打开的ruff项目的路径
    // ruffSDKLocation: '',//sdk的位置
    histrory: List([]),// 打开的历史记录，最多10个 {name:'',path:''}
    // autoCmdLog: false,//命令行区域自动滚屏
    // autoRapLog: true,//rap log 区域自动滚屏
    ip: '',//本机ip
    port: ''//rap log 服务器用的端口
}
var config = function (state = initConfig, action) {
    var result = Object.assign({}, state);
    // console.log('action.type:',action.type)
    switch (action.type) {
        case INIT:
            result = Object.assign({}, result, action.data);
            result.histrory = List(action.data.histrory);
            cfg.saveData.ruffSDKLocation = result.ruffSDKLocation;
            cfg.saveData.histrory = result.histrory;
            if (action.data.histrory && action.data.histrory.length > 0) {//默认打开第一个项目
                //console.log(result.histrory.get(0).path)
                result.ruffProjectPath = action.data.histrory[0].path;
            }
            appPath = result.appPath;
            // console.log('saveData',saveData)
            // console.log(12312,result.histrory.get(0))
            return result;
    }
    return result;
}
let initLeft={
    clum1:0,//每个栏目的打开状态 0关闭 1打开 2关闭中
    clum2:0,
    clum3:0
}
var left = function (state=initLeft,action) {
    var result = Object.assign({},state);
    switch (action.type){
        case LEFT_CHANGE_CLUMTYPE:
            result['clum'+action.data.key] = action.data.value
            // console.log('left:',result)
            return result;
    }
    return result;
}
const appreducer = combineReducers({
    config,left
});
export default appreducer;