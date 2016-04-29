import React from 'react';
import {connect} from 'react-redux';
import SDKSelecter from './alerts/SDKSelecter.jsx';
import InputPanel from './alerts/InputPanel.jsx';
import Selecter from './alerts/Selecter.jsx';
import {showAlert} from '../actions/AppActions.jsx';
import cfg from '../config';
const PanelSDKSelector = 'panelsdkselector';
exports.PanelSDKSelector = PanelSDKSelector;
const PanelInput = 'panelinput';
exports.PanelInput = PanelInput;
const PanelSelecter = 'panelselector';
exports.PanelSelecter = PanelSelecter;
class Alerts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var self = this;
        console.log('alerts:', this.props.alerts.panels);
        // console.log('SDKSelecter.SDKSelector',PanelSDKSelector)
        var getAlerts = this.props.alerts.panels.map(function (item, index) {
            switch (item.type) {
                case PanelSDKSelector:
                    return <SDKSelecter key={'panel'+item.index} index={item.index}/>;
                case PanelInput:
                    return <InputPanel key={'panel'+item.index} index={item.index} item={item}/>;
                case PanelSelecter:
                    return <Selecter key={'panel'+item.index} index={item.index} item={item}/>;
                default :
                    return <div key='panel9999'/>
            }
        })
        //<div style={{position:'absolute',width:"100%"}}>2222</div>
        //    <button className="layoutAusolute btnBlue" onClick={()=>{console.log(123123);showAlert(PanelInput)}}>sdafsd</button>
        if (this.props.alerts.panels.length < 1) {
            return <div/>
        } else {
            return (
                <div className="layoutAusolute">
                    <div className="layoutAusolute stage" style={{background:"#000",opacity:0.5}}/>
                    <div className="stage" style={{textAlign:'center'}}>
                        {getAlerts}
                    </div>
                </div>
            )
        }
    }
}
//

function select(state) {
    return {
        alerts: state.alerts
    }
}
export default connect(select)(Alerts);