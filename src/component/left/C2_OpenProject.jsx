/**打开本地的rap项目*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {dialog} from 'remote';
import {LEFT_CHANGE_CLUMTYPE, command,addLog,COLOR_RED,COLOR_GREEN} from '../../actions/AppActions';
import {tr} from '../../lib/Utils';
var fs = require('fs');
var path = require('path');
import {escapePath} from '../../lib/FileUtil';
class C2_OpenProject extends React.Component {
    constructor(props) {
        super(props)
        this.isOpen = false;//是否打开了`打开文件夹`的对话框
    }
    getWord(){
        var word='s'
        for(var i=0,len=Math.floor(Math.random()*100);i<len;i++){
            word += Math.floor(Math.random()*10)
        }
        return word;
    }

    onOpenFolder() {
        // if(!this.isOpen){
        //     this.isOpen = true;
        //     dialog.showOpenDialog({properties: ['openDirectory']}, this.onOpenFolderEnd.bind(this));
        // }
        // if(Math.random()<0.2){
        //     command(LOG_ADD,{color:'black',value:this.getWord()});
        // }else if(Math.random()<0.4) {
        //     command(LOG_ADD,{color:'red',value:this.getWord()});
        // }else if(Math.random()<0.6) {
        //     command(LOG_ADD,{color:'#5EFDFF',value:this.getWord()});
        // }else
        // {
        //     command(LOG_ADD,{color:'white',value:this.getWord()});
        // }
        // command(LOG_ADD,{color:'white',value:this.getWord()});
    // command(LOG_ADD,{color:'#5EFDFF',value:this.getWord()});
        if(Math.random()<0.5){
                addLog(this.getWord())
                // command(LOG_ADD,{color:'#5EFDFF',value:this.getWord()});
        }else{
            addLog(this.getWord(),'#5EFDFF')
            // command(LOG_ADD,{color:'white',value:this.getWord()});
        }

        // dialog.showOpenDialog({properties: ['openDirectory']}, this.onOpenFolderEnd.bind(this));
    }
    onOpenFolder2() {
        if(!this.isOpen){
            this.isOpen = true;
        }else{
            return;
        }
        var self = this;
        dialog.showOpenDialog({properties: ['openDirectory']}, (paths)=>{
            self.isOpen = false;
            console.log('打开文件夹的路径:', paths);
            console.log('历史记录:', this.props.histrory);
            var hisExist = false;//历史里是否有
            if(paths) {
                var projectPath = escapePath(paths[0]);
                // console.log('escapePath:', projectPath);
                for (let i = 0, len = this.props.histrory.size; i < len; i++) {
                    if (projectPath == this.props.histrory.get(i).path) {
                        hisExist = true;
                        break;
                    }
                }

                if (!hisExist || this.props.config.ruffProjectPath != projectPath) {//打开了新的文件夹
                    var files = ['app.json', 'package.json', 'ruff_modules'];
                    var existProject = true;
                    for (var i = 0, len = files.length; i < len; i++) {
                        var filePath = projectPath + '\\' + files[i];
                        // console.log('filePath:',filePath,fs.existsSync(escapePath(filePath)));
                        if (!fs.existsSync(escapePath(filePath))) {//判断文件是否存在
                            existProject = false;
                            break;
                        }
                    }
                    if(existProject){//是ruff项目
                        var baseName = path.basename(projectPath);
                        addLog(tr(204,baseName),COLOR_GREEN);
                        // addOutputCooked(tr(204, baseName), true);//切换至项目
                        // command(LOG_ADD,{color:'white',value:tr(203)});//不是有效的 ruff 项目

                    }else{
                        addLog(tr(203),COLOR_RED);
                        // command(LOG_ADD,{color:'white',value:tr(203)});//不是有效的 ruff 项目
                    }
                    console.log('existProject:',existProject)

                }

            }
        });
        // dialog.showOpenDialog({properties: ['openDirectory']}, this.onOpenFolderEnd.bind(this));
    }
    getHistrory(){
        return <div>ddsd</div>
    }
    /**关闭组件*/
    closeEnd() {
        command(LEFT_CHANGE_CLUMTYPE, {key: this.props.clumId, value: 0});
        // command(LEFT_CHANGE_CLUMTYPE,{key:this.props.clumId,value:0});
    }

    render() {
        return (
            <div className="mousePointer" onClick={this.closeEnd.bind(this)}>
                <div className="openProject" onClick={this.onOpenFolder.bind(this)}>
                    {tr(1)}
                </div>
                <div>
                    {this.getHistrory()}
                </div>

            </div>
        )
    }
}
function select(state) {
    return {
        type: state.left.clum2,
        config:state.config,
        histrory:state.config.histrory
    }
}
export default connect(select)(C2_OpenProject);
C2_OpenProject.propTypes = {
    clumId: PropTypes.number.isRequired//栏目的id
}