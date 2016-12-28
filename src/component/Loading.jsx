import React from 'react';
import {connect} from 'react-redux';
import remote,{app, BrowserWindow} from 'remote';
import config, {isPublic, isApp} from '../config';
import {escapePath, save} from '../lib/FileUtil';
import path from 'path';
import {read} from '../lib/FileUtil';
import {getIpAddress,getAvailablePort} from '../lib/Files';
import fs from 'fs';
import {init} from '../actions/AppActions.jsx';
// import {tr} from '../lib/Utils';
// import {init,getVersion,showAlert} from '../actions/AppActions.jsx';
// import {existRapSDK,getIpAddress,getAvailablePort} from '../lib/Files';
// import {PanelSDKSelector,PanelInput,PanelSelecter} from './Alerts.jsx';


class Loading extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // console.log('真实的DOM被渲染出来后调用')
        var self = this;
        var data = {};
        data.language = app.getLocale();
        if (data.language == "zh-CN") {//加载语言包
            require('../lib/locales/zh_CN');
        } else {
            require('../lib/locales/en_US');
        }
        data.appPath = app.getAppPath();
        var platform = remote.process.platform.toLowerCase();
        if (platform == 'win32') {//win系统
            data.osType = config.platform = 'Windows';
            config.configPath = escapePath(path.dirname(data.appPath) + '/config/ruffhelper.cfg');
            //var cfgPath = remote.process.env.APPDATA || remote.process.env.USERPROFILE + "/AppData/Roaming";
            //config.configPath = escapePath(cfgPath + "/ruffhelper/config/ruffhelper.cfg");
        } else {
            data.osType = config.platform = 'Mac';
            var cfgPath = remote.process.env.HOME || ("/Users/" + (remote.process.env.NAME || remote.process.env.LOGNAME));
            config.configPath = cfgPath + "/Library/Application Support/RuffHelper/config/ruffhelper.cfg";
        }
        if (app.getVersion() == "0.0.0") {//测试版的配置文件放在项目路径下
            config.configPath = './config/ruffhelper.cfg';
        }
        var configStr = read(config.configPath);
        if (configStr) {//读取到了配置文件
            try {
                var configData = JSON.parse(configStr);
                if (configData.histrory) {
                    data.histrory = [];
                    var hisPath = "";
                    for (let i = 0, len = configData.histrory.length; i < len; i++){
                        hisPath = escapePath(configData.histrory[i].path);
                        if (fs.existsSync(hisPath)) {//路径存在，不存在的就忽略了
                            data.histrory.push({path: hisPath, name: path.basename(hisPath)});
                        } else {
                            console.log('历史记录不存在：', hisPath);
                        }
                    }
                }
            } catch (e) {
                console.log('config err:', e);
            }
        }
        
        getAvailablePort((port) => {//获取端口号的ip地址
            data.port = port;
            data.ip = getIpAddress();
            console.log(`本地服务器地址:${data.ip}:${port}`);
            self.initEnd(data);//初始化结束
        })
    }
    /**初始化结束 */
    initEnd(data) {
        init(this.props.dispatch, data);
        // console.log('props.config:',this.props.config)
        // console.log('data:', data);
        // console.log('config:', config);
        window.location.href = '#/main';
    }
    render() {
        // console.log('render')
        return (
            <div className="loading">
                
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
export default connect(select)(Loading);