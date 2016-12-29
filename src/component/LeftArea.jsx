import React from 'react';
import {connect} from 'react-redux';
import RapCommand from './left/C1_RapCommand';
import OpenProject from './left/C2_OpenProject';
import NewProject from './left/C3_NewProject';
import LeftContainer from './left/LeftContainer';
import {tr} from '../lib/Utils'
class LeftArea extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
       
        return(
            <div className="absolute left">
                <LeftContainer header={tr(0)}>
                    <RapCommand/>
                </LeftContainer>
                <LeftContainer header={tr(1)}>
                    <OpenProject/>
                </LeftContainer>
                <LeftContainer header={tr(2)}>
                    <NewProject/>
                </LeftContainer>
                
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
