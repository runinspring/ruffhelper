/**打开本地的rap项目*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {LEFT_CHANGE_CLUMTYPE,command} from '../../actions/AppActions';
class C2_OpenProject extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        //初始化渲染执行之后立刻调用
    }
    componentDidUpdate(prevProps){
        //在组件的更新已经同步到 DOM 中之后立刻被调用
    }
    /**关闭组件*/
    closeEnd() {
        command(LEFT_CHANGE_CLUMTYPE,{key:this.props.clumId,value:false});
    }
    render() {
        return(
            <div className="mousePointer" onClick={this.closeEnd.bind(this)}>
                C2_OpenProject

            </div>
        )
    }
}
function select(state) {
    return {
        osType: state.config.osType
    }
}
export default connect(select)(C2_OpenProject);
C2_OpenProject.propTypes = {
    clumId:PropTypes.number.isRequired//栏目的id
}