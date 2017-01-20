/**新建一个rap项目*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { LEFT_CHANGE_CLUMTYPE, addLog, COLOR_RED, COLOR_GREEN, rapCommand } from '../../actions/AppActions';
import { tr, cutCharByLength } from '../../lib/Utils';
import Input from '../ui/Input';
import FolderSelector from '../ui/FolderSelector';
var fs = require('fs');
var path = require('path');
var validateVersion = require('validate-version');
class C3_NewProject extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newAppPath: '',
            newAppName: '',
            newAppVersion: '0.2.0',
            newAppDescription: '',
            newAppAuthor: '',
        }
        //test
        // this.state.newAppPath = '/Users/zhangyu/jeff/ZhiHuaSiStudio/2016/ruffhelper/config'
        // this.state.newAppName = 't22';
    }
    componentDidMount() {
        // this.onCreateRuffProject();//test
    }
    onCreateRuffProject() {
        // console.log('onCreateRuffProject')
        var self = this;
        var newAppPath = this.state.newAppPath;
        var newAppName = this.state.newAppName;
        var newAppVersion = this.state.newAppVersion;
        if (!/^[0-9a-z]+$/.test(newAppName)) {
            // console.log('项目名称只能是小写的英文字母')
            // addOutputCooked(tr(214),true);//项目名称只能是小写的英文字母
            addLog(tr(214), COLOR_RED);
            return;
        }
        if (!validateVersion.validate(newAppVersion)) {//console.log('版本号错误')
            addLog(tr(207, newAppVersion), COLOR_RED);
            this.setState({ newAppVersion: '0.1.0' })
        } else if (fs.existsSync(newAppPath)) {//console.log('路径正确')
            var createPath = `${newAppPath}/${newAppName}`;//创建的路径
            if (fs.existsSync(createPath)) {
                addLog(tr(206, createPath), COLOR_RED);//该项目已存在
            } else {
                fs.mkdir(createPath, function (err) {
                    if (err) {
                        addLog(tr(208, err), COLOR_RED);//创建项目失败
                    } else {//成功
                        addLog(tr(209, createPath), COLOR_GREEN);////创建文件夹
                        var inputObj = {
                            '? app name': newAppName,
                            '? version': newAppVersion,
                            '? description': self.state.newAppDescription,
                            '? author': self.state.newAppAuthor
                        }
                        rapCommand('rap init', createPath,null,inputObj);//testing
                        // rapCommand('rap --version')
                    }
                })
            }
        } else {//console.log('路径不存在');
            addLog(tr(205, newAppPath), COLOR_RED);//路径不存在
        }
    }

    render() {
        var type = this.props.type;
        if (type == 0) {
            return <div />
        }
        // console.log(this.state)
        var self = this;
        var styleItem = { marginLeft: '5px', display: 'block' }
        var disabled = this.state.newAppPath && this.state.newAppName ? false : true;
        //tr:4 Ruff 项目位置;5 创建项目;6 Ruff 项目名称;7项目版本;8项目描述;9项目作者
        // console.log('newAppPath:',this.state.newAppPath)
        // var styleHeader = { padding: '0 4px 0 4px', color: '#5EFDFF' }
        var styleHeader = { padding: '0 4px 0 4px' }
        return (
            <div style={styleHeader}>
                <div style={styleItem}>{tr(4)}</div>
                <div style={{ width: '140px', display: 'block' }}>
                    <Input placeholer={tr(4)} value={this.state.newAppPath} style={{ width: '118px', display: 'inline-block', float: 'left' }} onChange={(value) => {
                        self.setState({ newAppPath: value })
                    } } />
                    <FolderSelector style={{
                        position: 'relative', left: '116px', marginLeft: '4px',
                        width: '20px', height: '20px'
                    }} padding='0 4px' iconSVGUrl="css/assets/ellipsis.svg" openFolderCallBack={(value) => { this.setState({ newAppPath: value }) } } />
                </div>
                <div style={styleItem}>{tr(6)}</div>
                <Input value={this.state.newAppName} placeholer={tr(6)} onChange={(value) => {
                    self.setState({ newAppName: value })
                } } />
                <div style={styleItem}>{tr(7)}</div>
                <Input value={this.state.newAppVersion} placeholer={tr(7)} onChange={(value) => {
                    self.setState({ newAppVersion: value })
                } } />
                <div style={styleItem}>{tr(8)}</div>
                <Input value={this.state.newAppDescription} placeholer={tr(8)} onChange={(value) => {
                    self.setState({ newAppDescription: value })
                } } />
                <div style={styleItem}>{tr(9)}</div>
                <Input value={this.state.newAppAuthor} placeholer={tr(9)}  onChange={(value) => {
                    self.setState({ newAppAuthor: value })
                } } />
                <div style={{ margin: '6px 16px 0 8px ' }}>
                    <button className="JUI JButton" disabled={disabled} onClick={this.onCreateRuffProject.bind(this)}>{tr(5)}</button>
                </div>

            </div>
        )
    }
}
function select(state) {
    return {
        type: state.left.clum3
    }
}
export default connect(select)(C3_NewProject);
C3_NewProject.propTypes = {
    clumId: PropTypes.number.isRequired//栏目的id
}