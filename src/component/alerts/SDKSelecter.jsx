import React from 'react';
import {connect} from 'react-redux';
import {tr} from '../../lib/Utils';
import LocationSelector from './../left/cp/LocationSelector.jsx';
import {existRapSDK} from '../../lib/Files';
import {setRuffSDKLocation,closeAlert} from '../../actions/AppActions.jsx';
var fs = require('fs');
class SDKSelecter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // sdkExist: true,
            ruffSDKLocation: '',
            info: ''
        }
    }


    getSDKPath(value) {
        if (value == this.state.ruffSDKLocation) {
            return;
        }
        this.setState({ruffSDKLocation: value})
        // console.log(1231,value)
        var sdkPath = existRapSDK(value, this.props.osType);
        // console.log('path:',path)
        if (sdkPath == null) {//211 不是有效的 Ruff SDK
            this.setState({info: tr(211)})
        } else {
            // this.setState({sdkExist: true})
            setRuffSDKLocation(sdkPath);
            closeAlert(this.props.index);
        }
    }

    render() {
        var self = this;
        // console.log('this.state.sdkExist:',this.state.sdkExist)
        // if (this.state.sdkExist) {
        //     return (<div/>)
        // }
        //tr 55 请选择 Ruff SDK 的路径
        return (
            <div className="alertItem sdkSelector">
                    <div>
                        <div >{tr(55)}</div>
                        <LocationSelector inputValue={this.state.ruffSDKLocation} placeholder={tr(10)}
                                          onChangeValue={(value)=>{self.getSDKPath(value)}}/>
                        <div>{this.state.info}</div>
                    </div>
            </div>
        )
    }
}

//style={{animation:'loadIn 3s'}}
function select(state) {
    return {
        ruffSDKLocation: state.config.ruffSDKLocation,
        osType: state.config.osType
    }
}
SDKSelecter.propTypes = {
    index: React.PropTypes.number.isRequired
}
export default connect(select)(SDKSelecter);