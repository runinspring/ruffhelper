import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {commands} from '../lib/Commands';
import {tr} from '../lib/Utils'
import {getIpAddress,getAvailablePort} from '../lib/Files';
import CommandArea from './right/CommandArea.jsx';
import LogArea from './right/LogArea.jsx';
// import {createServer} from '../server/RapLogServer';
import {sendCommand,getVersion,addOutputCooked,addOutputUnCooked,sendLogCommand,showAlert} from '../actions/AppActions.jsx';
import Alerts, {PanelSystemUpgrade, PanelWiFi, PanelInput} from './Alerts.jsx';
import QRCode from 'qrcode.react';
class TestUI extends React.Component {
    constructor(props) {
        super(props);
        // commands('rap version');
    }
    componentDidMount() {
        var ip = getIpAddress();
        console.log("ip:", ip);
        getAvailablePort(function (port) {
            console.log(`Server  ${ip}:${port}`)
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
            
            
// cwd: parentDir,            
            // console.log('port:', port);
            // createServer(ip, port);
            // var logServer = require('../server/RapLogServer');
            // import {createServer} from '../server/RapLogServer';
        });
        
        
        // sendCommand('rap device add button',function(){
        //         console.log('end');
        //     },this.props.projectPath);
    }
    createServer() {
        console.log(78,this)
    }
    render() {
        return (
            <div>
                <button onClick={() => this.createServer() }>test</button>
                <QRCode value="http://baidu.com" />
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
        projectPath: state.config.projectPath
    }
}
export default connect(select)(TestUI);
