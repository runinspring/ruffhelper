import React, {PropTypes} from 'react';
import {
    addLog,
    command,
    REMOVE_RUFF_PROJECT,
    COLOR_GREEN
} from '../../../actions/AppActions';
import {tr,cutCharByLength} from '../../../lib/Utils';
export default class Item extends React.Component {
    constructor(props) {
        super(props)
        var index = this.props.index;
        this.aniShow = `widthShow 0.4s ease ${index * 0.1}s both`;
        // console.log(this.aniShow)
    }

    componentDidMount() {
        var item = this.refs.hisItem;
        item.addEventListener('animationend', ()=> {
            if (this.props.aniType == 1) {//只有打开状态才不断的重复
                item.style.width = '100%';
                item.style.animation = '';
            }

        })
    }

    componentDidUpdate() {
        if (this.props.aniType == 1) {
            this.refs.hisItem.style.animation = this.aniShow;
            this.refs.hisItem.style.animationPlayState = "running";
        }
    }

    render() {
        // console.log(123123)
        var item = this.props.item;
        var index = this.props.index;
        if (this.props.aniType == 1) {
            var aniStyle = {
                width: '0px',
                animation: `widthShow  0.4s ease ${index * 0.1}s`,
                animationFillMode: 'both'
            };
        } else {
            aniStyle = {
                width: '100%',
                animation: `widthClose 0.2s ease ${index * 0.1}s`,
                animationFillMode: 'forwards'
            };
        }
        aniStyle.position = 'relative'
        // console.log('aniStyle:',aniStyle)
        return (
            <div ref="hisItem" className="openHistroryItem" style={aniStyle} onClick={()=> {
                this.props.clickCallBack(item.path)
            }}>
                <p className="absolute"
                   onClick={(e)=> {
                       e.preventDefault();
                       e.stopPropagation();
                       command(REMOVE_RUFF_PROJECT, {path: item.path})
                       addLog(tr(211,item.name),COLOR_GREEN);
                   }}>X</p>
                {`+ ${cutCharByLength(item.name, 16)}`}
            </div>
        )
    }
}
// style={{position:'relative'}
Item.propTypes = {
    item: PropTypes.object.isRequired,//路径的对象
    aniType: PropTypes.number.isRequired,//动画的类型， 1出现 2关闭
    index: PropTypes.number.isRequired,
    clickCallBack: PropTypes.func.isRequired,//点击后的回调
}