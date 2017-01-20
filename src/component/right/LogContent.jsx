import React, {PropTypes} from 'react';
export default class LogContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 0,
            width: 0,
            timeAni: 0.5//动画的时间
        }
    }

    componentDidMount() {
        if (this.state.height == 0) {//第一次初始化完成后，得到文本的宽度和高度
            // var wid = this.refs.content.offsetWidth;
            var wid = this.refs.content.offsetWidth;
            // console.log('offsetWidth', this.refs.content.offsetWidth,this.props.content.value)
            // console.log('offsetWidth2', this.refs.content.style.paddingRight)
            // console.log('offsetWidth2', this.refs.container.offsetWidth)
            // console.log('clientWidth',this.refs.content.clientWidth)
            // console.log('scrollWidth',this.refs.content.scrollWidth)
            // console.log(11,this.refs.content.clientWidth)
            // console.log(22,this.refs.content.offsetWidth)
            this.refs.container.style.width = Math.ceil(wid)+4+'px';

            // console.log('wid:',wid)
            var timeAni = 0.1 + (wid / 564) * 0.4;
            this.setState({
                height: Math.ceil(this.refs.content.offsetHeight),
                width: Math.ceil(wid),
                timeAni: timeAni
            })

            // console.log('wid:',wid)
            // console.log(999,this.refs.content.offsetHeight)
        }
    }

    render() {
        // console.log('render')
        var styleContainer = {display: 'block', width: '100%'}
        if (this.state.width > 0) {//设置容器的宽度
            // styleContainer.width = this.state.width;
        }
        // console.log(123123,styleContainer.width)
        var style = {
            color: this.props.content.color
        }
        if (this.state.height > 0) {
            style.height = this.state.height;
            style.animation = `widthShow ${this.state.timeAni}s ease`;
            // style.animationFillMode='backwords';
        }

        return (
            <div style={styleContainer} >
                <div ref="container" >
                    <div ref="content" className="content selectable" style={style}>
                        {this.props.content.value}
                    </div>
                </div>
            </div>
        )
    }
}
LogContent.propTypes = {
    content: PropTypes.object.isRequired,//顶部的文字
}