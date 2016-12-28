import React from 'react';
import {connect} from 'react-redux';
class TestUI extends React.Component {
    constructor(props) {
        super(props);
       
    }
    render() {
        return (
            <div>
                test
            </div>
        )
    }
}

function select(state) {
    return{
        config:state.config
    }
}
export default connect(select)(TestUI);
