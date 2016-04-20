import React from 'react';
import {connect} from 'react-redux';
import SDKSelect from './alerts/SDKSelect.jsx'
class Alerts extends React.Component {
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
        if (!this.props.ruffSDKLocation) {
            if(!this.state.showAlert)this.setState({showAlert:true});
            if(!this.state.sdkSelect)this.setState({sdkSelect:true});
        }else if(this.props.ruffSDKLocation){
            if(this.state.showAlert)this.setState({showAlert:false});
            if(this.state.sdkSelect)this.setState({sdkSelect:false});
        }
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
            }
        }
        if(this.state.showAlert){
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
        ruffSDKLocation: state.config.ruffSDKLocation
    }
}
export default connect(select)(Alerts);