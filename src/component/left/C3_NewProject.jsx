/**新建一个rap项目*/
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {LEFT_CHANGE_CLUMTYPE, addLog, COLOR_RED, COLOR_GREEN, rapCommand, command} from '../../actions/AppActions';
import {tr} from '../../lib/Utils';
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
        this.idxAniEnd = 0;
        //test
        // this.state.newAppPath = '/Users/zhangyu/jeff/ZhiHuaSiStudio/2016/ruffhelper/config'
        // this.state.newAppName = 't22';
    }

    componentDidMount() {
        let self = this;
        var tree = ReactDOM.findDOMNode(this.refs['tree']);
        tree.addEventListener('webkitAnimationEnd', function (e) {
            if (self.props.type != 2) {
                return;
            }
            self.idxAniEnd += 1;
            // console.log(self.idxAniEnd)
            if (self.idxAniEnd == 11) {//动画结束，关闭面板
                self.idxAniEnd = 0;
                command(LEFT_CHANGE_CLUMTYPE, {key: self.props.clumId, value: 0});
            }
        })
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
            this.setState({newAppVersion: '0.1.0'})
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
                        rapCommand('rap init', createPath, null, inputObj);//testing
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
        var styleItem = {marginLeft: '5px', display: 'block'}
        var disabled = this.state.newAppPath && this.state.newAppName ? false : true;
        var getAni = function (index) {
            var aniName = type == 1 ? 'alphaShow' : 'alphaClose';
            var delay = aniName == 'alphaShow' ? index * 0.04 : (10 - index) * 0.04;
            return `${aniName} 0.4s ease ${delay}s`;
        }
        var getFillMode = function () {
            return type == 1 ? 'both' : 'forwards';
        }
        var getStyleItem = function (index) {
            // console.log('getStyleItem')
            var style = {marginLeft: '5px', display: 'block'}
            style.animation = getAni(index);
            style.animationFillMode = getFillMode();
            // console.log('style:', style)
            return style;
        }
        var getAniStyle = function (index) {
            var style = {}
            style.animation = getAni(index);
            style.animationFillMode = getFillMode();
            return style;
        }

        //tr:4 Ruff 项目位置;5 创建项目;6 Ruff 项目名称;7项目版本;8项目描述;9项目作者
        // console.log('newAppPath:',this.state.newAppPath)
        // var styleHeader = { padding: '0 4px 0 4px', color: '#5EFDFF' }
        var styleHeader = {padding: '0 4px 0 4px'}
        return (
            <div ref="tree" style={styleHeader}>
                <div style={getStyleItem(0)}>{tr(4)}</div>
                <div style={getAniStyle(1)}>
                    <div style={{width: '140px', display: 'block'}}>
                        <Input placeholer={tr(4)} value={this.state.newAppPath}
                               style={{width: '118px', display: 'inline-block', float: 'left'}} onChange={(value) => {
                            self.setState({newAppPath: value})
                        } }/>
                        <FolderSelector style={{
                            position: 'relative', left: '116px', marginLeft: '4px',
                            width: '20px', height: '20px'
                        }} padding='0 4px' iconSVGUrl="css/assets/ellipsis.svg" openFolderCallBack={(value) => {
                            this.setState({newAppPath: value})
                        } }/>
                    </div>
                </div>
                <div style={getStyleItem(2)}>{tr(6)}</div>
                <Input style={getAniStyle(3)} value={this.state.newAppName} placeholer={tr(6)} onChange={(value) => {
                    self.setState({newAppName: value})
                } }/>
                <div style={getStyleItem(4)}>{tr(7)}</div>
                <Input style={getAniStyle(5)} value={this.state.newAppVersion} placeholer={tr(7)} onChange={(value) => {
                    self.setState({newAppVersion: value})
                } }/>
                <div style={getStyleItem(6)}>{tr(8)}</div>
                <Input style={getAniStyle(7)} value={this.state.newAppDescription} placeholer={tr(8)}
                       onChange={(value) => {
                           self.setState({newAppDescription: value})
                       } }/>
                <div style={getStyleItem(8)}>{tr(9)}</div>
                <Input style={getAniStyle(9)} value={this.state.newAppAuthor} placeholer={tr(9)} onChange={(value) => {
                    self.setState({newAppAuthor: value})
                } }/>
                <div style={getAniStyle(10)}>
                    <div style={{margin: '6px 16px 0 8px '}}>
                        <button className="JUI JButton" disabled={disabled}
                                onClick={this.onCreateRuffProject.bind(this)}>{tr(5)}</button>
                    </div>
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