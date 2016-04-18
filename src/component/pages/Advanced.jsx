/**命令行的页面*/
import React from 'react';
import {connect} from 'react-redux';
class Advanced  extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {
    }
    render(){
        if(this.props.pageSelect != 1){
            return <div></div>
        }
        //console.log(123,this.props.config)
        //console.log(123123)
        return(
            <div>Advanced now</div>
        )
    }
}
function select(state) {
    return{
        config:state.config,
        pageSelect:state.pageSelect
    }
}
export default connect(select)(Advanced);
