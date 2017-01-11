import React, {PropTypes} from 'react';
export default class LogContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 0,
            width:0,
            timeAni:0.5//动画的时间
        }
    }
    componentDidMount() {
        if (this.state.height==0) {//第一次初始化完成后，得到文本的宽度和高度
            var wid = this.refs.content.offsetWidth;
            // console.log('wid:',wid)
            var timeAni = 0.1+(wid/564)*0.4;
            this.setState({
                height:Math.ceil(this.refs.content.offsetHeight),
                width:Math.ceil(this.refs.content.offsetWidth)+4,
                timeAni:timeAni
            })
            // console.log('wid:',wid)
            // console.log(999,this.refs.content.offsetHeight)
        }
    }

    render() {
        // console.log('render')
        var styleContainer ={display:'block',width:'100%'}
        if(this.state.width>0){//设置容器的宽度
            styleContainer.width = this.state.width;
        }
        // console.log(123123,styleContainer.width)
        var style = {
            color: this.props.content.color
        }
        if(this.state.height>0){
            style.height = this.state.height;
            style.animation = `widthShow ${this.state.timeAni}s ease`;
        }

        return (
            <div style={styleContainer}>
                <div ref="content" className="content selectable" style={style}>
                    {this.props.content.value}
                </div>
            </div>
        )
    }
}
LogContent.propTypes = {
    content: PropTypes.object.isRequired,//顶部的文字
}