//import React from 'react';
import React,{Component,PropTypes} from 'react';
//var PropTypes = React.PropTypes
import {connect} from 'react-redux';
import {Icon, Row, Col,Input} from 'antd';
import {dialog} from 'remote';
//var cp_exec = require('child_process').exec;

/**文件夹位置选择器*/
export default class LocationSelector extends Component{
    constructor(props) {
        super(props);
    }
    /**使用该类的时候必须要写入的方法,可以通过 this.props 调用*/


    //defaultPath:PropTypes.string.isRequired,
    onOpenFolder() {
        dialog.showOpenDialog({properties: ['openDirectory','openFile']}, this.onOpenFolderEnd.bind(this));
    }
    onOpenFolderEnd(paths){
        console.log('打开文件夹的路径:', paths);
        if(paths){
            this.props.onChangeValue(paths[0]);
        }
    }
    render(){
        var self = this;
        return(
            <Row>
                <Col span="20">
                    <Input id="location" size="small"  placeholder={this.props.placeholder} value={this.props.inputValue} onChange={(e)=>{self.props.onChangeValue(e.target.value)}}/>
                </Col>
                <Col span="4">
                    <button className="btnGreen" style={{height:20,padding:'2px 4px 2px 4px',marginLeft:2}} onClick={this.onOpenFolder.bind(this)}>
                        <Icon type="ellipsis"/>
                    </button>
                </Col>
            </Row>
        )
    }
}
LocationSelector.propTypes={
    inputValue: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChangeValue:PropTypes.func.isRequired
}