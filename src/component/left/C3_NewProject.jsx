/**新建一个rap项目*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {LEFT_CHANGE_CLUMTYPE, command} from '../../actions/AppActions';
import {tr, cutCharByLength} from '../../lib/Utils';
import Input from '../ui/Input';
import FolderSelector from '../ui/FolderSelector';
class C3_NewProject extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newAppPath: '',
            newAppName: '',
            newAppVersion: '0.1.0',
            newAppDescription: '',
            newAppAuthor: '',

        }
    }

    render() {
        var type = this.props.type;
        if (type == 0) {
            return <div/>
        }
        // console.log(this.state)
        var self = this;
        var styleItem = {marginLeft: '5px', display: 'block'}
        var disabled = this.state.newAppPath ? false : true;
        //tr:4 Ruff 项目位置;5 创建项目;6 Ruff 项目名称;7项目版本;8项目描述;9项目作者
        // console.log('newAppPath:',this.state.newAppPath)
        return (
            <div style={{padding: '0 4px 0 4px', color: '#5EFDFF'}}>
                <div style={styleItem}>{tr(4)}</div>
                <div style={{width:'140px',display:'block'}}>
                    <Input placeholer={tr(4)} value={this.state.newAppPath} style={{width:'118px',display: 'inline-block',float:'left'}} onChange={(value)=> {
                        self.setState({newAppPath: value})
                    }}/>
                    <FolderSelector style={{
                        position:'relative',left:'116px', marginLeft:'4px',
                        width: '20px',height:'20px'
                    }} padding='0 4px' iconSVGUrl="css/assets/ellipsis.svg" openFolderCallBack={(value)=>{this.setState({newAppPath:value})}}/>
                </div>
                <div style={styleItem}>{tr(6)}</div>
                <Input value={this.state.newAppName} placeholer={tr(6)} onChange={(value)=> {
                    self.setState({newAppName: value})
                }}/>
                <div style={styleItem}>{tr(7)}</div>
                <Input value={this.state.newAppVersion} placeholer={tr(7)}  onChange={(value)=> {
                    self.setState({newAppVersion: value})
                }}/>
                <div style={styleItem}>{tr(8)}</div>
                <Input value={this.state.newAppDescription} placeholer={tr(8)} onChange={(value)=> {
                    self.setState({newAppDescription: value})
                }}/>
                <div style={styleItem}>{tr(9)}</div>
                <Input value={this.state.newAppAuthor} placeholer={tr(9)} onChange={(value)=> {
                    self.setState({newAppAuthor: value})
                }}/>
                <div style={{margin: '6px 16px 0 8px '}}>
                    <button className="JUI JButton" disabled={disabled}>{tr(5)}</button>
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