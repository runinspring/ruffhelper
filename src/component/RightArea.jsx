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
    getOperations() {
        // console.log('getOperations')
        // return <Button>1212</Button>;
        // console.log(1212,this.state.tabKey)
        // console.log(get)
        if (this.state.tabKey == 1) {
            console.log('type1',this.state);
            return this.state.extra1;
            
            // return (<div>
            //     <Button><Icon type="folder-open"/></Button>
            // </div>);
        } else if (this.state.tabKey == 2) {
            console.log('type2');
            return this.state.extra2;
            
            // return (
            //     <div>
            //     <Button><Icon type="caret-circle-o-right"/></Button>
            //     <Button><Icon type="cross-circle-o"/></Button>
            //     <Button><Icon type="delete"/></Button>
            //     <Button><Icon type="save"/></Button>
            // </div>
            // )
        }
    }
    getExtraContent(key, data) {
        this.setState({[key]: data })
        // console.log(888,this.state)
        // console.log('getExtraContent', key,data);
    }
    render() {
        
        return (
            <div className="rightArea">
                <Tabs tabBarExtraContent={this.getOperations()} defaultActiveKey={this.state.tabKey} onChange={this.changeTab.bind(this)}>
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