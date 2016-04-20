import React from 'react';
import {connect} from 'react-redux';
import SDKSelect from './alerts/SDKSelect.jsx'
class Alerts extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){

    }
    componentDidUpdate(next){

    }
    render() {
        return(
            <div className="layoutAusolute stage" style={{textAlign:'center'}}>
                <div className="layoutAusolute stages" style={{background:"#000",opacity:0.5}}/>
                <SDKSelect/>
            </div>
        )
    }
}
function select(state) {
    return {
        osType: state.config.osType
    }
}
export default connect(select)(Alerts);