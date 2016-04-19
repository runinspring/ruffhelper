import React from 'react';
import {connect} from 'react-redux';
import {tr,cutCharToCenter} from '../../lib/Utils'
//var BrowserWindow = require('browser-window');
import {shell} from 'electron';
//import {BrowserWindow} from 'remote';
//import {getVersion} from '../../actions/AppActions.jsx';
class CommandArea  extends React.Component {
    constructor(props){
        super(props)
        this.state={
            projectPath:"CommandArea",//项目路径
            version:"CommandArea",//版本号
            strPath:'',//路径的文字
            strVersion:''//版本的文字
        }
    }
    componentDidMount(){
        //console.log(13213123)
        //var str = "E:/ZhiHuaSiStudio/2016/RuffHelper/node_modules/babel-preset-es2015/node_modules/test1";
        //var str = "E:/ZhiHuaSiStudio/2016/RuffHelper/node_modules/babel-preset-es2015/node_modules/test1";
        //console.log(str.length);
        // this.setPositionAtBottom();
        // getVersion();
        this.setVersionValues();
    }
    componentWillUnmount(next){
        // console.log('componentWillUnmount:',next)
        // this.setVersionValues();
    }
    componentDidUpdate() {
        // console.log('props',props)
        this.setVersionValues();
    }
    setVersionValues(){
        this.setPositionAtBottom();
        if(this.props.projectPath != this.state.projectPath){
            var strPath = this.props.projectPath?this.props.projectPath:tr(54);//54 请选择项目
            //var str = "E:/ZhiHuaSiStudio/2016/RuffHelper/node_modules/babel-preset-es2015/node_modules/test1";
            //strPath = cutCharByLength(strPath,60);
            strPath = cutCharToCenter(strPath,52);
            this.setState({projectPath:this.props.projectPath,strPath:strPath});
        }
        if(this.props.version!=this.state.version){
            var strVersion = this.props.version?this.props.version:tr(53);//53 请安装 rap
            this.setState({version:this.props.version,strVersion:strVersion});
        }
    }
    /**定位到最下面一行*/
    setPositionAtBottom(){
        // console.log('setPositionAtBottom')
        var ex = document.getElementById("rapCommandArea");//定位到最下面一行
        ex.scrollTop = ex.scrollHeight;
        // console.log('ex,',ex.scrollTop,ex.scrollHeight)
    }
    render(){
        var self = this;
        //console.log('render:',this.props.version)
        //51 rap version
        var title = `<b> --${tr(51)} <b style="color:red">${this.state.strVersion}</b> --[ ${this.state.strPath} ]</b>`;

        return(
            <div>
                <button className="btnGreen" style={{position:"absolute",height:'18',padding:" 0 4px 0 4px",right:0,top:'-2px'}} onClick={()=>{
                console.log(213123,self.props.projectPath);
                //window.open(self.props.projectPath)
                shell.openItem(self.props.projectPath)
                //var win = new BrowserWindow({ width: 800, height: 600});
                //win.loadURL(self.props.projectPath);
                }}>{tr(11)}</button>
                <div dangerouslySetInnerHTML={{__html: title}}></div>

                <div id="rapCommandArea" className="outputArea selectable textArea">
                    <div dangerouslySetInnerHTML={{__html: this.props.output}}></div>
                </div>
                <div>
                </div>
            </div>
        )
    }
}
//
// style={{height:242,overflowY:'auto'}}
function select(state) {
    return{
        ruffSDKLocation:state.config.ruffSDKLocation,
        version:state.config.rapVersion,
        projectPath:state.config.projectPath,
        config:state.config,
        output:state.outputContent
    }
}
export default connect(select)(CommandArea);
