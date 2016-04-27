import React from 'react';
import {connect} from 'react-redux';
import {addOutputCooked,sendCommand} from '../../actions/AppActions.jsx'
import LocationSelector from './cp/LocationSelector.jsx';
import {Input} from 'antd';
import {tr} from '../../lib/Utils'
var fs = require('fs');
var path = require('path');
var validateVersion = require('validate-version');
class NewProject extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newAppPath: '',
            newAppName: '',
            newAppVersion: '0.1.0',
            newAppDescription: '',
            newAppAuthor: ''
        }
    }

    onCreateApp(){
        // console.log('onCreateApp');
        var self = this;
        var newAppPath = this.state.newAppPath;
        var newAppVersion = this.state.newAppVersion;
        var newAppName = this.state.newAppName;
        if(!validateVersion.validate(newAppVersion)){//校验版本号
            addOutputCooked(tr(207,newAppVersion),true);//版本号错误
            this.setState({newAppVersion:'0.1.0'})
        }else if (fs.existsSync(newAppPath)) {//console.log('路径正确')
            var path2 = `${newAppPath}/${newAppName}`;
            if (fs.existsSync(path2)) {
                addOutputCooked(tr(206,path2),true);//该项目已存在
            }else{
                fs.mkdir(path2,function (err) {
                    if(err){
                        addOutputCooked(tr(208,err),true);//创建项目失败
                    }else{

                        var inputObj = {
                            '? project name':newAppName,
                            '? version':newAppVersion,
                            '? description':self.state.newAppDescription,
                            '? author':self.state.newAppAuthor
                        }
                        sendCommand('rap init',function(){
                            console.log('end');
                        },path2,inputObj);
                        addOutputCooked(tr(209,path2));//创建文件夹
                    }
                })

                // addOutputCooked('ok',true);//该项目已存在
            }
        }else{
            addOutputCooked(tr(205,newAppPath),true);//路径不存在
        }
    }
    render() {
        var self = this;
        var styleTitle = {margin: '0 0 0 8px'}
        var styleItem = {margin: '0 0 2px 0'}
        var createDisabled = true;//默认禁止创建项目
        if(this.state.newAppPath && this.state.newAppName){
            createDisabled = false;
        }
        return (
            <div style={{margin:'-12px -12px -12px -12px'}}>
                <div style={{margin:'0 0 6px 0'}}>
                    <div style={styleItem}>
                        <div style={styleTitle}>{tr(4)}</div>
                        <LocationSelector inputValue={this.state.newAppPath} placeholder={tr(4)}
                                          onChangeValue={(value)=>{self.setState({newAppPath:value})}}/>
                    </div>
                    <div style={styleItem}>
                        <div style={styleTitle}>{tr(6)}</div>
                        <Input id="newAppName" placeholder={tr(6)} size="small" value={this.state.newAppName}
                               onChange={(e)=>{self.setState({newAppName:e.target.value})}}/>
                    </div>
                    <div style={styleItem}>
                        <div style={styleTitle}>{tr(7)}</div>
                        <Input id="newAppVersion" placeholder={tr(7)} size="small" value={this.state.newAppVersion}
                               onChange={(e)=>{self.setState({newAppVersion:e.target.value})}}/>
                    </div>
                    <div style={styleItem}>
                        <div style={styleTitle}>{tr(8)}</div>
                        <Input id="newAppDescription" placeholder={tr(8)} size="small"
                               value={this.state.newAppDescription}
                               onChange={(e)=>{self.setState({newAppDescription:e.target.value})}}/>
                    </div>
                    <div style={styleItem}>
                        <div style={styleTitle}>{tr(9)}</div>
                        <Input id="newAppAuthor" placeholder={tr(9)} size="small" value={this.state.newAppAuthor}
                               onChange={(e)=>{self.setState({newAppAuthor:e.target.value})}}/>
                    </div>
                </div>
                <button style={{width:'100%'}} className="btnBlue" disabled={createDisabled} onClick={this.onCreateApp.bind(this)}>{tr(5)}</button>
            </div>
        )
    }
}
function select(state) {
    return {
        config: state.config
    }
}
export default connect(select)(NewProject);
