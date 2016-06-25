import React from 'react';
import {connect} from 'react-redux';
import { Tabs, Icon,Button } from 'antd';
const TabPane = Tabs.TabPane;
import CommandsArea from './rights/CommandsArea.jsx';
import LogsArea from './rights/LogsArea.jsx';
// import CommandArea from './right/CommandArea.jsx';
// import LogArea from './right/LogArea.jsx';
class RightArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabKey: 1,
            "extra1": '',
            extra2: ''
        }
    }
    changeTab(e) {
        // console.log(e,this)
        this.setState({ tabKey: e });
    }
    /**获取扩展的按钮*/
    getOperations() {
        if (this.state.tabKey == 1) {
            return this.state.extra1;
        } else if (this.state.tabKey == 2) {
            return this.state.extra2;
        }
    }
    getExtraContent(key, data) {
        this.setState({[key]: data })
    }
    render() {
        
        return (
            <div className="rightArea">
                <Tabs tabBarExtraContent={this.getOperations()} defaultActiveKey={this.state.tabKey} onChange={this.changeTab.bind(this)} type="card">
                    <TabPane tab={<span><Icon type="credit-card" />Rap 命令</span>} key="1">
                        <CommandsArea extraContent={this.getExtraContent.bind(this)}/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="message" />Rap Log</span>} key="2">
                        <LogsArea extraContent={this.getExtraContent.bind(this)}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
    // render() {
    //     return (
    //         <div className="rightArea">
    //             <CommandArea/>
    //             <LogArea/>
    //         </div>
    //     )
    // }
}
function select(state) {
    return{
        config:state.config
    }
}
export default connect(select)(RightArea);