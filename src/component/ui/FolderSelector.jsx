import React, {PropTypes} from 'react';
import {dialog} from 'remote';
import Buttom from './Button';
export default class FolderSelector extends React.Component {
    constructor(props) {
        super(props)
        this.isOpen = false;//是否打开了`打开文件夹`的对话框
        // this.state.value = this.props.defaultValue || '';
    }

    onOpenFolder() {
        // console.log('onOpenFolder',this.isOpen)
        if (!this.isOpen) {
            this.isOpen = true;
        } else {
            return;
        }
        dialog.showOpenDialog({properties: ['openDirectory']}, this.onOpenFolderEnd.bind(this));
    }

    onOpenFolderEnd(paths) {
        this.isOpen = false;
        if (paths && paths.length > 0) {
            this.props.openFolderCallBack(paths[0]);
        }
        // console.log('path:',paths)
    }

    render() {
        // var style = {}
        // if (this.props.style) {
        //     style = this.props.style;
        // }
        // style.display = 'flex';
        // style.textAlign = 'center'
        // var self = this;
        // var getIcon = function () {
        //     var className ='';
        //     if (!self.props.iconName) {
        //         className= ''
        //     } else {
        //         className = `mousePointer iconfont ${self.props.iconName}`
        //     }
        //     return <div className={className}/>
        // }
        // {background:`url(${self.props.iconSVGUrl})`
        // style={{backgroundSize:'contain',
        // width:self.props.style.width, height:self.props.style.height}}
        return (
            <Buttom style={this.props.style} value={this.props.defaultValue} iconName={this.props.iconName} onClick={this.onOpenFolder.bind(this)}/>
        )
        // return (
        //     <div className="mousePointer JUI JButton" style={style} onClick={this.onOpenFolder.bind(this)}>
        //         <div style={{margin:'auto'}}>
        //             {getIcon()}
        //             <div style={{margin: this.props.margin, padding: this.props.padding}}>
        //                 {this.props.defaultValue}
        //             </div>
        //         </div>
        //     </div>)
    }
}
FolderSelector.propTypes = {
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),//要显示的值
    // onChange: PropTypes.func,//input 内容改变的回调方法
    style: PropTypes.object,//样式
    iconName: PropTypes.string,//图标的名称
    // padding: PropTypes.string,
    // margin: PropTypes.string,
    openFolderCallBack: PropTypes.func.isRequired,
}