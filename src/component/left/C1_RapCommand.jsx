/**常用的rap命令*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
class C1_RapCommand extends React.Component {
    constructor(props) {
        super(props)
        console.log('getInitialState')
    }
    componentDidMount(){
        //初始化渲染执行之后立刻调用
    }
    componentDidUpdate(prevProps){
        //在组件的更新已经同步到 DOM 中之后立刻被调用
    }
    test() {
        console.log('test1');
    }
    render() {
        console.log('C1_RapCommand.render')
        return(
            <div>
                C1_RapCommand
            </div>
        )
    }
}
function select(state) {
    return {
        osType: state.config.osType
    }
}
export default connect(select)(C1_RapCommand);
// C1_RapCommand.propTypes = {
//     closeCallBack: PropTypes.func.isRequired,//回调的方法
//     startShow: PropTypes.bool.isRequired//是否开始显示了
// }