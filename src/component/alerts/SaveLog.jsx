import React, {PropTypes} from 'react';
import {tr} from '../../lib/Utils'
import Input from '../ui/Input';
import FolderSelector from '../ui/FolderSelector';
import Button from '../ui/Button';
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

    render() {
        var self = this;
        var textPath = this.state.textPath;
        var fileName = this.state.fileName;
        if(fs.existsSync(textPath)){//路径存在

        }


        // var buttonType = this.state.
        return (
            <div className="panel">
                <div>{tr(19) }</div>
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
                    ddd
                </div>
                <div className="clear" style={{marginBottom:'10px'}}/>
                <div style={{display: 'flex'}}>
                    <div style={{margin: 'auto'}}>
                        <Button value={tr(12)} style={{width: '40px', float: 'left'}}/>
                        <Button value={tr(13)} style={{width: '40px', float: 'left', marginLeft: '20px'}}/>
                    </div>
                </div>
                <div className="clear"/>
            </div>
        )
    }
}
SaveLog.propTypes = {
    index: React.PropTypes.number.isRequired
};