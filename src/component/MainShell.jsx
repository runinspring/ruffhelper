import React from 'react';
import { connect } from 'react-redux';
import LeftArea from './LeftArea.jsx';
import Alerts from './Alerts.jsx';
import RightArea from './RightArea.jsx';
import Test from './TestUI.jsx'
class MainShell extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Test className='absolute'/>
                <RightArea className='absolute'/>
            </div>
        )
    }
    render2() {
        return (
            <div>
                <iframe className="absolute" style={{ marginLeft: '80px', border: '0px', width: '100%', height: '100%', opacity: '0.5' }} src="./pages/background/index.html"></iframe>
                {/*<div className="absolute" style={{width:'100%',height:'100%', backgroundColor:'rgba(0, 0, 0, 0.5)'}}/>*/}
                <RightArea />
                <LeftArea />
                <Alerts />
            </div>
        )
    }
}
function select(state) {
    return {
        config: state.config
    }
}
export default connect(select)(MainShell);
