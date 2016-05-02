import React from 'react';
import {connect} from 'react-redux';
import {tr} from '../../lib/Utils'
class LogArea  extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount()
    {
        this.setPositionAtBottom();
    }
    componentWillUnmount()
    {
    }

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
export default connect(select)(LogArea);
