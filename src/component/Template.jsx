/**模板文件*/
import React from 'react';
import {connect} from 'react-redux';
class Template extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        //初始化渲染执行之后立刻调用
    }
    componentDidUpdate(prevProps){
        //在组件的更新已经同步到 DOM 中之后立刻被调用
    }
    render() {
        return(
            <div>

            </div>
        )
    }
}
function select(state) {
    return {
        osType: state.config.osType
    }
}
export default connect(select)(Template);