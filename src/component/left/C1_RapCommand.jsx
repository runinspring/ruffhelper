/**常用的rap命令*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
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
        this.idxAniEnd = 0;
        // console.log('getInitialState')
    }

    componentDidMount() {
        // console.log('componentDidMount')
        //初始化渲染执行之后立刻调用
        let self = this;
        var tree = ReactDOM.findDOMNode(this.refs['tree']);
        // console.log('treeL',tree)
        tree.addEventListener('webkitAnimationEnd', function (e) {
            if (self.props.type != 2) {
                return;
            }
            self.idxAniEnd += 1;
            if (self.idxAniEnd == self.arrCommands.length - 2) {//动画结束，关闭面板
                self.idxAniEnd = 0;
                command(LEFT_CHANGE_CLUMTYPE, {key: self.props.clumId, value: 0});
            }
        })
    }

    componentDidUpdate(prevProps) {
        //在组件的更新已经同步到 DOM 中之后立刻被调用
        // console.log('C1_RapCommand.type:', this.props.type)
        // if (this.props.type == 2) {//0关闭 1打开 2关闭中
        //     // this.closeEnd();
        // }
    }

    getItems() {
        var type = this.props.type;
        if(type == 0){
            return <div/>
        }
        // console.log('type:',type)
        return this.arrCommands.map(function (item, index) {
            if (type == 1) {
                var style = {
                    animation: `widthShow 0.4s ease ${index * 0.04}s`,
                    animationFillMode: 'both'
                };
            } else {
                style = {
                    animation: `widthClose ${0.3 + 0.06 * index}s ease`,
                    animationFillMode: 'forwards'
                }
            }
            //
            return (
                <div key={'cmd' + index} style={style}>

                    <div className="rapcommand mousePointer">
                        <div style={{overflow: 'hidden'}}>
                            <div className="border">
                                <div style={{paddingLeft: '4px', overflow: 'hidden'}}>
                                    <div style={style}>{item.name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div ref="tree" className="mousePointer">
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