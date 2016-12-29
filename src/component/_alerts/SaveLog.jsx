import React from 'react';
import {tr} from '../../lib/Utils';
import {escapePath} from '../../lib/FileUtil';
import LocationSelector from './../left/cp/LocationSelector.jsx';
import {Input} from 'antd';
import {setRuffSDKLocation, closeAlert} from '../../actions/AppActions.jsx';
var fs = require('fs');
export default class SaveLog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // sdkExist: true,
            logLocation: '',
            fileName: '',
            info: ' '//错误信息
        }
    }
    getSDKPath(value) {
        if (value == this.state.logLocation) {
            return;
        }
        this.setState({ logLocation: value });
    }
    getName(value) {

    }
    onSave() {
        // console.log('onSave', this.state.logLocation, this.state.fileName)
        if (!this.state.logLocation) {
            this.setState({ info: tr(205, " ") });//路径不存在：
            return;
        }
        if (!this.state.fileName) {
            this.setState({ info: tr(215) });//文件名不存在
            return;
        }
        var logPath = escapePath(this.state.logLocation);
        if (fs.existsSync(logPath)) {
            logPath = escapePath(`${logPath}/${this.state.fileName}.txt`);
            if (fs.existsSync(logPath)) {
                // console.log('该项目已存在：',this.state.fileName + '.txt')
                this.setState({ info: tr(206, this.state.fileName + '.txt') });//该项目已存在：    
            } else {
                this.setState({ info: " " });//全部通过，返回路径，关闭面板
                this.props.item.callback(logPath);
                closeAlert(this.props.index);
            }
        } else {
            // console.log(tr(205, this.state.logLocation))
            this.setState({ info: tr(205, this.state.logLocation) });//路径不存在
        }
        // closeAlert(this.props.index)}
    }

    render() {
        var self = this;
        // console.log('this.state.sdkExist:',this.state.sdkExist)
        // if (this.state.sdkExist) {
        //     return (<div/>)
        // }

        //tr 12确定 19 保存日志到本地  20 选择要保存的位置  21保存日志的文件名
        return (
            <div className="alertPanel">
                <div className="alertItem" style={{ height: "100%", textAlign: 'center', padding: '10px 10px 10px 10px' }}>
                    <div>{tr(19) }</div>

                    <div style={{ textAlign: 'left' }}>
                        <div>{tr(20) }</div>
                        <LocationSelector inputValue={this.state.logLocation} placeholder={tr(20) }
                            onChangeValue={(value) => { self.getSDKPath(value) } }/>
                        <div style={{ marginTop: "2px" }}>{tr(21) }</div>
                        <div>
                            <Input style={{ marginButton: "10px", width: 182 }} size="small" placeholder={tr(21) } onChange={(e) => { self.setState({ fileName: e.target.value }) } }/>
                            .txt
                        </div>
                        
                    </div>

                    <div>{this.state.info}</div>
                    <div style={{ textAlign: 'center', margin: "10px 0 0 0" }}>
                        <button className="btnBlue" style={{ width: 60,marginRight:20 }}
                            onClick={() => { this.onSave() } }>{tr(12) }</button>
                        <button className="btnBlue" style={{ width: 60 }}
                            onClick={() => { closeAlert(self.props.index) } }>{tr(13) }</button>
                    </div>

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
SaveLog.propTypes = {
    index: React.PropTypes.number.isRequired,
    item: React.PropTypes.object.isRequired,
}