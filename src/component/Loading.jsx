import React from 'react';
import {connect} from 'react-redux';
import {app, BrowserWindow} from 'remote';
// import {tr} from '../lib/Utils';
import {init} from '../actions/AppActions.jsx';
import {read} from '../lib/FileUtil'
import config,{isPublic} from '../config';
import {existRapSDK} from '../lib/Files';
import {escapePath,save} from '../lib/FileUtil';
import path from 'path';
import fs from 'fs';
//import 'antd/style/index.less';
class MainShell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loadEnd: false,
            numEndDelay: 1200,//结束的延迟
            numFadeOutDelay: 800,//淡出的延迟时间
            numFade: '0.6s',//淡入淡出的时间
        }
        // console.log('isPublic:',isPublic)
        if (!isPublic) {//测试版的数据
            this.state.numEndDelay = 1;
            this.state.numFadeOutDelay = 1;
            this.state.numFade = '0.01s';
        }
    }

    componentDidMount() {
        // setDispatch(this.props.dispatch);
        this.setp1StartInit();
    }

    //第一步，初始化数据
    setp1StartInit() {
        var data = {}
        data.language = app.getLocale();
        if (data.language == 'zh-CN') {//加载语言包
            require('../lib/locales/zh_CN');
            //require('../lib/locales/en_US');
        } else {
            require('../lib/locales/en_US');
        }
        data.appPath = app.getAppPath();
        var ua = navigator.userAgent;
        if (ua.indexOf('Windows') > -1) {
            data.osType = 'Windows';
            // config.configPath = 'C:\\Users\\Administrator\\AppData\\Roaming\\ruffhelper\\config.cfg';
            config.configPath = path.dirname(data.appPath)+'\\config\\ruffhelper.cfg';
        } else {
            data.osType = 'Mac';
            config.configPath = path.dirname(data.appPath)+'/config/ruffhelper.cfg';
        }
        if(!isPublic){//测试版的配置文件放在项目路径下
            config.configPath = './config/ruffhelper.cfg';
        }

        //console.log("configPath:",config.configPath);
        //var configStr = read(data.appPath + '\\config\\ruffhelper.cfg');
        var configStr = read(config.configPath);
        //if (!config.isPublic) {
        //    console.log('配置数据：', configStr);
        //    if (configStr) {
        //        var dd = JSON.parse(configStr);
        //        if (dd.idx)dd.idx++;
        //        else dd.idx = 1
        //        config.saveData.idx = dd.idx;
        //    }
        //    save(config.configPath, config.saveData);
        //}
        if (configStr) {//读取到了配置文件
            try {
                var configData = JSON.parse(configStr);
                if (configData.histrory) {
                    data.histrory = [];
                    var hisPath = '';
                    var baseName = "";
                    for (let i = 0, len = configData.histrory.length; i < len; i++) {
                        //console.log('i:',i)
                        //console.log(configData.histrory[i])
                        hisPath = configData.histrory[i].path;
                        if(fs.existsSync(hisPath)){//路径存在，不存在的就忽略了
                            data.histrory.push({path: hisPath, name: path.basename(escapePath(hisPath))});
                        }else{
                            console.log('不存在：',hisPath);
                        }
                        //data.histrory[i] = {path: hisPath, name: path.basename(escapePath(hisPath))};
                    }
                    //data.histrory = configData.histrory;
                }
                if (configData.ruffSDKLocation) {
                    var sdkPath = existRapSDK(configData.ruffSDKLocation, data.osType);
                    if (sdkPath) {//判断sdk的路径是否存在
                        //console.log('sdk的路径存在')
                        data.ruffSDKLocation = sdkPath;
                    }
                }
            } catch (e) {
                //console.log('error:',e)
            }
        }
        this.initEnd(data);
    }

    initEnd(data) {
        var self = this;
        console.log('初始化数据2：', data)
        init(this.props.dispatch, this.props, data);
        setTimeout(function () {
            self.setState({loadEnd: true});
        }, this.state.numFadeOutDelay)

        setTimeout(function () {
            window.location.href = '#/main';
        }, this.state.numEndDelay);
    }

    render() {
        // console.log('render,',this.state)
        var style = {animation: 'fadeIn ' + this.state.numFade + ' forwards'}
        if (this.state.loadEnd) {
            style = {animation: 'fadeOut ' + this.state.numFade + ' forwards'}
        }
        // console.log('style:',style)

        return (
            <div className="stage loading" style={style}>
                <div className="bgImage"></div>
                <div className="stage logoContainer">
                    <div className="logo"/>
                </div>
            </div>
        )
    }
}
//style={{animation:'loadIn 3s'}}
function select(state) {
    return {
        config: state.config
    }
}
export default connect(select)(MainShell);