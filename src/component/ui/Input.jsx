import React, {PropTypes} from 'react';
export default class Input extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     value:''
        // }
        // this.state.value = this.props.defaultValue || '';
    }
    componentDidMount(){
        //初始化渲染执行之后立刻调用
    }
    componentDidUpdate(prevProps){
        //在组件的更新已经同步到 DOM 中之后立刻被调用
       this.setRight();
    }
    /**把光标移动到最右边*/
    setRight(){
        setTimeout(()=>{
            var input = this.refs.input;
            input.scrollLeft = input.scrollWidth;
            // console.log('setRight')
            // console.log('scrollLeft:',input.scrollLeft)
        },1)

    }
    onChange(e){
        var value = e.target.value;
        // this.setState({value:value});
        if(this.props.onChange){
            this.props.onChange(value)
        }

        // style.width = this.props.width
        // console.log(12312,this.props.onChange)
    }
    render() {
        var style={}
        if(this.props.style){
            style = this.props.style;
        }
        // console.log('input.value:',this.props.value)
        return(
            <input ref="input" className="JUI JInput" style={style} onChange={this.onChange.bind(this)} value={this.props.value}
                   placeholder={this.props.placeholer} onBlur={this.setRight.bind(this)}

            />
        )
    }
}
Input.propTypes = {
    value:PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,//要显示的值
    placeholer:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),//默认值
    onChange:PropTypes.func,//input 内容改变的回调方法
    style:PropTypes.object,
}