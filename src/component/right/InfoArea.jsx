/**x右侧上方的信息区域*/
import React from 'react';
import {connect} from 'react-redux';
class InfoArea extends React.Component {
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
            <div className="infoArea">
                <div>Rap Version:{this.props.rapVersion}</div>
            </div>
        )
    }
}
function select(state) {
    return {
        rapVersion: state.config.rapVersion
    }
}
export default connect(select)(InfoArea);