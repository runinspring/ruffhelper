import React from 'react';
import {connect} from 'react-redux';
import { Tabs, Icon,Button } from 'antd';
const TabPane = Tabs.TabPane;
import CommandArea from './right/CommandArea.jsx';
import LogArea from './right/LogArea.jsx';
class RightArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabKey:1
        }
    }
    changeTab(e) {
        // console.log(e,this)
        this.setState({ tabKey: e });
    }
    getOperations() {
        
        // return <Button>1212</Button>;
        // console.log(1212,this.state.tabKey)
        if (this.state.tabKey == 1) {
            console.log('type1');
            return (<div>
                <Button><Icon type="folder-open"/></Button>
            </div>);
        } else if (this.state.tabKey == 2) {
            return (<div>
                <Button><Icon type="caret-circle-right"/></Button>
                <Button><Icon type="delete"/></Button>
                <Button><Icon type="save"/></Button>
                </div>);
            // console.log('type2');
        }
        
    }
    render() {
        
        return (
            <div className="rightArea">
                <Tabs tabBarExtraContent={this.getOperations()} defaultActiveKey={this.state.tabKey} onChange={this.changeTab.bind(this)}>
                    <TabPane tab={<span><Icon type="credit-card" />Rap 命令</span>} key="1">
                        <CommandArea/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="message" />Rap Log</span>} key="2">
                        <LogArea/>
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