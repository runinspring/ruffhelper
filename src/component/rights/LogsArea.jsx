import React from 'react';
import {connect} from 'react-redux';
import {tr} from '../../lib/Utils'
import { Icon,Button } from 'antd';
import ExtraButton from './ExtraButton.jsx';
class LogsArea  extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount()
    {
        this.setPositionAtBottom();
    }
    componentWillMount() {
        this.props.extraContent('extra1', <ExtraButton  onClick={() => {shell.openItem(this.props.projectPath); } } tr={11} iconName="folder-open"/>)
        this.props.extraContent('extra2', (
            <div>
                <ExtraButton  onClick={() => {} } tr={11} iconName="qrcode"/>
                <ExtraButton  onClick={() => {} } tr={11} iconName="caret-circle-o-right"/>
                <ExtraButton  onClick={() => {} } tr={11} iconName="cross-circle-o"/>
                <ExtraButton  onClick={() => {} } tr={11} iconName="delete"/>
                <ExtraButton  onClick={() => {} } tr={11} iconName="save"/>

            </div>))
    }
// <Button onClick={() => { console.log(this) } }><Icon type="caret-circle-o-right"/></Button>
// <Button><Icon type="cross-circle-o"/></Button>
//     <Button><Icon type="delete"/></Button>
//     <Button><Icon type="save"/></Button>

    componentDidUpdate() {
        this.setPositionAtBottom();
    }
    /**定位到最下面一行*/
    setPositionAtBottom(){
        var ex = document.getElementById("rapLogArea");//定位到最下面一行
        ex.scrollTop = ex.scrollHeight;
    }
    render(){
        //52-- rap log 日志 --
        return(
            <div>
                <div><b>{tr(52)}</b></div>
                <div id="rapLogArea" className="outputArea selectable textArea">
                    <div style={{wordWarp:'break-word'}} dangerouslySetInnerHTML={{__html: this.props.logContent}}></div>
                </div>
            </div>
        )
    }
}
function select(state) {
    return{
        logContent:state.logContent
    }
}
export default connect(select)(LogsArea);
LogsArea.propTypes = {
        extraContent: React.PropTypes.func.isRequired
    };  // 注意这里有分号