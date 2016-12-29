/**打开本地的rap项目*/
import React from 'react';
import {connect} from 'react-redux';
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
    render() {
        return(
            <div>
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