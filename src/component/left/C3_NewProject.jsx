/**新建一个rap项目*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {LEFT_CHANGE_CLUMTYPE,command} from '../../actions/AppActions';
import {tr, cutCharByLength} from '../../lib/Utils';
import Input from '../ui/Input';
class C3_NewProject extends React.Component {
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
    componentDidMount(){
        //初始化渲染执行之后立刻调用
    }
    componentDidUpdate(prevProps) {
        // console.log(123123)
        //在组件的更新已经同步到 DOM 中之后立刻被调用
    }
    /**关闭组件*/
    // closeEnd() {
    //     command(LEFT_CHANGE_CLUMTYPE, {key: this.props.clumId, value: 0});
    // }

    render() {
        var type = this.props.type;
        if (type == 0) {
            return <div/>
        }
        console.log(this.state)
        var self = this;
        var styleItem = {marginLeft:'5px'}
        //tr:4 Ruff 项目位置;6 Ruff 项目名称;7项目版本;8项目描述;9项目作者
        return(
            <div style={{padding:'0 4px 0 4px',color:'#5EFDFF'}}>
                <div style={styleItem}>{tr(4)}</div>
                <Input placeholer={tr(4)} onChange={(value)=>{self.setState({newAppPath:value})}}/>
                <div style={styleItem}>{tr(6)}</div>
                <Input placeholer={tr(6)}/>
                <div style={styleItem}>{tr(7)}</div>
                <Input placeholer={tr(7)} defaultValue={this.state.newAppVersion}/>
                <div style={styleItem}>{tr(8)}</div>
                <Input placeholer={tr(8)}/>
                <div style={styleItem}>{tr(9)}</div>
                <Input placeholer={tr(9)}/>
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
    clumId:PropTypes.number.isRequired//栏目的id
}