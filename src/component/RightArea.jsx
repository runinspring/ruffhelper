import React from 'react';
import {connect} from 'react-redux';
import LogContent from './right/LogContent';
import InfoArea from './right/InfoArea';
class RightArea extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidUpdate() {
        this.setPositionAtBottom();
    }
    /**定位到最下面一行*/
    setPositionAtBottom() {
        // console.log(this.refs.logArea)
        // if (!this.state.autoLog) return;
        // var logArea = this.refs.logArea;
        // if(this.props.config.autoS)
        if(this.props.autoRapLog){
            var logArea = document.getElementById("logArea");
            logArea.scrollTop = logArea.scrollHeight;
        }

        // console.log(111,logArea.scrollHeight)
        // var ex = document.getElementById("rapLogArea");//定位到最下面一行
        // ex.scrollTop = ex.scrollHeight;
    }

    getLogContent(){
        return this.props.logContent.map((item,index)=>{
            return <LogContent key={'log'+index} content={item}/>
        })
    }

    render() {
        return (
            <div className="absolute right">
                <InfoArea/>
                <div id="logArea" className="logArea">
                    {this.getLogContent()}
                </div>
            </div>
        )
    }
}

function select(state) {
    return {
        autoRapLog:state.config.autoRapLog,
        // config: state.config,
        logContent:state.logContent
    }
}
export default connect(select)(RightArea);
