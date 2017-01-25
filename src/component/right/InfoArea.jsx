/**x右侧上方的信息区域*/
import React from 'react';
import {connect} from 'react-redux';
import {tr,cutCharToCenter} from '../../lib/Utils';
class InfoArea extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //初始化渲染执行之后立刻调用
    }

    componentDidUpdate(prevProps) {
        //在组件的更新已经同步到 DOM 中之后立刻被调用
    }

    render() {
        var projectPath = this.props.ruffProjectPath;
        console.log(11,projectPath)
        var strPath = projectPath ? projectPath : tr(54);//54 请先选择 Ruff 项目
        strPath = `[${cutCharToCenter(strPath,50)}]`
        var stylePath = projectPath?{}:{color:'#ffccff'}
        return (
            <div className="infoArea">
                <div className="rapVersion">Rap Version:{this.props.rapVersion}</div>
                <div className="projectPath" style={stylePath}>{strPath}</div>
                <div style={{clear:'both'}}/>
            </div>
        )
    }
}
function select(state) {
    return {
        rapVersion: state.config.rapVersion,
        ruffProjectPath: state.config.ruffProjectPath
    }
}
export default connect(select)(InfoArea);