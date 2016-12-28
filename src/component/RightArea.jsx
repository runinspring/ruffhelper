import React from 'react';
import {connect} from 'react-redux';
class RightArea extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        // console.log('rightArea')
        // console.log('this.state.tabKey',this.state.tabKey)
        return (
            <div className="absolute right">
                right
            </div>
        )
    }
}
function select(state) {
    return {
        config: state.config
    }
}
export default connect(select)(RightArea);
