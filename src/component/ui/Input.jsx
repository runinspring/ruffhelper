/**模板文件*/
import React, {PropTypes} from 'react';
export default class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value:''
        }
        this.state.value = this.props.defaultValue || '';
    }
    componentDidMount(){
        //初始化渲染执行之后立刻调用
    }
    componentDidUpdate(prevProps){
        //在组件的更新已经同步到 DOM 中之后立刻被调用
    }
    onChange(e){
        var value = e.target.value;
        this.setState({value:value});
        if(this.props.onChange){
            this.props.onChange(value)
        }
        // console.log(12312,this.props.onChange)
    }
    render() {
        return(
            <input className="JInput" onChange={this.onChange.bind(this)} value={this.state.value}
                   placeholder={this.props.placeholer}
            />
        )
    }
}
function select(state) {
    return {
        osType: state.config.osType
    }
}
Input.propTypes = {
    defaultValue:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),//要显示的值
    placeholer:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),//默认值
    onChange:PropTypes.func,//input 内容改变的回调方法
}