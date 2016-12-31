/**常用的rap命令*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {LEFT_CHANGE_CLUMTYPE, command} from '../../actions/AppActions';
class C1_RapCommand extends React.Component {
    constructor(props) {
        super(props)
        this.arrCommands = [
            {name: 'rap deploy -s', id: 0},
            {name: 'rap scan', id: 9},
            {name: 'rap layout --visual', id: 2},
            {name: 'rap device add', id: 12},
            {name: 'rap device remove', id: 13},
            {name: 'rap device update', id: 14},
            {name: 'rap system upgrade', id: 10},
            {name: 'rap wifi', id: 11},
            {name: 'rap deploy', id: 8},
            {name: 'rap layout', id: 5},
            {name: 'rap start', id: 6},
            {name: 'rap stop', id: 7},
            {name: 'rap --version', id: 3}
        ];
        // console.log('getInitialState')
    }

    componentDidMount() {
        //初始化渲染执行之后立刻调用
    }

    componentDidUpdate(prevProps) {
        //在组件的更新已经同步到 DOM 中之后立刻被调用
        console.log('C1_RapCommand.type:', this.props.type)
        if (this.props.type == 2) {
            this.closeEnd();
        }
    }
    getItems(){

    }
    /**关闭组件*/
    closeEnd() {
        setTimeout(()=> {
            command(LEFT_CHANGE_CLUMTYPE, {key: this.props.clumId, value: 0});
        }, 1000)
    }

    render() {
        console.log('C1_RapCommand.render')
        return (
            <div className="mousePointer">
                C1_RapCommand
                {this.getItems()}
            </div>
        )
    }
}
function select(state) {
    return {
        type: state.left.clum1
    }
}
export default connect(select)(C1_RapCommand);
C1_RapCommand.propTypes = {
    clumId: PropTypes.number.isRequired//栏目的id
}