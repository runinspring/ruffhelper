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
        // this.state={
        //     clum1:false,//每个栏目是否展开
        //     clum2:false,
        //     clum3:false
        // }
    }
    render(){
        // console.log('LeftArea.render')
        return(
            <div className="absolute left">
                <LeftContainer header={tr(0)} clumId={0}>
                    <RapCommand clumId={0}/>
                </LeftContainer>
                <LeftContainer header={tr(1)} clumId={1}>
                    <OpenProject clumId={1}/>
                </LeftContainer>
                <LeftContainer header={tr(2)} clumId={2}>
                    <NewProject clumId={2}/>
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
