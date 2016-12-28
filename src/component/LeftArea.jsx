import React from 'react';
import {connect} from 'react-redux';
class LeftArea extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
       
        return(
            <div className="absolute left">
                left
            </div>
        )
    }
}
function select(state) {
    return{
        config:state.config
    }
}
export default connect(select)(LeftArea);
