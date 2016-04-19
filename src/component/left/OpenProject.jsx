import React from 'react';
import {connect} from 'react-redux';
import {dialog} from 'remote';
import {tr,format,cutCharByLength} from '../../lib/Utils'
import {escapePath} from '../../lib/FileUtil'
import {Icon} from 'antd';
import {openRuffProject,addOutputCooked,removeProject} from '../../actions/AppActions.jsx';
var fs = require('fs');
var path = require('path');
class OpenProject extends React.Component {
    constructor(props) {
        super(props)
    }

    onOpenFolder():void {
        dialog.showOpenDialog({properties: ['openDirectory']}, this.onOpenFolderEnd.bind(this));
    }
    /**从历史记录里打开项目*/
    onOpenFolderByHistrory(_path){
        if (fs.existsSync(_path)) {//判断Egret json文件是否存在
            this.onOpenFolderEnd([_path]);//存在项目，打开
        }else{
            addOutputCooked(tr(205,_path),true);//205--路径不存在
            removeProject({path:_path});//移除路径
        }
    }

    onOpenFolderEnd(paths):void {
        console.log('打开文件夹的路径:', paths);
        if (paths) {
            var projectPath = escapePath(paths[0]);
            //console.log(123123,path,this.props.config.projectPath);
            if (this.props.config.projectPath != projectPath) {//打开了新的文件夹
                var files = ['app.json', 'package.json', 'ruff_box.json'];
                var existProject = true;
                for (var i = 0, len = files.length; i < len; i++) {
                    var filePath = projectPath + '\\' + files[i];
                    if (!fs.existsSync(escapePath(filePath))) {//判断文件是否存在
                        existProject = false;
                    }
                }
                if(existProject){
                    var baseName = path.basename(projectPath);
                    openRuffProject({name:baseName,path:projectPath});//打开项目
                    // changConfig({projectPath: projectPath, save: true});
                    addOutputCooked(tr(204,baseName),true);//切换至项目
                }else{
                    addOutputCooked(tr(203),true);//不是有效的 ruff 项目
                }
            }
        }
    }
    render() {
        //console.log(121321,<pageCmd></pageCmd>)
        //console.log(123,this.props.config)
        //tr-11--打开项目文件夹
        // console.log('histrory:',this.props.histrory,this.props.histrory.get(0))
        // <button  style={{width:20,textAlign:'center',position:'relative',top:-20,left:30}} onClick={this.onOpenFolderByHistrory.bind(this,item.path)} className="btnBlue" ></button>
        var self = this;
        var getHistrory = this.props.histrory.map((item,index)=>{
            return(<div key={"histrory"+index}>
                <button  className="btnGray"  style={{margin:"0 0 0 -16px",paddingLeft:18}} onClick={(e)=>{self.onOpenFolderByHistrory(item.path)}}>
                    <p style={{width:30,height:30,position:'absolute',left:136,border:"1px"}} onClick={(e)=>{e.preventDefault();e.stopPropagation();removeProject({path:item.path});}}>X</p>
                    {cutCharByLength(item.name,16)}
                </button>
            </div>)
        })
        return (
            <div style={{margin:'-12px -12px -12px -12px'}}>
                <button style={{width:'100%'}} className="btnGreen" onClick={this.onOpenFolder.bind(this)}>{tr(1)}</button>
                <div style={{marginTop:4}}>
                    {getHistrory}
                </div>
            </div>
        )
    }
}
function select(state) {
    return {
        config: state.config,
        histrory:state.config.histrory
    }
}
export default connect(select)(OpenProject);
