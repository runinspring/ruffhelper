import React, {PropTypes} from 'react';
import {dialog} from 'remote';
export default class FolderSelector extends React.Component {
    constructor(props) {
        super(props)
        this.isOpen = false;//是否打开了`打开文件夹`的对话框
        // this.state.value = this.props.defaultValue || '';
    }
    onOpenFolder(){
        // console.log('onOpenFolder',this.isOpen)
        if(!this.isOpen){
            this.isOpen = true;
        }else{
            return;
        }
        dialog.showOpenDialog({properties: ['openDirectory']}, this.onOpenFolderEnd.bind(this));
    }
    onOpenFolderEnd(paths) {
        this.isOpen = false;
        if(paths && paths.length>0){
            this.props.openFolderCallBack(paths[0]);
        }

        // console.log('path:',paths)
    }

    render() {
        var style = {}
        if (this.props.style) {
            style = this.props.style;
        }
        var self = this;
        var getSVGBackground = function () {
            if(!self.props.iconSVGUrl){
                return <div/>
            }else{
                return <div className="absolute" style={{background:`url(${self.props.iconSVGUrl})`,
                    backgroundSize:'contain',
                    width:self.props.style.width, height:self.props.style.height}}/>
            }
        }
        return (
            <div className="mousePointer JUI JSelector" style={style} onClick={this.onOpenFolder.bind(this)}>
                {getSVGBackground()}
                <div style={{margin: this.props.margin, padding: this.props.padding}}>
                    {this.props.defaultValue}
                </div>
            </div>)
    }
}
FolderSelector.propTypes = {
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),//要显示的值
    onChange: PropTypes.func,//input 内容改变的回调方法
    style: PropTypes.object,//样式
    iconSVGUrl: PropTypes.string,//图标的链接
    padding: PropTypes.string,
    margin: PropTypes.string,
    openFolderCallBack:PropTypes.func.isRequired,
}