import React from 'react';
import {connect} from 'react-redux';
import {tr,cutCharToCenter} from '../../lib/Utils'
import ExtraButton from './ExtraButton.jsx';
//var BrowserWindow = require('browser-window');
import {shell} from 'electron';
import { Icon,Button } from 'antd';
//import {BrowserWindow} from 'remote';
//import {getVersion} from '../../actions/AppActions.jsx';
class CommandsArea  extends React.Component {
    constructor(props){
        super(props)
        // console.log('CommandsArea')
        this.state={
            projectPath:"CommandArea",//项目路径
            version:"CommandArea",//版本号
            strPath:'',//路径的文字
            strVersion:'',//版本的文字
            output:'输出的文字'
        }
        
    }
    
    componentDidMount(){
        // console.log('componentDidMount')
        this.setVersionValues();
        
    }
    componentWillMount() {
        //tr--11 打开项目文件夹
        this.props.extraContent('extra1', <ExtraButton  onClick={() => {shell.openItem(this.props.projectPath); } } tr={11} iconName="folder-open"/>)
        // this.props.extraContent('extra1', (<div>
        //     <Button onClick={() => { shell.openItem(this.props.projectPath); } }><Icon type="folder-open"/></Button>
        //         </div>))
    }
    // componentWillUnmount(next){
    // }
    componentDidUpdate(value) {
        // console.log('props',value)
        this.setVersionValues();
    }
    setVersionValues(){
        // console.log('setVersionValues')

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
        if(this.props.output != this.state.output){
            this.setState({output:this.props.output});
            this.setPositionAtBottom();
        }
    }
    /**定位到最下面一行*/
    setPositionAtBottom(){
        // console.log('setPositionAtBottom')
        var ex = document.getElementById("rapCommandArea");//定位到最下面一行
        ex.scrollTop = ex.scrollHeight;
        // console.log('ex,',ex.scrollTop,ex.scrollHeight)
    }
    render() {
        // console.log('cmooands.render')
        var self = this;
        //console.log('render:',this.props.version)
        //51 rap version
        var title = `<b> --${tr(51)} <b style="color:red">${this.state.strVersion}</b> --[ ${this.state.strPath} ]</b>`;

        return(
            <div>
                <div dangerouslySetInnerHTML={{__html: title}}></div>

                <div id="rapCommandArea" className="outputArea selectable textArea">
                    <div style={{wordWrap:'break-word'}} dangerouslySetInnerHTML={{__html: this.props.output}}></div>
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
export default connect(select)(CommandsArea);
