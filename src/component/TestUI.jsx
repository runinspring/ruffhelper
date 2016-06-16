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
    render() {
        return (
            <div>
                9901
                <button onClick={() => this.createServer() }>test</button>
                <QRCode value={this.state.qr} />
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
