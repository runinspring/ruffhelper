import React from 'react';
import {connect} from 'react-redux';
import {app} from 'remote';
import {tr} from '../../lib/Utils'
import {saveString} from '../../lib/FileUtil';
import { Icon,Button } from 'antd';
import ExtraButton from './ExtraButton.jsx';
import ExtraQrCode from './ExtraQrCode.jsx';
import {killRaplog} from '../../lib/Commands'
// import {getIpAddress,getAvailablePort} from '../../lib/Files';
import {sendLogCommand,addOutputCooked,ADD_LOG,commonCommand,CLEAN_RAP_LOG,showAlert} from '../../actions/AppActions.jsx'
import {PanelSaveLog} from '../Alerts.jsx';
var cfg = require('../../config');
class LogsArea  extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            qr: `http://${this.props.ip}:${this.props.port}`
        }
        console.log('qr url :',this.state.qr)

    }
    componentDidMount()
    {
        // console.log(8989,this.props.ip,this.props.port)
        var child_process = require("child_process");
        console.log('dir',__dirname)
        var url = `/server/RapLogServer.js`;
        if (app.getVersion() == "0.0.0") {//测试版位置
            url = './app/server/RapLogServer.js';
        }
        var childProcess = child_process.spawn("node", [url, this.props.ip, this.props.port]);
        console.log("url,",url);
        childProcess.stdout.on('data', function (data) {
            console.log('data:',data.toString())
        })
        childProcess.stdout.on('err', function (err) {
            console.log('err:',err.toString())
        })
        this.socket = io.connect(this.state.qr, { reconnection: true, reconnectionDelay: 1000 });
        cfg.socket = this.socket;
        this.socket.on('connect', function () {
            console.log('----connection2----');
        });
        this.setPositionAtBottom();
    }
    componentWillMount() {
        console.log('this.state.qr',this.state.qr);
        // this.props.extraContent('extra1', <ExtraButton  onClick={() => {shell.openItem(this.props.projectPath); } } tr={11} iconName="folder-open"/>)
        <ExtraButton  onClick={() => {} } tr={11} iconName="qrcode"/>
        this.props.extraContent('extra2', (
            <div>
                <ExtraButton  onClick={() => {//启动raplog
                    var projectPath = this.props.projectPath;
                    if (!projectPath) {
                        addOutputCooked(tr(210), true);//请先打开 ruff 项目
                    } else {
                        sendLogCommand(projectPath)}
                    }
                } tr={14} iconName="caret-circle-o-right"/>
                <ExtraQrCode url={this.state.qr}/>
                <ExtraButton  onClick={() => {//停止显示log
                    killRaplog();
                    addOutputCooked(tr(200,tr(15)), true,ADD_LOG);//200 执行命令：xxxx
                } } tr={15} iconName="cross-circle-o"/>
                <ExtraButton  onClick={() => {//清除log
                    killRaplog();
                    commonCommand(CLEAN_RAP_LOG);
                    addOutputCooked(tr(200,tr(16)), true,ADD_LOG);//200 执行命令：xxxx
                } } tr={16} iconName="delete"/>
                <ExtraButton  onClick={()=>{this.saveLog(); }} tr={17} iconName="save"/>

            </div>))
    }
    componentDidUpdate() {
        this.setPositionAtBottom();
    }
    /**定位到最下面一行*/
    setPositionAtBottom(){
        var ex = document.getElementById("rapLogArea");//定位到最下面一行
        ex.scrollTop = ex.scrollHeight;
    }
    saveLog(){
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
    }
    render(){
        //52-- rap log 日志 --
        return(
            <div>
                <div><b>{tr(52)}</b></div>
                <div id="rapLogArea" className="outputArea selectable textArea">
                    <div style={{wordWarp:'break-word'}} dangerouslySetInnerHTML={{__html: this.props.logContent}}></div>
                </div>
            </div>
        )
    }
}
function select(state) {
    return{
        ip:state.config.ip,
        port:state.config.port,
        logContent:state.logContent,
        projectPath: state.config.projectPath
    }
}
export default connect(select)(LogsArea);
LogsArea.propTypes = {
        extraContent: React.PropTypes.func.isRequired
    };  // 注意这里有分号