/**开关*/
import React, {PropTypes} from 'react';
export default class ToggleSwitch extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //初始化渲染执行之后立刻调用
    }

    componentDidUpdate(prevProps) {
        //在组件的更新已经同步到 DOM 中之后立刻被调用
    }
    onMouseOver() {
        if (this.props.onMouseOver) {
            this.props.onMouseOver(this.refs.button);
        }

    }

    onMouseOut() {
        if (this.props.onMouseOut) {
            this.props.onMouseOut(this.refs.button);
        }

    }

    render() {

        // var toggleClass = this.props.toggle?'on':'off';
        // var className = `JUI JToggleSwitch ${toggleClass}`;
        var text = this.props.toggle?this.props.valueOn:this.props.valueOff;
        var bgClass = this.props.toggle?'on':'off';
        // var bgAlpha = this.props.toggle? 0.7:0.3;
        // var style = this.props.style;
        // style.background = `rgba(76, 193, 253, ${bgAlpha})`;
        // console.log('switchClass:',className)
        return (
            <div ref="button" className='JUI JToggleSwitch' style={this.props.style}
                 onClick={this.props.onClick.bind(this)}
                 onMouseOver={this.onMouseOver.bind(this)}
                 onMouseOut={this.onMouseOut.bind(this)}
            >
                <div className={bgClass} style={{padding:this.props.padding}}>
                    {text}
                </div>

            </div>
        )
    }
}
// <div style={{position:'relative'}}>
//
// </div>
// <div style={{position:'relative'}}>
// {this.props.value}
// </div>
// <div className="clear"/>
// {getIcon()}
ToggleSwitch.propTypes = {
    className: PropTypes.string,//样式的名字
    style: PropTypes.object,//样式
    toggle:PropTypes.bool,
    padding:PropTypes.string,
    valueOn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),//开启状态要显示的值
    valueOff: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),//关闭状态要显示的值
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,

}