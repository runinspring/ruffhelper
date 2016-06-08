import React,{Component, PropTypes} from 'react';
import {Icon,Button } from 'antd';
export default class ExtraButton extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        //初始化渲染执行之后立刻调用
        console.log(232)
    }
    render() {
        return(
            <div>
                <Button><Icon type={this.props.iconName}/></Button>
            </div>
        )
    }
}
ExtraButton.propTypes = {
    iconName: PropTypes.string.isRequired
}