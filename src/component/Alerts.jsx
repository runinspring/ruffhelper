import React from 'react';
import {connect} from 'react-redux';
class Alerts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="absolute alert">
                
            </div>
        )
        //<div style={{position:'absolute',width:"100%"}}>2222</div>
        //    <button className="layoutAusolute btnBlue" onClick={()=>{console.log(123123);showAlert(PanelInput)}}>sdafsd</button>
        // if (this.props.alerts.panels.length < 1) {
        //     return <div/>
        // } else {
        //     return (
        //         <div>
        //           alerts 
        //         </div>
        //     )
        // }
    }
}
//

function select(state) {
    return {
        alerts: state.alerts
    }
}
export default connect(select)(Alerts);