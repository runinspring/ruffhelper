/**左侧每个栏目的容器*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {LEFT_CHANGE_CLUMTYPE,command} from '../../actions/AppActions'
// import {command}
class LeftContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            children: this.props.children
        }
    }
    /**显示子元素的逻辑 */
    showChildren() {
        // console.log('clum:'+this.props.clumId,this.props.left)
        var type = this.props.left['clum'+this.props.clumId];
        return type ? this.state.children : <div/>
    }
    /**点击header显示子对象*/
    clickHeader() {
        command(LEFT_CHANGE_CLUMTYPE,{key:this.props.clumId,value:true});
    }
    render() {
        return (
            <div className="container">
                <div className="header mousePointer" onClick={this.clickHeader.bind(this)}>{this.props.header}</div>
                <div>
                    {this.showChildren() }
                </div>
            </div>
        )
    }
}
function select(state) {
    return {
        left: state.left
    }
}
export default connect(select)(LeftContainer);
LeftContainer.propTypes = {
    header: PropTypes.string.isRequired,//顶部的文字
    clumId:PropTypes.number.isRequired//栏目的id
    // show: PropTypes.bool.isRequired,//是否显示
    // changeType:PropTypes.func.isRequired,//改变状态的回调

}