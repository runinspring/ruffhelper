import React from 'react';
import {connect} from 'react-redux';
import SDKSelecter from './alerts/SDKSelecter.jsx'
import Selecter from './alerts/Selecter.jsx'
import cfg from '../config';
const PanelSDKSelector = 'panelsdkselector';
exports.PanelSDKSelector = PanelSDKSelector;
class Alerts extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var self = this;
        console.log('alerts:',this.props.alerts.panels);
        // console.log('SDKSelecter.SDKSelector',PanelSDKSelector)
        var getAlerts = this.props.alerts.panels.map(function (item,index) {
            switch (item.type){
                case PanelSDKSelector:
                    return <SDKSelecter key={'panel'+item.index} index={item.index}/>
            }
        })
        if(this.props.alerts.panels.length<1){
            return <div/>
        }else{
            return(
                <div onClick={()=>{console.log(self.props.alerts.panels)}} >
                    <div className="layoutAusolute stage" style={{background:"#000",opacity:0.5}}/>
                    <div className="layoutAusolute stage" style={{textAlign:'center'}}>
                        {getAlerts}
                    </div>
                </div>
            )
        }
    }
}
function select(state) {
    return {
        alerts:state.alerts
    }
}
export default connect(select)(Alerts);