/**系统更新面板*/
import React from 'react';
import {tr} from '../../lib/Utils';
import {Input,Checkbox} from 'antd';
import LocationSelector from './../left/cp/LocationSelector.jsx';
import {closeAlert} from '../../actions/AppActions.jsx';
var fs = require('fs');
export default class SystemUpgrade extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            ip:'',
            firmware:"",
            checked:false,
            createDisabled:true,//默认 确定 按钮禁止按下
            warn:'',//警告信息
        }
    }
    componentDidMount(){
        this.getWarn();
    }
    componentDidUpdate(next){
        this.getWarn();
        // console.log('componentDidUpdate',next)
    }
    getFirmwarePath(value){
        if (value == this.state.firmware) {
            return;
        }
        this.setState({firmware:value})
    }
    getWarn(){
        var warn;
        var createDisabled = true;
        if(!this.state.ip){
            warn = tr(56);//请输入开发板的 IP 地址
        }else if(!this.state.firmware){
            warn = tr(58);//请选择固件的存放地址
        }else if(!fs.existsSync(this.state.firmware)){
            warn = tr(59);//59 固件路径错误
        }else if(!this.state.checked){
            warn = tr(43);//请确保电源线已经牢固的连接了
        }else{
            warn="";
            createDisabled = false;
        }
        if(warn != this.state.warn){
            this.setState({warn:warn,createDisabled:createDisabled});
            document.getElementById("warnMessage").innerHTML = `<b style="color:red">${warn}</b>`;
        }
    }
    render() {
        var self = this;
        //43 请确保电源线已经牢固的连接了
        // tr(56) = '请输入开发板的 IP 地址';
        // tr(57) = '相关信息可以通过 rap scan 命令获得';
        // tr(58) = '请选择固件的存放地址';
        //80 固件更新
        // console.log('state:',this.state)
        return(
            <div className="alertPanel">
                <div className="alertItem alertInput" style={{textAlign:'center',height:"100%",padding:'10px 10px 10px 10px'}}>
                    <div>{tr(80)}</div>
                    <div>-----------------------</div>
                    <div style={{textAlign:'left'}}>
                        {`${tr(56)},${tr(57)}`}
                        <Input size="small" style={{marginBottom:"4px"}} id='inputPanel' placeholder={(tr(56))} onChange={(e)=>{self.setState({ip:e.target.value})}}/>
                        {tr(58)}
                        <div style={{width:"236px"}} >
                            <LocationSelector inputValue={this.state.firmware} placeholder={tr(58)}
                                              onChangeValue={(value)=>{self.getFirmwarePath(value)}}/>
                        </div>
                        <Checkbox defaultChecked={false} onChange={(e)=>{self.setState({checked:e.target.checked})}}/>{tr(43)}
                        <div style={{minHeight:'40px'}} id="warnMessage"/>
                    </div>
                    <div style={{textAlign:'center',margin:"10px 0 0 0"}}>
                        <button className="btnBlue" disabled={this.state.createDisabled} style={{width:60,marginRight:20}}
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