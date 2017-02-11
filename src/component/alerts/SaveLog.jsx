import React, {PropTypes} from 'react';
import {tr} from '../../lib/Utils';
import {escapePath} from '../../lib/FileUtil';
import Input from '../ui/Input';
import FolderSelector from '../ui/FolderSelector';
import Button from '../ui/Button';
import {command,CLOSE_ALERT} from '../../actions/AppActions.jsx';
var fs = require('fs');
export default class SaveLog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textPath: '',
            textName: '',
            warn:'',//警告信息
        }
    }

    componentDidMount() {
        //初始化渲染执行之后立刻调用
    }

    componentDidUpdate(prevProps) {
        //在组件的更新已经同步到 DOM 中之后立刻被调用
    }
    saveLog(){
        console.log('saveLog');
        var textPath = this.state.textPath;
        var fileName = this.state.textName;
        if(!fs.existsSync(textPath)){//路径存在
            this.setState({warn:tr(205, " ")})//路径不存在：
            return;
        }else{
            this.setState({warn:""})
        }
        var logPath = escapePath(`${textPath}/${fileName}.txt`);
        if(fs.existsSync(logPath)){
            this.setState({warn:tr(206, fileName+'.txt')})//该项目已存在
        }else {
            this.props.item.callback(logPath);
            this.closePanel();
        }
        // console.log('logPath:',logPath);
    }
    /**关闭面板*/
    closePanel(){
        command(CLOSE_ALERT,this.props.index);
    }

    render() {
        var self = this;
        // console.log('state:',this.state)
        var textPath = this.state.textPath;
        var fileName = this.state.textName;
        var typeButton = textPath&&fileName?false:true;


        // var buttonType = this.state.
        return (
            <div className="panel">
                <div style={{marginBottom:'10px'}}>{tr(19)}</div>
                <div style={{textAlign: 'left'}}>
                    <div>{tr(20)}</div>
                    <div>
                        <Input placeholer={tr(20)} value={this.state.textPath}
                               style={{width: '192px', float: 'left'}} onChange={(value) => {
                            {
                                self.setState({textPath: value})
                            }
                        } }/>
                        <FolderSelector style={{
                            float: 'left', paddingLeft: '4px', paddingTop: '3px',
                            width: '22px', height: '20px', marginLeft: '2px'
                        }} iconName="icon-ellipsis" openFolderCallBack={(value) => {
                            this.setState({textPath: value})
                        } }/>
                    </div>
                    <div className="clear"/>
                    <div>{tr(21)}</div>
                    <div>
                        <Input placeholer={tr(21)} value={this.state.textName}
                               style={{width: '192px', float: 'left'}} onChange={(value) => {
                            {
                                self.setState({textName: value})
                            }
                        } }/>
                        <div style={{paddingTop: '2px'}}>.txt</div>
                    </div>
                    <div className="clear"/>
                </div>

                <div style={{color:'#ffccff'}}>
                    {this.state.warn}
                </div>
                <div className="clear" style={{marginBottom:'10px'}}/>
                <div style={{display: 'flex'}}>
                    <div style={{margin: 'auto'}}>
                        <Button value={tr(12)} style={{width: '40px', float: 'left'}} disabled={typeButton} onClick={this.saveLog.bind(this)}/>
                        <Button value={tr(13)} style={{width: '40px', float: 'left', marginLeft: '20px'}} onClick={this.closePanel.bind(this)}/>
                    </div>
                </div>
                <div className="clear"/>
            </div>
        )
    }
}
SaveLog.propTypes = {
    index: React.PropTypes.number.isRequired,//面板的索引序号
    item:React.PropTypes.object.isRequired//面板的信息
};