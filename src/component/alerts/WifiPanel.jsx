import React from 'react';
import {tr} from '../../lib/Utils';
import {closeAlert} from '../../actions/AppActions.jsx';
import {Input} from 'antd';
export default class WifiPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ssid:'',
            password:''
        }
        console.log('WifiPanel')
    }


    render() {
        var self = this;
        //tr 12确定 13取消 81:设置 WiFi';
        var createDisabled = true;//默认禁止创建项目
        if(this.state.ssid && this.state.password){
            createDisabled = false;
        }
        return (
            <div className="alertPanel">
                <div className="alertItem alertInput" style={{textAlign:'center',height:"100%",padding:'10px 10px 10px 10px'}}>
                    <div style={{marginBottom:5}}>{tr(81)}</div>
                    <div style={{textAlign:'left'}}>
                         <div>SSID</div>
                        <Input style={{marginButton:"10px"}} size="small" placeholder="SSID" onChange={(e)=>{self.setState({ssid:e.target.value})}}/>
                        <div>password</div>
                        <Input style={{marginButton:"5px"}} size="small" placeholder="password" onChange={(e)=>{self.setState({password:e.target.value})}}/>
                    </div>
                    <div style={{textAlign:'center',margin:"10px 0 0 0"}}>
                        <button className="btnBlue" disabled={createDisabled} style={{width:60,marginRight:20}}
                                onClick={()=>{
                                self.props.item.callback(self.state);
                                closeAlert(self.props.index);//关闭面板
                                }}>{tr(12)}</button>
                        <button className="btnBlue" style={{width:60}}
                                onClick={()=>{closeAlert(self.props.index)}}>{tr(13)}</button>
                    </div>
                </div>
            </div>
        )
    }
}
WifiPanel.propTypes = {
    index: React.PropTypes.number.isRequired,
    item: React.PropTypes.object.isRequired,
}