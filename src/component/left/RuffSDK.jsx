import React from 'react';
import {connect} from 'react-redux';
import {addOutputCooked, setRuffSDKLocation,getVersion} from '../../actions/AppActions.jsx'
import LocationSelector from './cp/LocationSelector.jsx';
import {tr} from '../../lib/Utils'
import {existRapSDK} from '../../lib/Files';
import {escapePath} from '../../lib/FileUtil'
var fs = require('fs');
var path = require('path');
class RuffSDK extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ruffSDKLocation: ''
        }
    }

    componentDidMount() {
        if(this.props.ruffSDKLocation){
            this.setState({ruffSDKLocation: this.props.ruffSDKLocation})
            getVersion();
        }
    }
    componentWillReceiveProps(props){
        if(props.ruffSDKLocation){
            this.setState({ruffSDKLocation: props.ruffSDKLocation})
            addOutputCooked(tr(212), true);//'获得 Ruff SDK 路径';
            getVersion();
        }
        //console.log('componentWillReceiveProps',props)
    }

    getSDKPath(value) {
        if (!value) {
            return;
        }
        this.setState({ruffSDKLocation: value})
        var sdkPath = existRapSDK(value,this.props.osType);
        if(sdkPath == null){
            addOutputCooked(tr(211), true);//不是有效的ruff SDK
        }else{
            //this.setState({ruffSDKLocation: sdkPath})
            setRuffSDKLocation(sdkPath);
        }
    }

    render() {
        var self = this;
        var styleItem = {margin: '0 0 2px 0'}
        //tr 10-Ruff SDK 位置
        return (
            <div style={{margin:'-12px -12px -12px -12px'}}>
                <div style={{margin:'0 0 6px 0'}}>
                    <div style={styleItem}>
                        <LocationSelector inputValue={this.state.ruffSDKLocation} placeholder={tr(10)}
                                          onChangeValue={(value)=>{self.getSDKPath(value)}}/>
                    </div>
                </div>
            </div>
        )
    }
}
function select(state) {
    return {
        ruffSDKLocation: state.config.ruffSDKLocation,
        osType: state.config.osType,
    }
}
export default connect(select)(RuffSDK);
