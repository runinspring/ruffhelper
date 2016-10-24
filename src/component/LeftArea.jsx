import React from 'react';
import {connect} from 'react-redux';
import RapCommand from './left/RapCommand.jsx';
import OpenProject from './left/OpenProject.jsx';
import NewProject from  './left/NewProject.jsx';
// import RuffSDK from  './left/RuffSDK.jsx';
import {tr} from '../lib/Utils'
import { Collapse } from 'antd';
import config from '../config';
const Panel = Collapse.Panel;
class LeftArea extends React.Component {
    constructor(props){
        super(props)
    }
    callback(key) {
        console.log(key);
    }


    render(){
        //console.log(121321,<pageCmd></pageCmd>)
        //console.log(123,this.props.config)
        //0--Rap 命令 ; 1--选择项目 ; 2--新建项目  10--ruff sdk
        //默认是打开 1 2 3
        //console.log('public:',config.isPublic)
        //if(!config.isPublic){
        //    return (<div style={{margin:'4px 4px 4px 4px'}}>
        //        <div className="bg"/>
        //        <div className="leftArea">
        //            <div style={{width:150}}>
        //                <Collapse defaultActiveKey={['1']}>
        //                    <Panel header={tr(1)} key="1">
        //                        <OpenProject/>
        //                    </Panel>
        //                </Collapse>
        //            </div>
        //        </div>
        //    </div>)
        //}
        return(
            <div style={{margin:'4px 4px 4px 4px'}}>
                <div className="bg"/>
                <div className="leftArea">
                    <div style={{width:150}}>
                        <Collapse defaultActiveKey={['1','2']}>
                            <Panel header={tr(0)} key="1">
                                <RapCommand/>
                            </Panel>
                            <Panel header={tr(1)} key="2">
                                <OpenProject/>
                            </Panel>
                            <Panel header={tr(2)} key="3">
                                <NewProject/>
                            </Panel>

                        </Collapse>
                    </div>
                </div>
            </div>
        )
    }
}
// <Panel header={tr(10)} key="4">
//     <RuffSDK/>
// </Panel>
function select(state) {
    return{
        config:state.config
    }
}
export default connect(select)(LeftArea);
