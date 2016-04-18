import React from 'react';
import {connect} from 'react-redux';
import {tr} from '../../lib/Utils'
import {sendCommand,getVersion,addOutputCooked,sendLogCommand} from '../../actions/AppActions.jsx';
class RapCommand extends React.Component {
    constructor(props){
        super(props)
    }
    executeCommand(value){
        // console.log('projectPath',this.props.projectPath)
        var projectPath = this.props.projectPath;
        if(!projectPath){
            addOutputCooked(tr(210),true);//请先打开 ruff 项目
        }else{
            switch (value){
                case "rap log"://启动log
                    sendLogCommand(projectPath)
                    break;
                default:
                    sendCommand(value,null,projectPath)
                    break;
            }

        }
        // sendCommand(value,null,)
    }

    render(){
        //console.log(121321,<pageCmd></pageCmd>)
        //console.log(123,this.props.config)
        //console.log('render')
        //tr--0--Rap 命令
        var style={
            width:'100%',
            margin:'0 0 3px 0'
        }
        return(
            <div style={{margin:'-12px -12px -12px -12px'}}>
                <button className="btnBlue" style={style} onClick={this.executeCommand.bind(this,'rap deploy -s')}>rap deploy -s</button>
                <button className="btnBlue" style={style} onClick={this.executeCommand.bind(this,'rap log')}>rap log</button>
                <button className="btnBlue" style={style} onClick={getVersion}>rap version</button>
            </div>
        )
    }
}
function select(state) {
    return{
        projectPath:state.config.projectPath
    }
}
export default connect(select)(RapCommand);
