import React, {PropTypes} from 'react';
import Button from '../ui/Button';
import {tr} from '../../lib/Utils';

export default class ExtraButton extends React.Component {
    constructor(props) {
        super(props)
        this.datas = [
            {iconName: 'icon-folder',doc:tr(11)},
            {iconName: 'icon-save',doc:tr(17)},
            {iconName: 'icon-delete',doc:tr(16)}]
    }

    componentDidMount() {
        //初始化渲染执行之后立刻调用
    }

    componentDidUpdate(prevProps) {
        //在组件的更新已经同步到 DOM 中之后立刻被调用
    }

    showInfo(e) {
        console.log('showInfo')
        var tip = this.refs.tip;
        tip.className = 'infoShow';
        // console.log(777,e.getBoundingClientRect)
        var rect = e.getBoundingClientRect();
        // console.log('rect:',rect);

        tip.style.top = rect.bottom + 9 + 'px';
        tip.style.left = rect.left - tip.getBoundingClientRect().width + 36 + 'px';
        // console.log('tip:',rect);
    }

    hideInfo() {
        var tip = this.refs.tip;
        tip.className = 'infoHide';
    }

    render() {
        var self = this;
        var id = this.props.id;
        var iconName = this.datas[id].iconName;
        var buttonStyle = {width: '26px', height: '16px', margin: '1px 0 1px 0'};
        buttonStyle = Object.assign(buttonStyle, this.props.buttonStyle);
        var content = this.datas[id].doc;
        // console.log('style:',buttonStyle);

        return (
            <div className="extraButton" style={this.props.style}>
                <div className="absolute">
                    <div ref="tip" className="infoHide">
                        <div className="infoArrowUp"/>
                        <div className="infoContent">{content}</div>
                    </div>
                </div>
                <Button style={buttonStyle}
                        iconName={iconName}
                        iconSize={this.props.iconSize}
                        onClick={this.props.onClick}
                        onMouseOver={this.showInfo.bind(this)}
                        onMouseOut={this.hideInfo.bind(this)}
                />
            </div>
        )
    }
}
ExtraButton.propTypes = {
    id: PropTypes.number.isRequired,
    // fontSize:PropTypes.string,
    // style:PropTypes.object,//整体的样式
    onClick: PropTypes.func,
    buttonStyle: PropTypes.object,//里面图标的样式
}
// {/*shell.openItem(this.props.ruffProjectPath);*/}