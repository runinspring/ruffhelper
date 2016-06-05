import React from 'react';
import {connect} from 'react-redux';
import {Icon,Button } from 'antd';
class CommandsArea extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
            // console.log(7686876)
        /**标签页右侧的扩展按钮 */
        this.props.extraContent('extra1',<div>
                    <Button><Icon type="caret-circle-o-right"/></Button>
                    <Button><Icon type="cross-circle-o"/></Button>
                    <Button><Icon type="delete"/></Button>
                    <Button><Icon type="save"/></Button>
                </div>)
    }
    /**标签页右侧的扩展按钮 */
    extraContent() {
        return (
            <div>
                <Button><Icon type="caret-circle-o-right"/></Button>
                <Button><Icon type="cross-circle-o"/></Button>
                <Button><Icon type="delete"/></Button>
                <Button><Icon type="save"/></Button>
            </div>
        )
    }
    render() {
        return (
            <div >
            commands
            </div>
        )
    }
}
function select(state) {
    return{
        ruffSDKLocation:state.config.ruffSDKLocation,
        version:state.config.rapVersion,
        projectPath:state.config.projectPath,
        config:state.config,
        output:state.outputContent
    }
}
export default connect(select)(CommandsArea);