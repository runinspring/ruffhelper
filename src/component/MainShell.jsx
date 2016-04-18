import React from 'react';
import {connect} from 'react-redux';
import LeftArea from './LeftArea.jsx';
import CommandArea from './right/CommandArea.jsx';
import LogArea from './right/LogArea.jsx';
import SDKSelect from './SDKSelect.jsx'
class MainShell extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <div className="rightArea">
                    <CommandArea/>
                    <LogArea/>
                </div>
                <LeftArea/>
                <SDKSelect/>
            </div>
        )
    }
}
function select(state) {
    return{
        config:state.config
    }
}
export default connect(select)(MainShell);
