import React,{Component, PropTypes} from 'react';
import {Icon,Button } from 'antd';
import {tr} from '../../lib/Utils'
export default class ExtraButton extends Component {
    constructor(props) {
        super(props)
        this.idxInterval = 0;
    }
    componentDidMount(){
        //初始化渲染执行之后立刻调用
        // console.log(232)
    }
    showInfo(e){
        clearInterval(this.idxInterval)
        var trid = this.props.tr;
        var tip = document.getElementById('tip'+trid);
        tip.className = 'info-show';
        // tip.style.left = '160px';
        var rect = e.target.getBoundingClientRect();
        // console.log('rect',rect);
        // var top = rect.top+'px';
        // var left = rect.left+'px';
        // console.log('top:', e.target.getBoundingClientRect().top)
        tip.style.top = rect.bottom+'px';
        tip.style.left = rect.left-tip.offsetWidth+rect.width+'px';
        console.log('left:',rect.left,tip.offsetWidth)
        // console.log(12312,tip.offsetWidth,tip)
        // var id = e.target.id;
        // console.log('showInfo',id,this.arrInfos[id],tr(this.arrInfos[id]))
        // document.getElementById('tipContent'+this.props.tr).innerHTML = tr(trid);
    }
    hideInfo() {
        this.idxInterval = setInterval(()=> {
            var tip = document.getElementById('tip'+this.props.tr);
            if (tip) {
                tip.className = 'info-hide';
            }
        }, 100);
    }
    render() {
        var trid = this.props.tr;
        return(
            <div>
                <div id={"tip"+trid} className="info-hide">
                    <div className="arrow"/>
                    <div id={"tipContent"+trid} style={{display:'block',whiteSpace:'nowrap'}}>{tr(trid)}</div>
                </div>
                <Button onMouseOver={this.showInfo.bind(this)} onMouseOut={this.hideInfo.bind(this)} onClick={this.props.onClick}><Icon style={{pointerEvents:"none"}} type={this.props.iconName}/></Button>
            </div>
        )
    }
}
ExtraButton.propTypes = {
    iconName:PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    tr: PropTypes.number.isRequired
}