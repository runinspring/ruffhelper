import React from 'react';
import {connect} from 'react-redux';
import SaveLog from './alerts/SaveLog';

/**保存log日志*/
export const PanelSaveLog = 'PanelSaveLog';
class Alerts extends React.Component {
    constructor(props) {
        super(props);
        // console.log(1222,PanelSaveLog)
    }

    render() {
        // console.log('alert:', this.props.alerts)
        if (this.props.alerts.panels.length < 1) {
            return <div/>
        }
        var getPanels = this.props.alerts.panels.map(function (item, index) {
            switch (item.type) {
                case PanelSaveLog:
                    return <SaveLog key={'alert' + item.index} index={index}/>
                default:
                    return <div key={'alert' + item.index}>empty</div>
            }
        })
        return (
            <div>
                <div className="absolute stage" style={{background:'darkgray',opacity:0.5}}/>
                <div className="absolute alert stage">
                    {getPanels}
                </div>
            </div>
        )
    }
}
//

function select(state) {
    return {
        alerts: state.alerts
    }
}
export default connect(select)(Alerts);