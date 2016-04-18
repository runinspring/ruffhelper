/**命令行的页面*/
import React from 'react';
import {connect} from 'react-redux';
import {dialog} from 'remote';
import {commands} from '../../lib/Command';
import NewProject from './basic/NewProject.jsx';
import OutPutArea from './basic/OutPurArea.jsx';
import {tr} from '../../lib/Utils'
import {sendCommand,changConfig} from '../../actions/AppActions.jsx';
var util = require("util")
class Basic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            output: "",
            showPanelNewProject: false,//是否显示新建窗口的面板
        }
    }

    componentDidMount222() {
        console.log("componentDidMount")
        /*sendCommand('rap version',function(value){
         console.log('判断 rap 是否安装成功');
         });*/

        var sss = '0.0.3.s';
        //sss = "adasd"
        var reg = /\d+(\.\d+){0,2}/;
        var r = sss.match(reg);
        var version="";//版本号
        console.log("正则匹配:",r,r.index)
        var outPut="";
        sendCommand('rap version2', function (value) {
            var result = value.match(reg);
            if(result && result.index==0){
            }
            console.log('判断 rap 是否安装成功');
        }, null, null, function(value){
            //var idx
            //console.log('outPut123:',outPut)
        });//不输出结果
    }

    onOpenFolder():void {
        //console.log('onOpenFolder 打开文件夹');
        var appPath = this.props.config.appPath;
        var projectPath = this.props.config.projectPath;
        var path = projectPath ? projectPath : appPath;
        dialog.showOpenDialog({defaultPath: path, properties: ['openDirectory']}, this.onOpenFolderEnd.bind(this));
    }

    onOpenFolderEnd(paths):void {
        console.log('打开文件夹的路径:', paths);
        if (paths) {
            var path = paths[0];
            //console.log(123123,path,this.props.config.projectPath);
            if (this.props.config.projectPath != path) {//打开了新的文件夹
                this.props.dispatch(changConfig({projectPath: path,save:true}));
            }
        }
    }

    render() {
        var self = this;
        //console.log('render')
        //console.log('123123:',this.props.pageSelect)
        //console.log('output',this.state.output);
        //console.log(123,this.props.config)
        //console.log(123123)
        //tr:100切换项目  101新建项目
        return (
            <div>
                <button onClick={()=>{sendCommand("rap version")}}>version</button>
                <div>-----------------</div>
                <div>{this.props.config.rapVersionDec}</div>
                <button  onClick={this.onOpenFolder.bind(this)}>{tr(100)}</button>
                <button  onClick={this.onOpenFolder.bind(this)}>{tr(101)}</button>
                <div>-----------------</div>
                <NewProject/>
                <OutPutArea/>
            </div>
        )
    }
}
/*<div id="outputArea" className="outputArea">
 <div dangerouslySetInnerHTML={{__html: this.state.output}}></div>
 </div>*/
//<div dangerouslySetInnerHTML={{__html: this.state.output}}></div>
//<div style={{fontSize:"12px"}} id="outputArea" dangerouslySetInnerHTML={{__html: this.state.output}}></div>
function select(state) {
    return {
        config: state.config
    }
}
export default connect(select)(Basic);