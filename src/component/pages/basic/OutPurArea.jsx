/**命令行的页面*/
import React from 'react';
import {connect} from 'react-redux';
class OutPurArea  extends React.Component {
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
        var ex = document.getElementById("outputArea");//定位到最下面一行
        ex.scrollTop = ex.scrollHeight;
    }
    render(){
        var self = this;
        return(
            <div id="outputArea" className="outputArea selectable textArea">
                 <div dangerouslySetInnerHTML={{__html: this.props.output}}></div>
            </div>
        )
    }
}
function select(state) {
    return{
        output:state.outputContent
    }
}
export default connect(select)(OutPurArea);
