import React from 'react';
import {connect} from 'react-redux';
import {commands} from '../lib/Commands';
import {tr} from '../lib/Utils'
import CommandArea from './right/CommandArea.jsx';
import LogArea from './right/LogArea.jsx';
import {sendCommand,getVersion,addOutputCooked,addOutputUnCooked,sendLogCommand,showAlert} from '../actions/AppActions.jsx';
import Alerts,{PanelSystemUpgrade, PanelWiFi, PanelInput} from './Alerts.jsx';
class TestUI extends React.Component {
    constructor(props) {
        super(props);
        // commands('rap version');
        
    }
    componentDidMount() {
        console.log(123123)
        sendCommand('rap device add button',function(){
                console.log('end');
            },this.props.projectPath);
    }
    render(){
        return (
            <div>
                <div className="rightArea">
                    <CommandArea/>
                    <LogArea/>
                </div>
            <Alerts/>    
            </div>
        )
        
    }    
}

function select(state) {
    return{
        projectPath: state.config.projectPath
    }
}
export default connect(select)(TestUI);
