/**模板文件*/
import React from 'react';
import {Icon, Button} from 'antd';
import {connect} from 'react-redux';
import {tr} from '../../lib/Utils'
class QrCode extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        //初始化渲染执行之后立刻调用
    }
    componentDidUpdate(prevProps){
        //在组件的更新已经同步到 DOM 中之后立刻被调用
    }
    showInfo(){

    }
    hideInfo(){

    }
    render() {
        var trid = 11;
        return (
            <div style={{display:'inline-block',marginRight:'2px'}}>
                <div id={"tip"+trid} className="info-hide" style={{lineHeight:"20px"}}>
                    <div className="arrowUp" style={{right:'16px',top: '-8px'}}/>
                    <div id={"tipContent"+trid} style={{display:'block',whiteSpace:'nowrap'}}>{tr(trid)}</div>
                </div>
                <Button onMouseOver={this.showInfo.bind(this)} onMouseOut={this.hideInfo.bind(this)}>
                    <Icon style={{pointerEvents:"none"}} type='qrcode'/>
                </Button>
            </div>
        )
    }
}
function select(state) {
    return {
        osType: state.config.osType
    }
}
export default connect(select)(QrCode);