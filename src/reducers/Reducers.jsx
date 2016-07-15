import {combineReducers}from 'redux';
var cfg = require('../config');//
// import {sdkPath} from '../config';
import {save} from '../lib/FileUtil';
import {List} from 'immutable';
import {INIT,CHANGE_CONFIG,ADD_OUTPUT,ADD_LOG,OPEN_PROJECT,REMOVE_PROJECT,RUFF_SDK_LOCATION,SHOW_ALERT,CLOSE_ALERT,
CLEAN_RAP_LOG} from '../actions/AppActions.jsx';
var appPath = '';
let initConfig = {
    language: '',//语言默认中文 zh_CN
    rapVersion: "",//rap 版本号
    rapVersionDec: "",//版本号的描述信息  比如:未安装rap
    osType: "",//操作系统 Windows Mac
    appPath: '',//应用的路径
    projectPath: '',//代码项目的路径
    ruffSDKLocation: '',//sdk的位置
    histrory: List([]),// 打开的历史记录，最多10个 {name:'',path:''}
    ip:'',//本机ip
    port:''//rap log 服务器用的端口
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
                result.projectPath = action.data.histrory[0].path;
            }
            appPath = result.appPath;
            
            // console.log('saveData',saveData)
            // console.log(12312,result.histrory.get(0))
            return result;
        case CHANGE_CONFIG:
            result = Object.assign({}, result, action.data);
            // result.histrory = List(action.data.histrory);
            // console.log(12312,result.histrory.get(0))
            return result;
        case OPEN_PROJECT:
            // console.log('OPEN_PROJECT',action.data)
            // result = Object.assign({},result,action.data);
            var histrory = result.histrory.unshift(action.data);//把最后打开的放在最上面
            var openPath = action.data.path;
            for (var i = 1, len = histrory.size; i < len; i++) {//之前的历史有该项目，清除掉
                if (openPath == histrory.get(i).path) {
                    histrory = histrory.delete(i);
                    break;
                }
            }
            if (histrory.size > 20) {
                histrory = histrory.slice(0, 20);
            }
            // console.log('histrory:',histrory)
            result.histrory = histrory;
            result.projectPath = openPath;
            cfg.saveData.histrory = histrory;
            saveConfig();
            // save(result.appPath + '\\config\\ruffhelper.cfg',saveData);
            return result;
        case REMOVE_PROJECT:
            var deletePath = action.data.path;
            var histrory = result.histrory;
            for (var i = 0, len = histrory.size; i < len; i++) {
                if (deletePath == histrory.get(i).path) {
                    result.histrory = histrory.delete(i);
                    break;
                }
            }
            cfg.saveData.histrory = result.histrory;
            saveConfig();
            return result;
        case RUFF_SDK_LOCATION://改变sdk位置
            result.ruffSDKLocation = action.data.ruffSDKLocation;
            cfg.saveData.ruffSDKLocation = action.data.ruffSDKLocation;
            saveConfig();
            return result;
    }
    return result;
}
var saveConfig = function () {
    //console.log('save:',appPath,saveData)
    //console.log(cfg.saveData)
    //save(appPath + '\\config\\ruffhelper.cfg',cfg.saveData);
    save(cfg.configPath, cfg.saveData);
}
/**输出的消息*/
var outputContent = function (state = "", action) {
    //console.log("outputContent:",action)
    switch (action.type) {
        case ADD_OUTPUT:
            //console.log('addOutput：',action)
            state += action.data;
            return state;
        default:
            return state;
    }
}
/**输出的消息*/
var logContent = function (state = "", action) {
    //console.log("outputContent:",action)
    switch (action.type) {
        case ADD_LOG:
            //console.log('addOutput：',action)
            if (cfg.fork) {
                // console.log(121, cfg.socket)
                // console.log(122,cfg.socket.send)
                // cfg.socket.emit('message',action.data)
                cfg.fork.send(action.data)
            }
            state += action.data;
            return state;
        case CLEAN_RAP_LOG:
            return "";
        default:
            return state;
    }
}

/**弹出层的面板信息
 * idx 面板的序号,每次增加,如果没有面板了才归零,用于key的计算,防止刷新错误
 * panels 面板信息数组{index:序号,type:'sdkselector,callback:fun,data:{}}
 * */
var alerts = function(state={index:0,panels:[]},action){
    var result = Object.assign({},state)
    switch (action.type){
        case SHOW_ALERT:
            result.index +=1;
            var panel = action.data;
            panel.index = state.index;
            result.panels.push(panel);
            return result;
        case CLOSE_ALERT:
            var idx = action.data;
            var idxRemove;
            for(var i=0,len=result.panels.length;i<len;i++){
                if(idx == result.panels[i].index){
                    idxRemove = i;
                    break;
                }
            }
            result.panels.splice(idxRemove,1);
            if(result.panels.length==0){
                result.index = 0;
            }
            return result;
        default:
            return state;
    }
    // return state;
}
const appreducer = combineReducers({
    config, outputContent, logContent,alerts
});
export default appreducer;