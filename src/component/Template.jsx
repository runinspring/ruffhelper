/**模板文件*/
import React from 'react';
import {connect} from 'react-redux';
class Template extends React.Component {
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

            </div>
        )
    }
}
function select(state) {
    return {
        osType: state.config.osType
    }
}
export default connect(select)(Template);