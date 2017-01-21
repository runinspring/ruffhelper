/**左侧每个栏目的容器*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {LEFT_CHANGE_CLUMTYPE, command} from '../../actions/AppActions'
// import {command}
class LeftContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            children: this.props.children
        }
    }
    /**显示子元素的逻辑 */
    // showChildren() {
    //     // console.log('clum:'+this.props.clumId,this.props.left)
    //     //0关闭 1打开 2关闭中
    //     var typeId = this.props.left['clum' + this.props.clumId];
    //     if (typeId == 0) {
    //         return <div/>
    //     } else {
    //         return this.state.children;
    //     }
    //
    // }
    /**点击header显示子对象*/
    clickHeader() {

        var clumId = this.props.clumId;
        //typeId 0关闭 1打开 2关闭中
        var typeId = this.props.left['clum' + clumId];
        // console.log('clumID:',clumId,"typeId:",typeId)
        if (typeId == 0) {//关闭的时候打开
            command(LEFT_CHANGE_CLUMTYPE, { key: clumId, value: 1 });
        } else if (typeId == 1) {//rap command会有一个延时效果，不再这里关闭
            command(LEFT_CHANGE_CLUMTYPE, { key: clumId, value: 2 });
        }else {//打开的时候进入关闭中状态
            command(LEFT_CHANGE_CLUMTYPE, { key: clumId, value: 0 });
        }

    }
    render() {
        return (
            <div className="container">
                <div className="header mousePointer" onClick={this.clickHeader.bind(this) }>{this.props.header}</div>
                <div>
                    {this.state.children }
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
    clumId: PropTypes.number.isRequired//栏目的id
    // show: PropTypes.bool.isRequired,//是否显示
    // changeType:PropTypes.func.isRequired,//改变状态的回调

}