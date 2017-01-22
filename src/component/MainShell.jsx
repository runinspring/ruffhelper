import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import LeftArea from './LeftArea.jsx';
import Alerts from './Alerts.jsx';
import RightArea from './RightArea.jsx';
import Test from './TestUI.jsx'

class MainShell extends React.Component {
    constructor(props) {
        super(props)
    }

    // render() {
    //     return (
    //         <div>
    //             <Test className='absolute'/>
    //             <RightArea className='absolute'/>
    //         </div>
    //     )
    // }
    render() {
        if (!this.props.loadEnd) {
            return <div/>
        } else {
            return (
                <div >
                    <iframe className="absolute" style={{
                        marginLeft: '80px',
                        border: '0px',
                        width: '100%',
                        height: '100%',
                        animation: `alphaShow  3s ease`
                    }} src="./pages/background/index.html"></iframe>
                    {/*<div className="absolute" style={{width:'100%',height:'100%', backgroundColor:'rgba(0, 0, 0, 0.5)'}}/>*/}
                    <RightArea />
                    <LeftArea />
                    <Alerts />
                </div>
            )
        }
    }
}
function select(state) {
    return {
        config: state.config
    }
}
MainShell.propTypes = {
    loadEnd: PropTypes.bool.isRequired,//是否加载结束了
}
export default connect(select)(MainShell);
