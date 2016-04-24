import React from 'react';
import {connect} from 'react-redux';
import SDKSelect from './alerts/SDKSelect.jsx'
import Selecter from './alerts/Selecter.jsx'
import cfg from '../config';
class Alerts2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert:false,//是否显示弹窗
            sdkSelect:false,//是否显示sdk选择器
        }
    }

    componentDidMount() {
        this.getState();
    }

    componentDidUpdate() {
        this.getState();
    }
    getState(){
        // console.log("getSDKState",this.props.ruffSDKLocation,this.state.sdkSelect)
        //if(!cfg.isPublic){
        //    if(!this.state.showAlert)this.setState({showAlert:true});
        //}else
        var showAlert,sdkSelect;
        if (!this.props.ruffSDKLocation) {
            showAlert = sdkSelect = true;
        }else if(this.props.ruffSDKLocation){
            showAlert = sdkSelect = false;
        }
        if(!cfg.isPublic) showAlert = true;

        if(this.state.showAlert!= showAlert)this.setState({showAlert:showAlert});
        if(this.state.sdkSelect!= sdkSelect)this.setState({sdkSelect:sdkSelect});
    }

    render() {
        var self = this;
        // return(
        //     <div/>
        // )

        // console.log('ddsdfs',this.state)
        
        var getAlertPanel = function () {
            if(self.state.sdkSelect){
                return <SDKSelect/>
            }else{
                return <Selecter/>
            }
        }
        if(this.state.showAlert){
            console.log('showAlert')
            return (
                <div>
                    <div className="layoutAusolute stage" style={{background:"#000",opacity:0.5}}/>
                    <div className="layoutAusolute stage" style={{textAlign:'center'}}>
                        {getAlertPanel()}
                    </div>
                </div>
            )
        }else{
            return(<div/>)
        }
        // return (
        //     <div>
        //         <div className="layoutAusolute stage" style={{background:"#000",opacity:0.5}}/>
        //         <div className="layoutAusolute stage" style={{textAlign:'center'}}>
        //             <SDKSelect/>
        //         </div>
        //     </div>
        // )
        // return (
        //     <div className="layoutAusolute stage" style={{textAlign:'center'}}>
        //         <div className="layoutAusolute stages" style={{background:"#000",opacity:0.5}}/>
        //         <SDKSelect/>
        //     </div>
        // )
    }
}
function select(state) {
    return {
        ruffSDKLocation: state.config.ruffSDKLocation,
        alerts:state.alerts
    }
}
export default connect(select)(Alerts2);