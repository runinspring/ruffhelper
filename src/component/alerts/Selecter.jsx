/**选择器*/
import React from 'react';
import {connect} from 'react-redux';
class Selecter extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){

    }
    componentDidUpdate(next){

    }
    render() {
        return(
            <div>
                Selecter
            </div>
        )
    }
}
function select(state) {
    return {
        osType: state.config.osType
    }
}
export default connect(select)(Selecter);