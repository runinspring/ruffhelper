import React from 'react';
import {connect} from 'react-redux';
import LeftArea from './LeftArea.jsx';

import Alerts from './Alerts.jsx';
import RightArea from './RightArea.jsx';
class MainShell extends React.Component {
    constructor(props){
        super(props)
    }
    render(){

          /*return(
              <div>
                  <div>3123123123</div>
                  <Alerts/>
              </div>
          )*/
        return(
            <div>
                <RightArea/>
                <LeftArea/>
                <Alerts/>
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
