/**模板文件*/
import React, {Component, PropTypes} from 'react';
import {Icon, Button} from 'antd';
import {connect} from 'react-redux';
import {tr} from '../../lib/Utils';
import QRCode from 'qrcode.react';
class ExtraQrCode extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired
    }
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        //初始化渲染执行之后立刻调用
    }
    componentDidUpdate(prevProps) {
        //在组件的更新已经同步到 DOM 中之后立刻被调用
    }
    showInfo(e) {
        // console.log('showInfo');
        var tip = document.getElementById('tipQrcode');
        tip.className = 'info-show';
        var rect = e.target.getBoundingClientRect();
        tip.style.top = rect.bottom + 10 + 'px';
        tip.style.left = rect.left - tip.getBoundingClientRect().width + 44 + 'px';

    }
    hideInfo() {
        // console.log('hideInfo');
        var tip = document.getElementById('tipQrcode');
        if (tip) {
            tip.className = 'info-hide';
        }
    }
    //  bgColor="#2db7f5"
    render() {
        // tr 18 扫码后在手机上查看日志信息
        return (
            <div style={{ display: 'inline-block', marginRight: '2px' }}>
                <div id={"tipQrcode"} className="info-hide">
                    <div className="arrowUp" style={{ right: '16px', top: '-8px' }}/>
                    <div style={{paddingTop:'2px'}}>
                        <div style={{ padding: '4px 4px 0px 4px', background: '#ffffff' }}>
                            <QRCode value={this.props.url} fgColor="#2db7f5"/>
                        </div>
                    </div>
                    <div id={"tipContentQrcode"} style={{ wordWrap: "break-word", marginTop: "4px", textAlign: "center", width: "128px", lineHeight: "110%" }}>{tr(18) }</div>
                </div>
                <Button onMouseOver={this.showInfo.bind(this) } onMouseOut={this.hideInfo.bind(this) }>
                    <Icon style={{ pointerEvents: "none" }} type='qrcode'/>
                </Button>
            </div>
        )
    }
}
// <div id={"tipContentQrcode"} style={{display:'block',whiteSpace:'nowrap',wordWrap:"break-word",wordBreak:"break-all",marginTop:"-4px",width:"50px"}}>{'Check the rap log on you cellphone after scan the qrcode'}</div>
function select(state) {
    return {
        osType: state.config.osType
    }
}
export default connect(select)(ExtraQrCode);