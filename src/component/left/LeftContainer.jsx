/**左侧每个栏目的容器*/
import React, {PropTypes} from 'react';
class LeftContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            children: this.props.children,
            showChildren: false
        }
    }
    /**显示子元素的逻辑 */
    showChildren() {
        return this.state.showChildren ? this.state.children : <div/>
    }
    /**点击header显示子对象*/
    addChildren() {
        if (!this.state.showChildren) {
            this.setState({showChildren:true})
        }
        // var type = !this.state.open;
        // this.setState({ open: type })
        // this.state.children.test();
    }
    /**移除子对象 */
    removeChildren() {
        this.setState({showChildren:false})
    }
    render() {
        return (
            <div className="container">
                <div className="header mousePointer" onClick={this.addChildren.bind(this)}>{this.props.header}</div>
                <div>
                    {this.showChildren() }
                </div>
            </div>
        )
    }
}
export default LeftContainer;
LeftContainer.propTypes = {
    header: PropTypes.string.isRequired//顶部的文字
}