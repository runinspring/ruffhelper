import React from 'react';
import {connect} from 'react-redux';
import {tr} from '../../lib/Utils';
import {closeAlert} from '../../actions/AppActions.jsx';
import {Input} from 'antd';
class InputPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue:''
        }
    }


    render() {
        var self = this;
        //tr 12确定 13取消
        return (
            <div className="alertPanel">
                <div className="alertItem alertInput" style={{textAlign:'center',padding:'10px 10px 0 10px'}}>
                    <div style={{marginBottom:5}}>{this.props.item.data}</div>
                    <Input id='inputPanel' placeholder={this.props.item.data} onChange={(e)=>{self.setState({inputValue:e.target.value})}}/>
                    <div style={{textAlign:'center',margin:"10px 0 0 0"}}>
                        <button className="btnBlue" style={{width:60,marginRight:20}}
                                onClick={()=>{
                                self.props.item.callback(self.state.inputValue);
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

//style={{animation:'loadIn 3s'}}
function select(state) {
    return {
        osType: state.config.osType
    }
}
InputPanel.propTypes = {
    index: React.PropTypes.number.isRequired,
    item: React.PropTypes.object.isRequired,
}
export default connect(select)(InputPanel);