/**系统更新面板*/
import React from 'react';
import {tr} from '../../lib/Utils';
import {Input} from 'antd';
import LocationSelector from './../left/cp/LocationSelector.jsx';
export default class SystemUpgrade extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            ip:'',
            firmware:""
        }
    }
    componentDidMount(){

    }
    componentDidUpdate(next){

    }
    getFirmwarePath(value){
        if (value == this.state.firmware) {
            return;
        }
        this.setState({firmware:value})
    }
    render() {
        var self = this;
        // tr(56) = '请输入开发板的 IP 地址';
        // tr(57) = '相关信息可以通过 rap scan 命令获得';
        // tr(58) = '请选择固件的存放地址';
        //80 固件更新
        console.log('state:',this.state)
        return(
            <div className="alertPanel">
                <div className="alertItem alertInput" style={{textAlign:'center',height:"100%",padding:'10px 10px 10px 10px'}}>
                    {tr(80)}
                    <div style={{textAlign:'left'}}>
                        {`${tr(56)},${tr(57)}`}
                        <Input size="small" style={{marginBottom:"4px"}} id='inputPanel' placeholder={(tr(56))} onChange={(e)=>{self.setState({ip:e.target.value})}}/>
                        {tr(58)}
                        <div style={{width:"236px"}} >
                            <LocationSelector inputValue={this.state.firmware} placeholder={tr(58)}
                                              onChangeValue={(value)=>{self.getFirmwarePath(value)}}/>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}