import React from 'react';
import {connect} from 'react-redux';
class LogsArea extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        /**标签页右侧的扩展按钮 */
        // this.props.extraContent = function () {
        //     return (
        //         <div>
        //             <Button><Icon type="folder-open"/></Button>
        //         </div>
        //     )
        // }
    }
    render() {
        return (
            <div>
            Logs
            </div>
        )
    }
}
function select(state) {
    return{
        logContent:state.logContent
    }
}
export default connect(select)(LogsArea);