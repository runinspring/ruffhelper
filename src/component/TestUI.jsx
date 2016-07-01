import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {commands} from '../lib/Commands';
import {tr} from '../lib/Utils'
import {getIpAddress,getAvailablePort} from '../lib/Files';
import {saveString,save} from '../lib/FileUtil';
import CommandArea from './right/CommandArea.jsx';
import LogArea from './right/LogArea.jsx';
import ExtraQrCode from './rights/ExtraQrCode.jsx';
import ExtraButton from './rights/ExtraButton.jsx';
// import {createServer} from '../server/RapLogServer';
import {ADD_LOG,commonCommand,sendCommand,getVersion,addOutputCooked,addOutputUnCooked,sendLogCommand,showAlert} from '../actions/AppActions.jsx';
import Alerts, {PanelSystemUpgrade, PanelWiFi, PanelInput,PanelSaveLog} from './Alerts.jsx';
import QRCode from 'qrcode.react';
class TestUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qr:""
        }
        this.textIdx = 0;
        // commands('rap version');
    }
    componentDidMount() {
        var ip = getIpAddress();
        // console.log("ip:", ip);
        getAvailablePort((port) => {
            port = 8081;
            var url = `http://${ip}:${port}`
            this.setState({qr:url})
            // console.log(`Server  ${ip}:${port}`)
            var child_process = require("child_process");
            // var serverPath = 
            // console.log('pathName:', __dirname);
            var childProcess = child_process.spawn("node", [`./app/server/RapLogServer.js`, ip, port]);
            
            childProcess.stdout.on('data', function (data) { 
                console.log('data:',data.toString())
            })
            childProcess.stdout.on('err', function (err) { 
                console.log('err:',err.toString())
            })
            this.socket = io.connect(url, { reconnection: true, reconnectionDelay: 1000 });
            this.socket.on('connect', function () {
                console.log('----connection2----');
            });
        });
        
        
        
        // sendCommand('rap device add button',function(){
        //         console.log('end');
        //     },this.props.projectPath);
    }
    createServer() {
        // console.log(78, this)
        this.textIdx +=1;
        
        this.socket.emit("message",`mesaagesaga</br>1</br>2</br>3</br>4</br>.:${this.textIdx}`)
    }
    // <QRCode value={this.state.qr} />
    // <QRCode value={this.state.qr} />
    testLog() {
        // console.log('testLog')
        addOutputCooked(tr(200,tr(15)), true,ADD_LOG);//200 执行命令：xxxx
    }
    saveLog() {
        // console.log('saveLog')
        // var p = 'E:\\ZhiHuaSiStudio\\2016\\RuffHelper\\test\\t98\\t2.txt';
        // saveString(p, 'dsafsdf',function () {
        //     console.log("saveLogEnd");
        //     addOutputCooked(tr(22), true,ADD_LOG);//22 保存日志成功
        // });
        // // saveString("E:\ZhiHuaSiStudio\2016\RuffHelper\test\t99\t2.txt", "okok");
        
        // return;

        var self = this;
        showAlert(PanelSaveLog, function (path) {
            var txt = self.props.logContent;
            // console.log('<br>')
            txt = txt.replace(/<br>/g,"\r\n")
            txt= txt.replace(/<[^>]+>/g,"");//可以匹配<script></style></body>等，并置空。而不是替换<和>两个符号
            txt = txt.replace(/&amp;/g,"&");//把 &amp; 替换成&;
            txt = txt.replace(/&lt;/g,"<");//把 &lt; 替换成<
            txt = txt.replace(/&gt;/g,">");//把 &gt; 替换成>
            txt = txt.replace(/&nbsp;/g," ");//把 &nbsp; 替换成空格
            // fs.writeFileSync(filePath, str, charset);
            saveString(path, txt);
            addOutputCooked(tr(22), true, ADD_LOG);//22 保存日志成功
            addOutputCooked(path, true,ADD_LOG);//22 保存日志成功
            // console.log('showAlertEnd:', value);
        })
        // addOutputCooked(tr(210), true);//请先打开 ruff 项目
    }
    render() {
        return (
            <div>
                9901
                Qrcode
                <button onClick={() => { this.testLog(); } }>test</button>
                <button onClick={() => { this.saveLog(); } }>save</button>
                <ExtraButton  onClick={() => {
                    
                } } tr={14} iconName="caret-circle-o-right"/>
                <ExtraQrCode url={this.state.qr}/>
                <LogArea/>
                <Alerts/>
            </div>
        )
    }
    // render(){
    //     return (
    //         <div>
    //             <div className="rightArea">
    //                 <CommandArea/>
    //                 <LogArea/>
    //             </div>
    //         <Alerts/>    
    //         </div>
    //     )
        
    // }    
}

function select(state) {
    return{
        projectPath: state.config.projectPath,
        logContent:state.logContent
    }
}
export default connect(select)(TestUI);
